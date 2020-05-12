<template>
  <v-card :max-width="maxWidth">
    <v-overlay :value="loading" :absolute="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-img
      :src="person.avatarUrl | personAvatarUrl"
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
        v-if="!isReadonly && person.id"
        absolute top right
      >
        <template v-slot:activator>
          <v-btn v-model="fabMode" color="primary" dark fab>
            <v-icon v-if="fabMode">close</v-icon>
            <v-icon v-else>build</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark color="red darken-2" @click="onDeletePerson">
          <v-icon>delete</v-icon>
        </v-btn>
          <v-btn fab dark color="secondary" @click="navigateToEditPerson">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-speed-dial>

      {{person.fullName}}
    </v-card-title>
    <v-card-text>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{person.department && person.department.label}}</v-list-item-title>
            <v-list-item-subtitle>Department</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-right">
            <v-list-item-title>{{person.position && person.position.label}}</v-list-item-title>
            <v-list-item-subtitle>Position</v-list-item-subtitle>
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
  import { mapActions } from 'vuex';
  import { Person } from '@/models/person';
  import { RootState } from '@/models/store';
  import * as workerImg from '@/assets/worker.png';
  import { DELETE_PERSON, LIST_POSITIONS } from '@/store/action-types';

  @Component({ 
    name: 'person-card',
    methods: mapActions({ 
      deletePerson: DELETE_PERSON,
      listPositions: LIST_POSITIONS,
    })
  })
  export default class PersonCard extends Vue {
    private deletePerson!: (personId: string) => Promise<void>;
    private listPositions!: () => Promise<void>;

    @Prop(Object)
    person!: Person;

    @Prop(String)
    maxWidth!: string;

    @Prop(Boolean)
    isReadonly?: boolean;

    fabMode = false;
    loading = false;

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

    navigateToEditPerson() {
      this.$router.push({ name: 'EditPerson', params: { personId: this.person.id! } });
    }
  }
</script>