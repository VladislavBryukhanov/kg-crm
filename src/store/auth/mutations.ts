import moment from 'moment-mini';
import Vue from 'vue';
import { CHECK_AUTH, SIGN_OUT, SCHEDULE_VACATION } from '../action-types';
import { MutationTree } from 'vuex';
import { Person, ScheduleVacation } from '@/models/person';
import { AuthState, AuthMode } from '@/models/store/auth/auth-state';

const mutations: MutationTree<AuthState> = {
  [CHECK_AUTH](state: AuthState, person: Person)   {
    state.me = person;
    state.authState = AuthMode.SIGNED_IN;
  },
  [SIGN_OUT](state)   {
    state.me = undefined;
    state.authState = AuthMode.SIGNED_OUT;
  },
  [SCHEDULE_VACATION](state: AuthState, expectedVacation: ScheduleVacation) {
    const { startDate, endDate } = expectedVacation;
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    const vacationDuration = endMoment.diff(startMoment, 'days') + 1;
    const vacationDays = state.me!.vacationDays - vacationDuration;

    state.me = { ...state.me!, expectedVacation, vacationDays };
  },
}

export default mutations;
