import { personToJsonMutate } from '@/helpers/person-to-json';
import { FileRepo } from '@/api/repos/file.repo';
import { DynamicOption } from '@/models/dynamic-option';
import { Person } from '@/models/person';
import { BaseRepo } from './base.repo';
import firebase from 'firebase';
const db = firebase.firestore();

const PERSON_COLLECTION = 'persons';
const USER_ROLES_COLLECTION = 'user-roles';

class PersonRepo extends BaseRepo<Person> {
  constructor() {
    super(PERSON_COLLECTION);
  }

  private async populateData(person: Person): Promise<Person> {
    const roleRef = db.collection(USER_ROLES_COLLECTION).doc(person.gmail);

    const targetRequests: Promise<any>[] = [
      roleRef.get(),
      person.positionRef.get(),
      person.departmentRef.get(),
    ];

    if (person.avatarFileId) {
      targetRequests.push(
        FileRepo.getPersonAvatarUrl(person.avatarFileId)
      );
    }

    const [roleSnap, positionSnap, departmentSnap, avatarUrl] = await Promise.all(targetRequests);

    const position = super.snapshotToModel<DynamicOption>(positionSnap);
    const department = super.snapshotToModel<DynamicOption>(departmentSnap);
    const role = roleSnap.data();

    return { ...person, ...role, position, department, avatarUrl };
  }

  async fetchById(id: string): Promise<Person | undefined> {
    const person = await super.fetchById(id);

    if (!person) return;

    return this.populateData(person);
  }

  async list(): Promise<Person[]> {
    const persons = await super.list();
    return Promise.all(persons.map(this.populateData));
  }

  async create(person: Person): Promise<Person>{
    personToJsonMutate(person);

    const createdPerson = await super.create(person)
    return this.populateData(createdPerson);
  }

  async update(personId: string, updates: Partial<Person>): Promise<void> {
    personToJsonMutate(updates);
    return super.update(personId, updates);
  }

  async fetchByGmail(gmail: string): Promise<Person> {
    const person = await new Promise<Person>((resolve, reject) => {
      this.collectionRef
        .where('gmail', '==', gmail)
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            reject(new Error("User with such gmail doesn't exists"))
          }

          querySnapshot.forEach(
            snapshot => resolve(this.snapshotToModel(snapshot))
          )
        })
        .catch(reject);
    });

    return this.populateData(person);
  }
}

export default new PersonRepo();