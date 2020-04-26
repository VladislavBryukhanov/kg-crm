import { Person } from '@/models/person';
import firebase from 'firebase';
const db = firebase.firestore();

const PERSON_COLLECTION = 'persons';

export class PersonRepo {
  private static snapshotToPerson(snapshot: firebase.firestore.DocumentData): Person {
    return { id: snapshot.id, ...snapshot.data() };
  }

  static async fetchByGmail(gmail: string): Promise<Person | undefined> {
    return new Promise((resolve, reject) => {
      db.collection(PERSON_COLLECTION)
        .where('gmail', '==', gmail)
        .limit(1)
        .get()
        .then(querySnapshot => querySnapshot.forEach(
          snapshot => resolve(this.snapshotToPerson(snapshot))
        ))
        .catch(reject);
    });
  }

  static async fetchById(id: string): Promise<Person | undefined> {
    const snapshot = await db.collection(PERSON_COLLECTION).doc(id).get();
    return this.snapshotToPerson(snapshot);
  }

  static async list(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      db.collection(PERSON_COLLECTION).get()
        .then((querySnapshot) => {
          const personList: Person[] = [];
          querySnapshot.forEach(snapshot =>
            personList.push(this.snapshotToPerson(snapshot))
          );

          resolve(personList);
        })
        .catch(reject);
    });
  }

  static async create(person: Person) {
    return db.collection(PERSON_COLLECTION).add(person);
  }

  static async update(personId: string, updates: Partial<Person>) {
    return db.collection(PERSON_COLLECTION).doc(personId).update(updates);
  }

  static async delete(personId: string) {
    return db.collection(PERSON_COLLECTION).doc(personId).delete();
  }
}
