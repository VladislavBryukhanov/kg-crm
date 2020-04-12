import { Person } from '@/models/person';

export interface AuthState {
  me?: Person;
  authState?: AuthMode;
};

export enum AuthMode {
  SIGNED_OUT = 'SignedOut',
  SIGNED_IN = 'SignedIn',
};
