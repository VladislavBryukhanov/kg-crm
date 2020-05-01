import { SnackBar } from '@/models/store/ui-utils/ui-utils-state';
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '@/store/action-types';
import { UiUtilsState } from '@/models/store';
import { MutationTree } from 'vuex';

const mutations: MutationTree<UiUtilsState> = {
  [SHOW_SNACKBAR](state, { message, duration = 500 }: SnackBar) {
    state.snackbar = {
      isDisplayed: true,
      message,
      duration,
    }
  },
  [HIDE_SNACKBAR](state) {
    state.snackbar = {
      isDisplayed: false,
      duration: 500,
      message: '',
    }
  }
}

export default mutations;
