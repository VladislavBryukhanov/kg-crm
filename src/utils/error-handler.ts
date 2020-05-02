import { Commit } from 'vuex';
import { FirebaseError } from 'firebase';
import { SHOW_SNACKBAR } from '@/store/action-types';

export const errorHandler = (
  err: FirebaseError,
  action: string,
  commit: Commit,
  duration = 2000,
) => {
  console.error(err);
  
  commit(SHOW_SNACKBAR, {
    duration,
    message: `[${action}]: ${err.message}`
  }, { root: true });
};
