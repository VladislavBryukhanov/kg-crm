import { FileRepo } from '@/api/file.repo';
import { ActionTree } from 'vuex';
import firebase from 'firebase';
import { AuthState, RootState } from '@/models/store';
import { SIGN_IN, SIGN_OUT, CHECK_AUTH } from '../action-types';
import PersonRepo from '@/api/person.repo';
import { errorHandler } from '@/utils/error-handler';

const actions: ActionTree<AuthState, RootState> = {
  async [CHECK_AUTH]({ commit, dispatch }) {
    try {
      // fetch persistent auth state one time and unsubscribe
      const user: firebase.User | null = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        }, reject);
      });

      if (!user || !user.email) {
        return dispatch(SIGN_OUT);
      }

      const person = await PersonRepo.fetchByGmail(user.email);

      if (person.avatarFileId) {
        person.avatarUrl = await FileRepo.getPersonAvatarUrl(person.avatarFileId);
      }

      commit(CHECK_AUTH, person);
    } catch (err) {
      dispatch(SIGN_OUT);
      errorHandler(err, CHECK_AUTH, commit);
    }
  },
  async [SIGN_IN]({ dispatch, commit }) {
    try {
      const authProvider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(authProvider);

      await dispatch(CHECK_AUTH);
    } catch (err) {
      errorHandler(err, SIGN_IN, commit);
    }
  },
  async [SIGN_OUT]({ commit }) {
    try {
      await firebase.auth().signOut();
      commit(SIGN_OUT);
    } catch (err) {
      errorHandler(err, SIGN_OUT, commit);
    }
  },
};

export default actions;
