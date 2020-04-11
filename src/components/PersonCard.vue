<template>
  <v-card :max-width="maxWidth">
    <v-img
      :src="avatar"
      class="align-end"
      max-height="240"
      contain
    >
    </v-img>
    <v-card-title class="primary--text text-capitalize">{{person.fullName}}</v-card-title>

    <v-card-text>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{departmentLabel(person.department)}}</v-list-item-title>
            <v-list-item-subtitle>Department</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-right">
            <v-list-item-title>{{positionLabel(person.position)}}</v-list-item-title>
            <v-list-item-subtitle>Position</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-title v-if="person.hiredAt">
              {{person.hiredAt | date('DD MMMM YYYY')}}
            </v-list-item-title>
            <v-list-item-subtitle>Hiring date</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Option, Person, Position, Department, positionOptions, departmentOptions } from '@/models/person';
  import * as workerImg from '@/assets/worker.png';

  @Component({ name: 'person-card' })
  export default class PersonCard extends Vue {
    @Prop(Object)
    person!: Person;

    @Prop(String)
    maxWidth!: string;

    get avatar() {
      return this.person.avatarUrl || workerImg;
    }

    departmentOptions = departmentOptions;
    positionOptions = positionOptions;

    positionLabel(position: Position): string{
      const option = positionOptions.find(({ value }) => value === position);
      if (option) {
        return option.label;
      }
      return  '';
    }

    departmentLabel(department: Department): string {
      const option = departmentOptions.find(({ value }) => value === department);
      if (option) {
        return option.label;
      }
      return  '';
    }
  }
</script>