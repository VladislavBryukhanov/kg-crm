import firebase from 'firebase';
import { BaseRepo } from './base.repo';
import { DynamicOption } from '@/models/dynamic-option';

const DEPARTMENT_COLLECTION = 'departments';

class DepartmentRepo extends BaseRepo<DynamicOption> {
  getDepartmentRef(departmentId: string): firebase.firestore.DocumentReference {
    return this.collectionRef.doc(departmentId);
  }
}

export default new DepartmentRepo(DEPARTMENT_COLLECTION);