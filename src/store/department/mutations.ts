import { LIST_DEPARTMENTS, CREATE_DEPARTMENT, DELETE_DEPARTMENT } from '@/store/action-types';
import { DynamicOption } from '@/models/dynamic-option';
import { DepartmentState } from '@/models/store';
import { MutationTree } from 'vuex';

const mutations: MutationTree<DepartmentState> = {
  [LIST_DEPARTMENTS](state: DepartmentState, departments: DynamicOption[]) {
    state.departments = departments;
  },
  [CREATE_DEPARTMENT](state: DepartmentState, department: DynamicOption) {
    state.departments.push(department);
  },
  [DELETE_DEPARTMENT](state: DepartmentState, departmentId: string) {
    const index = state.departments.findIndex(({ id }) => departmentId === id );
    if (~index) {
      state.departments.splice(index, 1);
    }
  },
}

export default mutations;
