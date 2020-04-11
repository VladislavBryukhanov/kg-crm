<template>
  <v-container>
    <v-layout justify-center>
      <person-card maxWidth="320" :person="person"></person-card>
    </v-layout>
    <v-row>
      <v-col cols="6">
        <v-text-field 
          prepend-icon="contacts"
          label="Full name" 
          v-model="person.fullName" 
          cleaable
        ></v-text-field>
        <v-text-field 
          prepend-icon="email"
          label="Gmail" 
          v-model="person.gmail" 
          cleaable
        ></v-text-field>
        <v-text-field 
          prepend-icon="phone"
          label="Phone" 
          v-model="person.phone" 
          cleaable
        ></v-text-field>
        <v-text-field 
          prepend-icon="location_on"
          label="Address"
          v-model="person.address"
          cleaable
        ></v-text-field>
        <vuetify-date-picker 
          label="Birthday"
          :date.sync="person.birthday"
        ></vuetify-date-picker>
        <v-textarea 
          solo 
          label="Additional information"
          v-model="person.additionalInfo"
        ></v-textarea>
      </v-col>

      <v-col cols="6">
        <v-file-input
          label="Avatar"
          prepend-icon="camera_alt"
        ></v-file-input>
        <v-text-field 
          prepend-icon="mail_outline"
          label="Corporate email"
          v-model="person.corporateMail"
          clerable
        ></v-text-field>
        <v-select
          :items="departmentOptions"
          v-model="person.department"
          label="Department"
          prepend-icon="apartment"
        ></v-select>
        <v-select
          :items="positionOptions"
          v-model="person.position"
          label="Position"
          prepend-icon="business_center"
        ></v-select>
        <vuetify-date-picker
          label="Hiring date"
          :date.sync="person.hiredAt"
        ></vuetify-date-picker>
        <v-textarea
          solo
          label="Development plan"
          v-model="person.developmentPlan"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Person, positionOptions, departmentOptions } from '@/models/person';
  import VuetifyDatePicker from '@/components/atoms/VuetifyDatePicker.vue';
  import PersonCard from '@/components/PersonCard.vue';

  @Component({ components: { VuetifyDatePicker, PersonCard }})
  export default class PersonConstructor extends Vue {
    person: Partial<Person> = {};

    departmentOptions = departmentOptions;
    positionOptions = positionOptions;
  }
</script>
