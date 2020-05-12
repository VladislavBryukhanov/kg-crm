import { LIST_DOCUMENT_LINKS, CREATE_DOCUMENT_LINK, DELETE_DOCUMENT_LINK } from '@/store/action-types';
import { DocumentLinkState } from '@/models/store';
import { MutationTree } from 'vuex';
import { DocumentLink } from '@/models/document-link';

const mutations: MutationTree<DocumentLinkState> = {
  [LIST_DOCUMENT_LINKS](state: DocumentLinkState, documentLinks: DocumentLink[]) {
    state.documentLinks = documentLinks;
  },
  [CREATE_DOCUMENT_LINK](state: DocumentLinkState, department: DocumentLink) {
    state.documentLinks.push(department);
  },
  [DELETE_DOCUMENT_LINK](state: DocumentLinkState, departmentId: string) {
    const index = state.documentLinks.findIndex(({ id }) => departmentId === id );
    if (~index) {
      state.documentLinks.splice(index, 1);
    }
  },
}

export default mutations;
