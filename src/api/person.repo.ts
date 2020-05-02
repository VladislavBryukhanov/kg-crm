import PositionRepo from '@/api/position.repo';
import { DynamicOption } from '@/models/dynamic-option';
import { Person } from '@/models/person';
import { BaseRepo } from './base.repo';

const PERSON_COLLECTION = 'persons';

class PersonRepo extends BaseRepo<Person> {
  constructor() {
    super(PERSON_COLLECTION)
  }

  private async populatePosition(person: Person): Promise<Person> {
    const snapshot = await person.positionRef.get();
    const position = super.snapshotToModel<DynamicOption>(snapshot);

    return { ...person, position };
  }

  async list(): Promise<Person[]> {
    const persons = await super.list();
    return Promise.all(persons.map(this.populatePosition));
  }

  async create(person: Person): Promise<Person>{
    person.positionRef = await PositionRepo.getPositionRef(person.position.id);
    delete person.position;

    const createdPerson = await super.create(person)
    return this.populatePosition(createdPerson);
  }

  async update(personId: string, updates: Partial<Person>): Promise<void> {
    if (updates.position) {
      updates.positionRef = await PositionRepo.getPositionRef(updates.position.id);
      delete updates.position;
    }
    
    return super.update(personId, updates);
  }

  async fetchByGmail(gmail: string): Promise<Person> {
    const person = await new Promise<Person>((resolve, reject) => {
      this.collectionRef
        .where('gmail', '==', gmail)
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            reject(new Error("User with such gmail doesn't exists"))
          }

          querySnapshot.forEach(
            snapshot => resolve(this.snapshotToModel(snapshot))
          )
        })
        .catch(reject);
    });

    return this.populatePosition(person);
  }
}

export default new PersonRepo();