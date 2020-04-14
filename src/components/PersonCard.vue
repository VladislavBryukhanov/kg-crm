<template>
  <v-card :max-width="maxWidth">
    <v-img
      :src="avatar"
      class="align-end"
      max-height="240"
      contain
    ></v-img>
    <v-card-title 
      class="primary--text text-capitalize"
      style="position: relative;"
    >
      <v-speed-dial
        v-model="fabMode"
        v-if="person.id"
        absolute top right
      >
        <template v-slot:activator>
          <v-btn 
            v-if="!loading"
            v-model="fabMode"
            color="primary" dark fab
          >
            <v-icon v-if="fabMode">close</v-icon>
            <v-icon v-else>build</v-icon>
          </v-btn>
          <v-btn v-else dark fab @click.stop="" color="#1a567b9e">
             <v-progress-circular
              :width="3"
              color="white"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </template>
        <v-btn fab dark color="red darken-2" @click="onDeletePerson">
          <v-icon>delete</v-icon>
        </v-btn>
          <v-btn fab dark color="secondary">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-speed-dial>

      {{person.fullName}}
    </v-card-title>
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
        
        <v-list-item v-if="person.corporateMail">
          <v-list-item-content class="text-center">
            <v-list-item-title>
              {{person.corporateMail}}
            </v-list-item-title>
            <v-list-item-subtitle>Corporate email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { mapActions } from 'vuex';
  import { Option, Person, Position, Department, positionOptions, departmentOptions } from '@/models/person';
  import * as workerImg from '@/assets/worker.png';
  import { DELETE_PERSON } from '@/store/action-types';

  @Component({ 
    name: 'person-card',
    methods: mapActions({ deletePerson: DELETE_PERSON })
  })
  export default class PersonCard extends Vue {
    deletePerson!: (personId: string) => Promise<void>;

    @Prop(Object)
    person!: Person;

    @Prop(String)
    maxWidth!: string;

    get avatar() {
      return this.person.avatarUrl || workerImg;
    }

    departmentOptions = departmentOptions;
    positionOptions = positionOptions;

    fabMode = false;
    loading = false;

    positionLabel(position: Position): string{
      const option = positionOptions.find(({ value }) => value === position);
      return option ? option.label : '';
    }

    departmentLabel(department: Department): string {
      const option = departmentOptions.find(({ value }) => value === department);
      return option ? option.label : '';
    }

    async onDeletePerson() {
      const confirm = await this.$root.$data.$confirmDialog(
        'Confirm user removing',
        `Are you sure you want to remove ${this.person.fullName} from the list of employees`
      );

      if (confirm) {
        this.loading = true;
        await this.deletePerson(this.person.id!);
      }
    }
  }
</script>