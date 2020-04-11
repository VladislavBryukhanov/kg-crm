<template>
  <v-container>
    <v-row>
      <v-col
         v-for="user in users" 
        :key="user.id"
        :cols="6"
      >
        <person-card maxWidth="320" :person="user"></person-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Person, Position, Department } from '@/models/person';
  import PersonCard from '@/components/PersonCard.vue';

  @Component({ components: { PersonCard } })
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
  }
</script>