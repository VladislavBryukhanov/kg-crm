import { DynamicOption } from '@/models/dynamic-option';
import { ActionTree } from 'vuex';
import PositionRepo from '@/api/repos/position.repo';
import { PositionState, RootState } from '@/models/store';
import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION } from '@/store/action-types';
import { errorHandler } from '@/utils/error-handler';

const actions: ActionTree<PositionState, RootState> = {
  async [LIST_POSITIONS]({ commit }) {
    try {
      const positions = await PositionRepo.list();
      commit(LIST_POSITIONS, positions)
    } catch (err) {
      errorHandler(err, LIST_POSITIONS, commit);
    }
  },
  async [CREATE_POSITION]({ commit }, newPosition: DynamicOption) {
    try {
      const position = await PositionRepo.create(newPosition);
      commit(CREATE_POSITION, position);
    } catch (err) {
      errorHandler(err, CREATE_POSITION, commit);
    }
  },
  async [DELETE_POSITION]({ commit }, positionId) {
    try {
      await PositionRepo.delete(positionId);
      commit(DELETE_POSITION, positionId);
    } catch (err) {
      errorHandler(err, DELETE_POSITION, commit);
    }
  }
};

export default actions;