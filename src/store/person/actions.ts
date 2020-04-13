import { Person } from '@/models/person';
import { ActionTree } from 'vuex';
import { PersonState, RootState } from '@/models/store';
import { LIST_PERSONS, CREATE_PERSON } from '../action-types';
import * as mutations from '../mutation-types';
import { PersonRepo } from '@/api/person.repo';

const actions: ActionTree<PersonState, RootState> = {
  async [LIST_PERSONS]({ commit }) {
    const persons = await PersonRepo.list();
    commit(mutations.LIST_PERSONS, persons);
  },
  async [CREATE_PERSON]({ commit }, newPerson: Person) {
    const person = await PersonRepo.create(newPerson);
    commit(mutations.CREATE_PERSON, person);
  }
};

export default actions;
