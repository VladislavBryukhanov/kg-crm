import { LIST_PERSONS, CREATE_PERSON, DELETE_PERSON, UPDATE_PERSON, FETCH_PERSON_BY_ID } from '../action-types';
import { MutationTree } from 'vuex';
import { Person } from '@/models/person';
import { PersonState } from '@/models/store';

const mutations: MutationTree<PersonState> = {
  [FETCH_PERSON_BY_ID](state: PersonState, person: Person) {
    const index = state.persons.findIndex((pers: Person) => pers.id ===  person.id);

    if (!~index) {
      state.persons.push(person);
    } else {
      state.persons.splice(index, 1, person);
    }
  },
  [LIST_PERSONS](state: PersonState, persons: Person[])   {
    state.persons = persons;
  },
  [CREATE_PERSON](state: PersonState, person: Person) {
    state.persons.push(person);
  },
  [UPDATE_PERSON](state: PersonState, { personId, updates }) {
    const index = state.persons.findIndex((pers: Person) => pers.id ===  personId);
    
    if (~index) {
      const updatedPerson = { ...state.persons[index], ...updates };
      state.persons.splice(index, 1, updatedPerson);
    }
  },
  [DELETE_PERSON](state: PersonState, personId: string) {
    const index = state.persons.findIndex(({ id }) => id === personId);
    state.persons.splice(index, 1);
  }
}

export default mutations;
