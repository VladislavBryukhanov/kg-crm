import actions from './actions';
import mutations from './mutations';
import { AuthState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: AuthState = {
  me: undefined,
  authState: undefined,
};

export const AuthModule: Module<AuthState, RootState> = {
  state,
  mutations,
  actions
};
