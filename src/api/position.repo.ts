import { DynamicOption } from '@/models/dynamic-option';
import firebase from 'firebase';
const db = firebase.firestore();

const POSITION_COLLECTION = 'position';

// TODO make more abstract
export class PositionRepo {
  private static snapshotToPosition(snapshot: firebase.firestore.DocumentData): DynamicOption {
    return { id: snapshot.id, ...snapshot.data() };
  }

  static async list(): Promise<DynamicOption[]> {
    return new Promise((resolve, reject) => {
      db.collection(POSITION_COLLECTION).get()
        .then((querySnapshot) => {
          const personList: DynamicOption[] = [];
          querySnapshot.forEach(snapshot =>
            personList.push(this.snapshotToPosition(snapshot))
          );

          resolve(personList);
        })
        .catch(reject);
    });
  }

  static async create(position: DynamicOption): Promise<DynamicOption> {
    const positionSnapshot = await db.collection(POSITION_COLLECTION).add(position)
      .then(snapshot => snapshot.get());

    return this.snapshotToPosition(positionSnapshot);
  }

  static async update(positionId: string, updates: Partial<DynamicOption>): Promise<void> {
    return db.collection(POSITION_COLLECTION).doc(positionId).update(updates);
  }

  static async delete(positionId: string) {
    return db.collection(POSITION_COLLECTION).doc(positionId).delete();
  }
}