import firebase from 'firebase';
const db = firebase.firestore();

export interface CRUD<T> {
  list(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(positionId: string, updates: Partial<T>): Promise<void>,
  delete(positionId: string): Promise<void>,
}

export class BaseRepo<T> implements CRUD<T>{
  collectionRef!: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(collection: string) {
    this.collectionRef = db.collection(collection);
  }

  snapshotToModel(snapshot: firebase.firestore.DocumentData): T {
    return { id: snapshot.id, ...snapshot.data() };
  }

  async list(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.collectionRef.get()
        .then((querySnapshot) => {
          const personList: T[] = [];
          querySnapshot.forEach(snapshot =>
            personList.push(this.snapshotToModel(snapshot))
          );

          resolve(personList);
        })
        .catch(reject);
    });
  }

  async create(position: T): Promise<T> {
    const positionSnapshot = await this.collectionRef.add(position)
      .then(snapshot => snapshot.get());

    return this.snapshotToModel(positionSnapshot);
  }

  async update(positionId: string, updates: Partial<T>): Promise<void> {
    return this.collectionRef.doc(positionId).update(updates);
  }

  async delete(positionId: string): Promise<void> {
    return this.collectionRef.doc(positionId).delete();
  }
}