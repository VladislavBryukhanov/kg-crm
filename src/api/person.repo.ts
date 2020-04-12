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
          querySnapshot.forEach(person => personList.push(person.data() as Person));

          resolve(personList);
        })
        .catch(reject);
    });
  }

  static async create() {

  }

  static async update() {

  }
}
