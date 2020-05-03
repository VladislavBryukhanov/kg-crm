import { DynamicOption } from '@/models/dynamic-option';
import { ActionTree } from 'vuex';
import DepartmentRepo from '@/api/repos/department.repo';
import { DepartmentState, RootState } from '@/models/store';
import { LIST_DEPARTMENTS, CREATE_DEPARTMENT, DELETE_DEPARTMENT } from '@/store/action-types';
import { errorHandler } from '@/utils/error-handler';

const actions: ActionTree<DepartmentState, RootState> = {
  async [LIST_DEPARTMENTS]({ commit }) {
    try {
      const departments = await DepartmentRepo.list();
      commit(LIST_DEPARTMENTS, departments)
    } catch (err) {
      errorHandler(err, LIST_DEPARTMENTS, commit);
    }
  },
  async [CREATE_DEPARTMENT]({ commit }, newPosition: DynamicOption) {
    try {
      const department = await DepartmentRepo.create(newPosition);
      commit(CREATE_DEPARTMENT, department);
    } catch (err) {
      errorHandler(err, CREATE_DEPARTMENT, commit);
    }
  },
  async [DELETE_DEPARTMENT]({ commit }, departmentId) {
    try {
      await DepartmentRepo.delete(departmentId);
      commit(DELETE_DEPARTMENT, departmentId);
    } catch (err) {
      errorHandler(err, DELETE_DEPARTMENT, commit);
    }
  }
};

export default actions;