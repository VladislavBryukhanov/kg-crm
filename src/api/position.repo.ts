import { DynamicOption } from '@/models/dynamic-option';
import firebase from 'firebase';
const db = firebase.firestore();

const POSITION_COLLECTION = 'position';

export class PositionRepo {
  private static snapshotToPerson(snapshot: firebase.firestore.DocumentData): DynamicOption {
    return { id: snapshot.id, ...snapshot.data() };
  }

  static async list(): Promise<DynamicOption[]> {
    return new Promise((resolve, reject) => {
      db.collection(POSITION_COLLECTION).get()
        .then((querySnapshot) => {
          const personList: DynamicOption[] = [];
          querySnapshot.forEach(snapshot =>
            personList.push(this.snapshotToPerson(snapshot))
          );

          resolve(personList);
        })
        .catch(reject);
    });
  }

}