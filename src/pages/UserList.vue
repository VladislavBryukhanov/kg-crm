<template>
  <v-container>
    <v-row>
      <v-col
         v-for="user in users" 
        :key="user.id"
        :cols="6"
      >
        <v-card max-width="320">
          <v-img
            class="white--text align-end"
            :src="user.avatarUrl"
          >
            <v-card-title>{{user.fullName}}</v-card-title>
          </v-img>

          <v-card-text>
            <v-list two-line>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{departmentLabel(user.department)}}</v-list-item-title>
                  <v-list-item-subtitle>Department</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-content class="text-right">
                  <v-list-item-title>{{positionLabel(user.position)}}</v-list-item-title>
                  <v-list-item-subtitle>Position</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content class="text-center">
                  <v-list-item-title>{{user.hiredAt | date('DD MMMM YYYY')}}</v-list-item-title>
                  <v-list-item-subtitle>Hiring date</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Person, Position, Department } from '@/models/person';

  @Component
  export default class NavDrawer extends Vue {
    users: Person[] = [
      { 
        id: '1',
        fullName: 'Vladislav Bryukhanov',
        avatarUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        hiredAt: new Date().toISOString(),
        position: Position.MIDDLE_DEVELOPER,
        department: Department.JAVASCRIPT,
        attachedTo: '???',

        vacationDays: 12,
        sickLeaveDays: 15,
        unpaidDays: 0,

        developmentPlan: 'To learn AWS, React Native'
      },
      { 
        id: '2',
        fullName: 'Vladislav Bryukhanov',
        avatarUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        hiredAt: new Date().toISOString(),
        position: Position.MIDDLE_DEVELOPER,
        department: Department.JAVASCRIPT,
        attachedTo: '???',

        vacationDays: 12,
        sickLeaveDays: 15,
        unpaidDays: 0,

        developmentPlan: 'To learn AWS, React Native'
      },
      { 
        id: '3',
        fullName: 'Vladislav Bryukhanov',
        avatarUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        hiredAt: new Date().toISOString(),
        position: Position.MIDDLE_DEVELOPER,
        department: Department.JAVASCRIPT,
        attachedTo: '???',

        vacationDays: 12,
        sickLeaveDays: 15,
        unpaidDays: 0,

        developmentPlan: 'To learn AWS, React Native'
      }
    ];

    positionLabel(position: Position): string {
      return {
        [Position.JUNIOR_DEVELOPER]: 'Junior developer',
        [Position.MIDDLE_DEVELOPER]: 'Middle developer',
        [Position.SENIOR_DEVELOPER]: 'Senior developer',
        [Position.TEAM_LEAD]: 'Team lead',
        [Position.PROJECT_MANAGER]: 'Project manager',
        [Position.HUMAN_RESOURCES]: 'Human resources manager',
        [Position.CO_FOUNDER]: 'Senior developer',
      }[position]
    }

    departmentLabel(department: Department): string {
      return {
        [Department.JAVASCRIPT]: 'JavaScript',
        [Department.PHP]: 'PHP',
      }[department]
    }
  }
</script>