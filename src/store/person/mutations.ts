import { LIST_PERSONS, CREATE_PERSON } from '../mutation-types';
import { MutationTree } from 'vuex';
import { Person } from '@/models/person';
import { PersonState } from '@/models/store';

const mutations: MutationTree<PersonState> = {
  [LIST_PERSONS](state: PersonState, persons: Person[])   {
    state.persons = persons;
  },
  [CREATE_PERSON](state: PersonState, person: Person) {
    state.persons.push(person);
  }
}

export default mutations;
