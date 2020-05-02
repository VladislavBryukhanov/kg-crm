import firebase from 'firebase';
const db = firebase.firestore();

export interface CRUD<T> {
  list(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(itemId: string, updates: Partial<T>): Promise<void>,
  delete(itemId: string): Promise<void>,
}

export class BaseRepo<T> implements CRUD<T>{
  collectionRef!: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(collection: string) {
    this.collectionRef = db.collection(collection);
  }

  snapshotToModel<K = T>(snapshot: firebase.firestore.DocumentData): K {
    return { id: snapshot.id, ...snapshot.data() };
  }

  async fetchById(id: string): Promise<T | undefined> {
    const snapshot = await this.collectionRef.doc(id).get();
    return this.snapshotToModel(snapshot);
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

  async create(item: T): Promise<T> {
    const itemSnapshot = await this.collectionRef.add(item)
      .then(snapshot => snapshot.get());

    return this.snapshotToModel(itemSnapshot);
  }

  async update(itemId: string, updates: Partial<T>): Promise<void> {
    return this.collectionRef.doc(itemId).update(updates);
  }

  async delete(itemId: string): Promise<void> {
    return this.collectionRef.doc(itemId).delete();
  }
}