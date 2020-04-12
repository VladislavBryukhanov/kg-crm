import firebase from 'firebase';
const db = firebase.firestore();

const PERSON_COLLECTION = 'persons';

export class PersonRepo {
  static async fetchByGmail(gmail: string) {
    db.collection(PERSON_COLLECTION)
      .where('gmail', '==', gmail)
      .limit(1)
      .get()
      .then(querySnapshot => querySnapshot.forEach(person => {
        console.log(person.data());
      }));
  }

  static async create() {

  }

  static async update() {

  }
}
