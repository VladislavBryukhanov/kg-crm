import { DynamicOption } from '@/models/dynamic-option';
import { ActionTree } from 'vuex';
import * as mutations from '../mutation-types';
import { PositionRepo } from '@/api/position.repo';
import { PositionState, RootState } from '@/models/store';
import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION } from '@/store/action-types';

const actions: ActionTree<PositionState, RootState> = {
  async [LIST_POSITIONS]({ commit }) {
    const positions = await PositionRepo.list();
    commit(mutations.LIST_POSITIONS, positions)
  },
  async [CREATE_POSITION]({ commit }, newPosition: DynamicOption) {
    const position = await PositionRepo.create(newPosition);
    commit(mutations.CREATE_POSITION, position);
  },
  async [DELETE_POSITION]({ commit }, positionId) {
    await PositionRepo.delete(positionId);
    commit(mutations.DELETE_POSITION, positionId);
  }
};

export default actions;

// TODO implement error handling