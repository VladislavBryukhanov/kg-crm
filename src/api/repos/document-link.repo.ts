import { DocumentLink } from '../../models/document-link';
import { BaseRepo } from './base.repo';

const DOCUMENT_LINK_COLLECTION = 'document-links';

class DocumentLinkRepo extends BaseRepo<DocumentLink> {
  constructor() {
    super(DOCUMENT_LINK_COLLECTION);
  }
}

export default new DocumentLinkRepo();