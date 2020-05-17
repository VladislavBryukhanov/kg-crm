import { CreateEntity } from '../../models/common';
import firebase from 'firebase';
const db = firebase.firestore();

export interface CRUD<T> {
  fetchById(id: string): Promise<T | undefined>;
  list(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(itemId: string, updates: Partial<T>): Promise<void>,
  delete(itemId: string): Promise<void>,
}

export abstract class BaseRepo<T> implements CRUD<T>{
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
    const querySnapshot = await this.collectionRef.get();
    const personList: T[] = [];

    return new Promise((resolve, reject) => {
      querySnapshot.forEach(snapshot =>
        personList.push(this.snapshotToModel(snapshot))
      );
      resolve(personList);
    });
  }

  async create(item: CreateEntity<T>): Promise<T> {
    const itemSnapshot = await this.collectionRef.add(item)
      .then(snapshot => snapshot.get());

    return this.snapshotToModel(itemSnapshot);
  }

  update(itemId: string, updates: Partial<T>): Promise<void> {
    return this.collectionRef.doc(itemId).update(updates);
  }

  delete(itemId: string): Promise<void> {
    return this.collectionRef.doc(itemId).delete();
  }
}