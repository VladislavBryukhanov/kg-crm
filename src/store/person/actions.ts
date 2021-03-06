import { ActionTree } from 'vuex';
import { PersonState, RootState } from '@/models/store';
import { LIST_PERSONS, CREATE_PERSON, DELETE_PERSON, FETCH_PERSON_BY_ID, UPDATE_PERSON } from '../action-types';
import PersonRepo from '@/api/repos/person.repo';
import { FileRepo } from '@/api/repos/file.repo';
import { UpdatePerson, CreatePerson } from '@/models/store/person/actions-payload';
import { errorHandler } from '@/utils/error-handler';
import CloudFunctionsApi from '@/api/cloud-functions';

const actions: ActionTree<PersonState, RootState> = {
  async [FETCH_PERSON_BY_ID]({ commit }, personId: string) {
    try {
      const person = await PersonRepo.fetchById(personId);
      commit(FETCH_PERSON_BY_ID, person);
    } catch (err) {
      errorHandler(err, FETCH_PERSON_BY_ID, commit);
    }
  },
  async [LIST_PERSONS]({ commit }) {
    try{
      const persons = await PersonRepo.list();
      commit(LIST_PERSONS, persons);
    } catch (err) {
      errorHandler(err, LIST_PERSONS, commit);
    }
  },
  async [CREATE_PERSON]({ commit }, { avatar, person }: CreatePerson) {
    try {
      if (avatar) {
        person.avatarFileId = await FileRepo.uploadPersonAvatar(avatar);
      }

      const createdPerson = await PersonRepo.create(person);
      commit(CREATE_PERSON, createdPerson);
    } catch (err) {
      errorHandler(err, CREATE_PERSON, commit);
    }
  },
  async [UPDATE_PERSON]({ commit, rootState }, { personId, updates, avatar }: UpdatePerson) {
    try {
      if (avatar) {
        updates.avatarFileId = await FileRepo.uploadPersonAvatar(avatar);
      }
      
      if (rootState.AuthModule.me!.isAdmin) {
        await PersonRepo.update(personId, updates);
      } else {
        await CloudFunctionsApi.personalProfileUpdate(updates);
      }

      const updatedUser = await PersonRepo.fetchById(personId);

      commit(UPDATE_PERSON, { personId, updates: updatedUser });
    } catch (err) {
      errorHandler(err, UPDATE_PERSON, commit);
    }
  },
  async [DELETE_PERSON]({ commit }, personId: string) {
    try {
      await PersonRepo.delete(personId);
      commit(DELETE_PERSON, personId);
    } catch (err) {
      errorHandler(err, DELETE_PERSON, commit);
    }
  }
};

export default actions;
