import { ActionTree } from 'vuex';
import { DocumentLinkState, RootState } from '@/models/store';
import { LIST_DOCUMENT_LINKS, CREATE_DOCUMENT_LINK, DELETE_DOCUMENT_LINK } from '@/store/action-types';
import { errorHandler } from '@/utils/error-handler';
import { DocumentLink } from '@/models/document-link';
import { CreateEntity } from '../../models/common';
import DocumentLinkRepo from '@/api/repos/document-link.repo';

const actions: ActionTree<DocumentLinkState, RootState> = {
  async [LIST_DOCUMENT_LINKS]({ commit }) {
    try {
      const departments = await DocumentLinkRepo.list();
      commit(LIST_DOCUMENT_LINKS, departments)
    } catch (err) {
      errorHandler(err, LIST_DOCUMENT_LINKS, commit);
    }
  },
  async [CREATE_DOCUMENT_LINK]({ commit }, docLink: CreateEntity<DocumentLink>) {
    try {
      const department = await DocumentLinkRepo.create(docLink);
      commit(CREATE_DOCUMENT_LINK, department);
    } catch (err) {
      errorHandler(err, CREATE_DOCUMENT_LINK, commit);
    }
  },
  async [DELETE_DOCUMENT_LINK]({ commit }, docLinkId: string) {
    try {
      await DocumentLinkRepo.delete(docLinkId);
      commit(DELETE_DOCUMENT_LINK, docLinkId);
    } catch (err) {
      errorHandler(err, DELETE_DOCUMENT_LINK, commit);
    }
  },
};

export default actions;