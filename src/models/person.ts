export interface Person extends PersonPrivateInfo {
  id?: string;
  fullName: string;
  avatarUrl?: string;
  hiredAt: string;
  position: Position;
  department: Department;
  attachedTo?: string; //TODO Link to person
  corporateMail?: string;

  additionInfo?: string;
  developmentPlan: string;
}

export interface PersonPrivateInfo {
  gmail?: string;
  phone?: string;
  birthday?: string;
  address?: string;

  vacationDays: number;
  sickLeaveDays: number;
  unpaidDays: number;
}

export interface Option {
  value: string;
  label: string;
}

export enum Position {
  JUNIOR_DEVELOPER = 'junior_dev',
  MIDDLE_DEVELOPER = 'middle_dev',
  SENIOR_DEVELOPER = 'senior_dev',
  TEAM_LEAD = 'team_lead',
  PROJECT_MANAGER = 'project_manager',
  HUMAN_RESOURCES = 'human_resources_manager',
  CO_FOUNDER = 'co_founder',
}

export enum Department {
  JAVASCRIPT = 'JS',
  PHP = 'PHP',
}

export const positionOptions: Option[] = [
  {
    value: Position.JUNIOR_DEVELOPER,
    label: 'Junior developer',
  },
  {
    value: Position.MIDDLE_DEVELOPER,
    label: 'Middle developer',
  },
  {
    value: Position.SENIOR_DEVELOPER,
    label: 'Senior developer',
  },
  {
    value: Position.TEAM_LEAD,
    label: 'Team lead',
  },
  {
    value: Position.PROJECT_MANAGER,
    label: 'Project manager',
  },
  {
    value: Position.HUMAN_RESOURCES,
    label: 'Human resources manager',
  },
  {
    value: Position.CO_FOUNDER,
    label: 'Senior developer',
  },
];

export const departmentOptions: Option[] = [
  {
    value: Department.JAVASCRIPT,
    label: 'JavaScript',
  },
  {
    value: Department.PHP,
    label: 'PHP',
  },
];