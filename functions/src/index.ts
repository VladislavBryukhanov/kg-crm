import { Person } from './models/person';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment-mini';
admin.initializeApp();

const PERSON_COLLECTION = 'persons';
const PERSON_AVATAR_DIR = 'person_avatar';

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

exports.sendVacationEmail = functions.https.onCall(async (data, context) => {
  const { startDate, endDate } = data;
  if (!startDate || !endDate) {
    throw new functions.https.HttpsError('invalid-argument', 'startDate and endDate arguments required');
  }

  if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid range, startDate > endDate');
  }

  const collectionRef = admin.firestore().collection(PERSON_COLLECTION);

  const querySnapshot = await collectionRef
    .where('gmail', '==', context.auth!.token.email)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    throw new functions.https.HttpsError('not-found', 'Such user doesn\'t exists');
  }

  let person: Person | undefined;
  querySnapshot.forEach(snapshot => person = {
    id: snapshot.id,
    ...snapshot.data(),
  } as Person);

  if (!person) {
    throw new functions.https.HttpsError('not-found', 'Such user doesn\'t exists');
  }
  
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const requestedVacationDuration = endMoment.diff(startMoment, 'days') + 1;

  if (requestedVacationDuration > person.vacationDays) {
    throw new functions.https.HttpsError('invalid-argument', 'You do not have so many vacation days');
  }

  const vacationDays = person.vacationDays - requestedVacationDuration;

  return collectionRef.doc(person.id).update({ 
    vacationDays,
    scheduledVacation: data
  });
});
