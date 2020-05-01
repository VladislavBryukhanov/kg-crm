import { ActionTree } from 'vuex';
import { PersonState, RootState } from '@/models/store';
import { LIST_PERSONS, CREATE_PERSON, DELETE_PERSON, FETCH_PERSON_BY_ID, UPDATE_PERSON } from '../action-types';
import PersonRepo from '@/api/person.repo';
import { FileRepo } from '@/api/file.repo';
import { UpdatePerson, CreatePerson } from '@/models/store/person/actions-payload';

const actions: ActionTree<PersonState, RootState> = {
  async [FETCH_PERSON_BY_ID]({ commit }, personId: string) {
    const person = await PersonRepo.fetchById(personId);

    if (person && person.avatarFileId) {
      person.avatarUrl = await FileRepo.getPersonAvatarUrl(person.avatarFileId);
    }

    commit(FETCH_PERSON_BY_ID, person);
  },
  async [LIST_PERSONS]({ commit }) {
    let persons = await PersonRepo.list();
    
    persons = await Promise.all(
      persons.map( async (person) => {
        if (person.avatarFileId) {
          person.avatarUrl = await FileRepo.getPersonAvatarUrl(person.avatarFileId);
        }
        return person;
      })
    );
        
    commit(LIST_PERSONS, persons);
  },
  async [CREATE_PERSON]({ commit }, { avatar, person }: CreatePerson) {
    if (avatar) {
      person.avatarFileId = await FileRepo.uploadPersonAvatar(avatar);
    }

    const createdPerson = await PersonRepo.create(person);

    commit(CREATE_PERSON, createdPerson);
  },
  async [UPDATE_PERSON]({ commit }, { personId, updates, avatar }: UpdatePerson) {
    if (avatar) {
      updates.avatarFileId = await FileRepo.uploadPersonAvatar(avatar);
    }

    await PersonRepo.update(personId, updates);

    if (updates.avatarFileId) {
      updates.avatarUrl = await FileRepo.getPersonAvatarUrl(updates.avatarFileId);
    }

    commit(UPDATE_PERSON, { personId, updates });
  },
  async [DELETE_PERSON]({ commit }, personId: string) {
    await PersonRepo.delete(personId);
    commit(DELETE_PERSON, personId);
  }
};

export default actions;
