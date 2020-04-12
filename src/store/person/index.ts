import actions from './actions';
import mutations from './mutations';
import { PersonState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: PersonState = {
  persons: [],
};

export const PersonModule: Module<PersonState, RootState> = {
  state,
  mutations,
  actions
};
