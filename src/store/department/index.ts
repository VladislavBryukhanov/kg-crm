import actions from './actions';
import mutations from './mutations';
import { DepartmentState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: DepartmentState = {
  departments: [],
};

export const DepartmentModule: Module<DepartmentState, RootState> = {
  state,
  mutations,
  actions
};
