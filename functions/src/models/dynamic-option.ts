export interface DynamicOption extends PositionConfig {
  id: string;
  label: string;
}

export interface PositionConfig {
  watchAll?: boolean;
  watchDepartment?: boolean;
}
