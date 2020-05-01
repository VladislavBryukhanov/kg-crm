import actions from './actions';
import mutations from './mutations';
import { PositionState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: PositionState = {
  positions: [],
};

export const PositionModule: Module<PositionState, RootState> = {
  state,
  mutations,
  actions
};
