import { Person } from '@/models/person';
import firebase from 'firebase';
const db = firebase.firestore();

const PERSON_COLLECTION = 'persons';

export class PersonRepo {
  static async fetchByGmail(gmail: string): Promise<Person | undefined> {
    return new Promise((resolve, reject) => {
      db.collection(PERSON_COLLECTION)
        .where('gmail', '==', gmail)
        .limit(1)
        .get()
        .then((querySnapshot) => querySnapshot.forEach(
          person => resolve(person.data() as Person)
        ))
        .catch(reject);
    })
  }

  static async list(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      db.collection(PERSON_COLLECTION).get()
        .then((querySnapshot) => {
          const personList: Person[] = [];
          querySnapshot.forEach(snapshot => {
            const person = { id: snapshot.id, ...snapshot.data() } as Person;
            personList.push(person);
          });

          resolve(personList);
        })
        .catch(reject);
    });
  }

  static async create(person: Person) {
    return db.collection(PERSON_COLLECTION).add(person);
  }

  static async update() {

  }

  static async delete(personId: string) {
    return db.collection(PERSON_COLLECTION).doc(personId).delete();
  }
}
