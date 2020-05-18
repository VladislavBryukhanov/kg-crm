import firebase from 'firebase';
import { BaseRepo } from './base.repo';
import { DynamicOption } from '@/models/dynamic-option';

const POSITION_COLLECTION = 'positions';

class PositionRepo extends BaseRepo<DynamicOption> {
  getPositionRef(positionId: string): firebase.firestore.DocumentReference {
    return this.collectionRef.doc(positionId);
  }
}

export default new PositionRepo(POSITION_COLLECTION);