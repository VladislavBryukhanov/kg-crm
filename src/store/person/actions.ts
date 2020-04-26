import { DELETE_PERSON } from './../action-types';
import { Person } from '@/models/person';
import { ActionTree } from 'vuex';
import { PersonState, RootState } from '@/models/store';
import { LIST_PERSONS, CREATE_PERSON, FETCH_PERSON_BY_ID, UPDATE_PERSON } from '../action-types';
import * as mutations from '../mutation-types';
import { PersonRepo } from '@/api/person.repo';

const actions: ActionTree<PersonState, RootState> = {
  async [FETCH_PERSON_BY_ID]({ commit }, personId: string) {
    const person = await PersonRepo.fetchById(personId);
    commit(mutations.FETCH_PERSON_BY_ID, person);
  },
  async [LIST_PERSONS]({ commit }) {
    const persons = await PersonRepo.list();
    commit(mutations.LIST_PERSONS, persons);
  },
  async [CREATE_PERSON]({ commit }, newPerson: Person) {
    const person = await PersonRepo.create(newPerson);
    commit(mutations.CREATE_PERSON, person);
  },
  async [UPDATE_PERSON](
    { commit },
    { personId, updates }: { personId: string, updates: Partial<Person> }
  ) {
    await PersonRepo.update(personId, updates);
    commit(mutations.UPDATE_PERSON, { personId, updates });
  },
  async [DELETE_PERSON]({ commit }, personId: string) {
    await PersonRepo.delete(personId);
    commit(mutations.DELETE_PERSON, personId);
  }
};

export default actions;
