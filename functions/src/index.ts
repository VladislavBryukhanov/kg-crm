import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment-mini';
import { FieldValue } from '@google-cloud/firestore';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { Person } from './models/person';
import Mailer from './mailer/index';
import { complexQueryResult, queryResultRefs, queryGetOne } from './helpers/complexQueryResult';
admin.initializeApp();

const POSITION_COLLECTION = 'positions';
const PERSON_COLLECTION = 'persons';
const PERSON_AVATAR_DIR = 'person_avatar';

const VACATION_INCREMENT_KEY = 'vacation_year_limit';

exports.personCascadeDelete = functions.firestore
  .document(`${PERSON_COLLECTION}/{personId}`)
  .onDelete(async (snap) => {
    const { avatarFileId, gmail } = snap.data()!;
    const { uid } = await admin.auth().getUserByEmail(gmail);

    const promises: Promise<any>[] = [
      admin.auth().deleteUser(uid)
    ];

    if (avatarFileId) {
      const storage = admin.storage().bucket();
      const filePath = `${PERSON_AVATAR_DIR}/${avatarFileId}`;

      promises.push(
        storage.file(filePath).delete()
      );
    }

    return Promise.all(promises);
  });

exports.personRemoveOldAvatar = functions.firestore
  .document(`${PERSON_COLLECTION}/{personId}`)
  .onUpdate((change) => {
    const { avatarFileId: previousAvatarFileId } = change.before.data()!;
    const { avatarFileId } = change.after.data()!;
    
    if (avatarFileId !== previousAvatarFileId) {
      const storage = admin.storage().bucket();
      return storage.file(`${PERSON_AVATAR_DIR}/${previousAvatarFileId}`).delete();
    }
  });

exports.personalProfileUpdate = functions.https.onCall(async (updates: Partial<Person>, context: CallableContext) => {
  const personCollectionRef = admin.firestore().collection(PERSON_COLLECTION);
  const person = await queryGetOne<Person>(
    personCollectionRef.where('gmail', '==', context.auth!.token.email)
  );

  if (!person) {
    throw new functions.https.HttpsError('not-found', 'Your person not found');
  }
  
  const writableFields: Array<keyof Person> = [
    'gmail',
    'fullName',
    'avatarFileId',
    'additionInfo',
    'developmentPlan',
    'phone',
    'birthday',
    'address',
  ];

  const filteredUpdates = writableFields.reduce((res, key) => {
    if (updates[key]) {
      return {
        ...res,
        [key]: updates[key]
      }
    }
    return res;
  }, {});

  return personCollectionRef.doc(person.id).update(filteredUpdates);
});

exports.vacationScheduling = functions.https.onCall(async (vacationDates, context) => {
  const { startDate, endDate } = vacationDates;
  if (!startDate || !endDate) {
    throw new functions.https.HttpsError('invalid-argument', 'startDate and endDate arguments required');
  }

  const vacStartTime = new Date(startDate).getTime();
  const vacEndTime = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (vacEndTime < now) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid range, vacation could not to be scheduled in the past'
    );
  }

  if (vacStartTime > vacEndTime) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid range, startDate > endDate');
  }

  const personCollectionRef = admin.firestore().collection(PERSON_COLLECTION);
  const positionCollectionRef = admin.firestore().collection(POSITION_COLLECTION);

  const person = await queryGetOne<Person>(
    personCollectionRef.where('gmail', '==', context.auth!.token.email)
  );

  if (!person) {
    throw new functions.https.HttpsError('not-found', 'Such user doesn\'t exists');
  }

  if (person.scheduledVacation && new Date(person.scheduledVacation.endDate).getTime() > now) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Unable to schedule new vacation as you have active vacation schedule'
    );
  }
  
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const requestedVacationDuration = endMoment.diff(startMoment, 'days') + 1;

  if (requestedVacationDuration > person.vacationDays) {
    throw new functions.https.HttpsError('invalid-argument', 'You do not have so many vacation days');
  }

  const watchAllPositions = await queryResultRefs(
    positionCollectionRef.where('watchAll', '==', true)
  );

  const watchDepartmentPositions =  await queryResultRefs(
    positionCollectionRef.where('watchDepartment', '==', true)
  ); 

  const recipients: Person[] = await complexQueryResult<Person>([
    personCollectionRef
      .where('positionRef', 'in', watchDepartmentPositions)
      .where('departmentRef', '==', person.departmentRef)
      .get(),

    personCollectionRef
      .where('positionRef', 'in', watchAllPositions)
      .get(),
  ]);

  if (!recipients.length) {
    throw new functions.https.HttpsError('not-found', 'No recipients of email exists, please inform your manager');
  }

  await Mailer.sendVacationMail(
    person,
    vacationDates,
    recipients.map(pers => pers.corporateMail || pers.gmail)
  );

  return personCollectionRef.doc(person.id).update({
    vacationDays: person.vacationDays - requestedVacationDuration,
    scheduledVacation: vacationDates
  });
});

exports.scheduledVacationDaysManager = functions.pubsub.schedule('* * * * 1')
  .onRun(async (context: functions.EventContext) => {
    let vacationDaysPerYear = 0;

    const configTemplate = await admin.remoteConfig().getTemplate();
    const { defaultValue } = configTemplate.parameters[VACATION_INCREMENT_KEY];

    if (defaultValue && 'value' in defaultValue) {
      vacationDaysPerYear = +defaultValue.value;
    }

    if (!vacationDaysPerYear) {
      console.warn("Vacation Days Per Year doesn't set, please check remote config");
      return;
    }

    const vacationMonthIncrement = vacationDaysPerYear / 12;

    const batch = admin.firestore().batch();
    const personCollectionRef = admin.firestore().collection(PERSON_COLLECTION);
    const personsSnapshot = await personCollectionRef.get();

    personsSnapshot.docs.forEach(document =>  {
      const person = document.data();
      const hiredMonthAgo = !!moment(context.timestamp).diff(moment(person.hiredAt), 'month');
      const updatedMonthAgo = !!moment(context.timestamp).diff(moment(person.vacationDaysUpdatedAt), 'month');

      if (!hiredMonthAgo || (person.vacationDaysUpdatedAt && !updatedMonthAgo)) return;

      batch.update(document.ref, {
        vacationDays: FieldValue.increment(vacationMonthIncrement),
        vacationDaysUpdatedAt: context.timestamp
      })
    });
    
    return batch.commit();
  });