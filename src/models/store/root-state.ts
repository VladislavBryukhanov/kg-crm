import { AuthState, PersonState } from './index';

export interface RootState {
  AuthModule: AuthState;
  PersonModule: PersonState;
};
