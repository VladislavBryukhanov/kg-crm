import { LIST_PERSONS } from '../mutation-types';
import { MutationTree } from 'vuex';
import { Person } from '@/models/person';
import { PersonState } from '@/models/store';

const mutations: MutationTree<PersonState> = {
  [LIST_PERSONS](state: PersonState, persons: Person[])   {
    state.persons = persons;
  }
}

export default mutations;
