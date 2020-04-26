import { FETCH_ME, SIGN_OUT } from '../mutation-types';
import { MutationTree } from 'vuex';
import { Person } from '@/models/person';
import { AuthState, AuthMode } from '@/models/store/auth/auth-state';

const mutations: MutationTree<AuthState> = {
  [FETCH_ME](state: AuthState, person: Person)   {
    state.me = person;
    state.authState = AuthMode.SIGNED_IN;
  },
  [SIGN_OUT](state)   {
    state.me = undefined;
    state.authState = AuthMode.SIGNED_OUT;
  },
}

export default mutations;
