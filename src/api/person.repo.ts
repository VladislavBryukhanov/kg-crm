import { BaseRepo } from './base.repo';
import { Person } from '@/models/person';

const PERSON_COLLECTION = 'persons';

class PersonRepo extends BaseRepo<Person> {
  constructor() {
    super(PERSON_COLLECTION)
  }

  async fetchByGmail(gmail: string): Promise<Person | undefined> {
    return new Promise((resolve, reject) => {
      this.collectionRef
        .where('gmail', '==', gmail)
        .limit(1)
        .get()
        .then(querySnapshot => querySnapshot.forEach(
          snapshot => resolve(this.snapshotToModel(snapshot))
        ))
        .catch(reject);
    });
  }

  async fetchById(id: string): Promise<Person | undefined> {
    const snapshot = await this.collectionRef.doc(id).get();
    return this.snapshotToModel(snapshot);
  }
}

export default new PersonRepo();