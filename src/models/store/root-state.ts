import { DepartmentState } from './department/department-state';
import { AuthState, PersonState, PositionState, UiUtilsState } from './index';

export interface RootState {
  AuthModule: AuthState;
  PersonModule: PersonState;
  PositionModule: PositionState;
  DepartmentModule: DepartmentState,
  UiUtilsModule: UiUtilsState;
};
