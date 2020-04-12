import { ActionTree } from 'vuex';
import { PersonState, RootState } from '@/models/store';
import { LIST_PERSONS } from '../action-types';
import { PersonRepo } from '@/api/person.repo';

const actions: ActionTree<PersonState, RootState> = {
  async [LIST_PERSONS]({ commit }) {
    const persons = await PersonRepo.list();
    commit(LIST_PERSONS, persons);
  },
};

export default actions;
