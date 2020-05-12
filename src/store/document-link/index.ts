import actions from './actions';
import mutations from './mutations';
import { DocumentLinkState, RootState } from '@/models/store';
import { Module } from 'vuex';

const state: DocumentLinkState = {
  documentLinks: [],
};

export const DocumentLinkModule: Module<DocumentLinkState, RootState> = {
  state,
  mutations,
  actions
};
