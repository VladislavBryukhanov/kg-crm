import { DynamicOption } from './dynamic-option';
import { DocumentReference } from '@google-cloud/firestore';

export interface Person extends PersonPrivateInfo {
  id: string;
  fullName: string;
  avatarUrl?: string;
  avatarFileId?: string;
  hiredAt: string;
  positionRef: DocumentReference;
  position: DynamicOption;
  departmentRef: DocumentReference;
  department: DynamicOption;
  attachedTo?: string; //TODO Link to person
  corporateMail?: string;

  additionInfo?: string;
  developmentPlan: string;
};

export interface PersonPrivateInfo {
  gmail?: string;
  phone?: string;
  birthday?: string;
  address?: string;

  expectedVacation: ScheduleVacation;
  vacationDays: number;
  sickLeaveDays: number;
  unpaidDays: number;
};

export interface ScheduleVacation {
  startDate: Date;
  endDate: Date;
};
