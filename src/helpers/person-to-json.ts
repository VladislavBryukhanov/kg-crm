import DepartmentRepo from '@/api/repos/department.repo';
import PositionRepo from '@/api/repos/position.repo';
import { Person } from '@/models/person';

export const personToJsonMutate = (person: Partial<Person>) => {
  delete person.id;
  delete person.avatarUrl;

  if (person.position) {
    person.positionRef = PositionRepo.getPositionRef(person.position.id);
    delete person.position;
  }

  if (person.department) {
    person.departmentRef = DepartmentRepo.getDepartmentRef(person.department.id);
    delete person.department;
  }
}