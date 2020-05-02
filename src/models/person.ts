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

export enum Department {
  JAVASCRIPT = 'JS',
  PHP = 'PHP',
}

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