import { FileRepo } from '@/api/file.repo';
import PositionRepo from '@/api/position.repo';
import DepartmentRepo from '@/api/department.repo';
import { DynamicOption } from '@/models/dynamic-option';
import { Person } from '@/models/person';
import { BaseRepo } from './base.repo';

const PERSON_COLLECTION = 'persons';

class PersonRepo extends BaseRepo<Person> {
  constructor() {
    super(PERSON_COLLECTION)
  }

  private async populateData(person: Person): Promise<Person> {
    const targetRequests: Promise<any>[] = [
      person.positionRef.get(),
      person.departmentRef.get(),
    ];

    if (person.avatarFileId) {
      targetRequests.push(
        FileRepo.getPersonAvatarUrl(person.avatarFileId)
      );
    }

    const [positionSnap, departmentSnap, avatarUrl] = await Promise.all(targetRequests);

    const position = super.snapshotToModel<DynamicOption>(positionSnap);
    const department = super.snapshotToModel<DynamicOption>(departmentSnap);

    return { ...person, position, department, avatarUrl };
  }

  async fetchById(id: string): Promise<Person | undefined> {
    const person = await super.fetchById(id);

    if (!person) return;

    return this.populateData(person);
  }

  async list(): Promise<Person[]> {
    const persons = await super.list();
    return Promise.all(persons.map(this.populateData));
  }

  async create(person: Person): Promise<Person>{
    person.positionRef = PositionRepo.getPositionRef(person.position.id);
    person.departmentRef = DepartmentRepo.getDepartmentRef(person.department.id);
    delete person.position;
    delete person.department;

    const createdPerson = await super.create(person)
    return this.populateData(createdPerson);
  }

  async update(personId: string, updates: Partial<Person>): Promise<void> {
    if (updates.position) {
      updates.positionRef = PositionRepo.getPositionRef(updates.position.id);
      delete updates.position;
    }

    if (updates.department) {
      updates.departmentRef = DepartmentRepo.getDepartmentRef(updates.department.id);
      delete updates.department;
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

    return this.populateData(person);
  }
}

export default new PersonRepo();