import { AuthState, PersonState, PositionState } from './index';

export interface RootState {
  AuthModule: AuthState;
  PersonModule: PersonState;
  PositionModule: PositionState;
};
