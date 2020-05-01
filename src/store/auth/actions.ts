import { FileRepo } from '@/api/file.repo';
import { ActionTree } from 'vuex';
import firebase from 'firebase';
import { AuthState, RootState } from '@/models/store';
import { SIGN_IN, SIGN_OUT, CHECK_AUTH } from '../action-types';
import PersonRepo from '@/api/person.repo';

const actions: ActionTree<AuthState, RootState> = {
  async [CHECK_AUTH]({ commit }) {
    // fetch persistent auth state one time and unsubscribe
    const user: firebase.User | null = await new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });

    if (user && user.email) {
      const person = await PersonRepo.fetchByGmail(user.email);
      
      if (person && person.avatarFileId) {
        person.avatarUrl = await FileRepo.getPersonAvatarUrl(person.avatarFileId);
      }

      commit(CHECK_AUTH, person);
    } else {
      commit(SIGN_OUT);
    }
  },
  async [SIGN_IN]({ dispatch }) {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(authProvider);

    await dispatch(CHECK_AUTH);
  },
  async [SIGN_OUT]({ commit }) {
    await firebase.auth().signOut();
    commit(SIGN_OUT);
  },
};

export default actions;
