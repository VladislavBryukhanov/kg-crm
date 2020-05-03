<template>
  <v-container>
    <h3 class="headline secondary--text text-center mb-10">
      Number of vacation days available: {{profile.vacationDays}}
    </h3>
    <v-date-picker
      class="date-picker"
      range
      :min="new Date().toISOString()"
      v-model="vacationRange"
    ></v-date-picker>

    <v-btn 
      class="d-block mx-auto mt-10"
      large
      color="secondary"
      :disabled="isSchedulingInactive"
      @click="onScheduleVacation"
    >
      Schedule vacation
      <template v-if="isLoading">
        <v-progress-circular indeterminate size="28" class="ml-4"></v-progress-circular>
      </template>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { mapState, mapMutations, mapActions } from 'vuex';
  import moment from 'moment-mini';
  import { SHOW_SNACKBAR, SCHEDULE_VACATION } from '@/store/action-types';
  import { RootState, SnackBar } from '@/models/store';
  import { Person, ScheduleVacation } from '@/models/person';

  @Component({
    computed: mapState<RootState>({
      profile: (state: RootState) => state.AuthModule.me
    }),
    methods: {
      ...mapMutations({
        showSnackbar: SHOW_SNACKBAR
      }),
      ...mapActions({
        scheduleVacation: SCHEDULE_VACATION
      })
    }
  })
  export default class VacationManager extends Vue {
    profile!: Person;
    showSnackbar!: (snackbar: SnackBar) => void;
    scheduleVacation!: (range: ScheduleVacation) => Promise<void>;

    vacationRange: Date[] = [];
    isLoading = false;

    get isRangeSelected() {
      return this.vacationRange.length == 2;
    }

    get isVacationScheduled() {
      return this.profile.scheduledVacation;
    }

    get isSchedulingInactive() {
      return !this.isRangeSelected || this.isLoading || this.isVacationScheduled;
    }

    @Watch('profile', { immediate: true, deep: true })
    private onPersonVacationChange(profile: Person, oldProfile: Person) {
      if (oldProfile && profile.scheduledVacation !== oldProfile.scheduledVacation) {
        this.showSnackbar({ message: 'Your vacation schedule saved and sent to administration' });
      }

      if (!profile.scheduledVacation) return;

      this.vacationRange = [
        profile.scheduledVacation.startDate,
        profile.scheduledVacation.endDate,
      ];
    }

    async onScheduleVacation() {
      const [startDate, endDate] = this.vacationRange;
      if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        this.vacationRange.reverse();
      }

      const startMoment = moment(startDate);
      const endMoment = moment(endDate);
      const requestedVacationDuration = endMoment.diff(startMoment, 'days') + 1;

      if (requestedVacationDuration > this.profile.vacationDays) {
        return this.showSnackbar({ message: 'You do not have so many vacation days' });
      }

      const confirm = await this.$root.$data.$confirmDialog(
        'Confirm scheduling',
        'Are you sure you want to schedule vacation on this range? An email will be sent to your PM, HR and Director to notify them'
      );

      if (!confirm) return;

      this.isLoading = true;

      await this.scheduleVacation({ 
        startDate: this.vacationRange[0],
        endDate: this.vacationRange[1],
      });

      this.isLoading = false;
    }
  }
</script>

<style>
  .date-picker {
    width: fit-content;
    display: flex;
    margin: auto;
  }
</style>