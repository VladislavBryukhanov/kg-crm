import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION } from '@/store/mutation-types';
import { DynamicOption } from '@/models/dynamic-option';
import { PositionState } from '@/models/store';
import { MutationTree } from 'vuex';

const mutations: MutationTree<PositionState> = {
  [LIST_POSITIONS](state: PositionState, positions: DynamicOption[]) {
    state.positions = positions;
  },
  [CREATE_POSITION](state: PositionState, position: DynamicOption) {
    state.positions.push(position);
  },
  [DELETE_POSITION](state: PositionState, positionId: string) {
    const index = state.positions.findIndex(({ id }) => positionId === id );
    if (~index) {
      state.positions.splice(index, 1);
    }
  },
}

export default mutations;
