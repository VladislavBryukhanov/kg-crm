import { AuthState, PersonState, PositionState, UiUtilsState } from './index';

export interface RootState {
  AuthModule: AuthState;
  PersonModule: PersonState;
  PositionModule: PositionState;
  UiUtilsModule: UiUtilsState;
};
