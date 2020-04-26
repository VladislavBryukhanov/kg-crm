import { Person } from '@/models/person';

export interface UpdatePerson {
  personId: string,
  updates: Partial<Person>,
  avatar?: File
};

export interface CreatePerson {
  person: Person,
  avatar?: File
};
