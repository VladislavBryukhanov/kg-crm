import firebase from 'firebase';
import { DynamicOption } from '@/models/dynamic-option';

export interface Person extends PersonPrivateInfo {
  id?: string;
  fullName: string;
  avatarUrl?: string;
  avatarFileId?: string;
  hiredAt: string;
  positionRef: firebase.firestore.DocumentReference;
  position: DynamicOption;
  departmentRef: firebase.firestore.DocumentReference;
  department: DynamicOption;
  attachedTo?: string; //TODO Link to person
  corporateMail?: string;

  additionInfo?: string;
  developmentPlan: string;
};

export interface PersonPrivateInfo {
  gmail: string;
  phone?: string;
  birthday?: string;
  address?: string;

  scheduledVacation: ScheduleVacation;
  vacationDays: number;
  sickLeaveDays: string[];
  unpaidDays: string[];
};

export interface ScheduleVacation {
  startDate: Date;
  endDate: Date;
};
