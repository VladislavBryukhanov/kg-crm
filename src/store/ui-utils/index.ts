import mutations from './mutations';
import { UiUtilsState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: UiUtilsState = {
  snackbar: {
    message: '',
    duration: 500
  } 
};

export const UiUtilsModule: Module<UiUtilsState, RootState> = {
  state,
  mutations,
};
