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
