export interface DynamicOption extends AdditionConfig {
  id: string;
  label: string;
}

export interface DynamicOptionProperies {
  label: string;
  icon: string;
  modelKey: keyof AdditionConfig;
}

export interface AdditionConfig extends PositionConfig {}

export interface PositionConfig {
  watchAll?: boolean;
  watchDepartment?: boolean;
}
