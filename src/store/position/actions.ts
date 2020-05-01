import { ActionTree } from 'vuex';
import * as mutations from '../mutation-types';
import { PositionRepo } from '@/api/position.repo';
import { LIST_POSITIONS } from '@/store/action-types';
import { PositionState, RootState } from '@/models/store';

const actions: ActionTree<PositionState, RootState> = {
  async [LIST_POSITIONS]({ commit }) {
    const positions = await PositionRepo.list();
    commit(mutations.LIST_POSITIONS, positions)
  }
};

export default actions;
