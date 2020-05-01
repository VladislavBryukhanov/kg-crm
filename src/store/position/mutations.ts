import { LIST_POSITIONS } from '@/store/mutation-types';
import { DynamicOption } from '@/models/dynamic-option';
import { PositionState } from '@/models/store';
import { MutationTree } from 'vuex';

const mutations: MutationTree<PositionState> = {
  async [LIST_POSITIONS](state: PositionState, positions: DynamicOption[]) {
    state.positions = positions;
  }
}

export default mutations;
