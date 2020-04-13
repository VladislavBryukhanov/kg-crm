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
          accept="image/*"
          clerable
          :rules="rules.avatar"
          @change="onAvatarChanged"
        ></v-file-input>
        <v-text-field 
          prepend-icon="mail_outline"
          label="Corporate email"
          v-model="person.corporateMail"
          clerable
        ></v-text-field>
        <v-select
          label="Department"
          prepend-icon="apartment"
          item-text="label"
          item-value="value"
          :items="departmentOptions"
          v-model="person.department"
        ></v-select>
        <v-select
          label="Position"
          prepend-icon="business_center"
          item-text="label"
          item-value="value"
          :items="positionOptions"
          v-model="person.position"
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

    <v-btn 
      fab
      fixed
      dark
      bottom
      right
      color="primary"
      @click="onSave"
    >
      <v-icon>done_outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapActions } from 'vuex';
  import { CREATE_PERSON } from '@/store/action-types';
  import PersonCard from '@/components/PersonCard.vue';
  import VuetifyDatePicker from '@/components/atoms/VuetifyDatePicker.vue';
  import { Person, positionOptions, departmentOptions } from '@/models/person';

  @Component({ 
    components: { VuetifyDatePicker, PersonCard },
    methods: mapActions({ createPerson: CREATE_PERSON }),
  })
  export default class PersonConstructor extends Vue {
    createPerson!: (person: Person) => Promise<void>;

    departmentOptions = departmentOptions;
    positionOptions = positionOptions;

    person: Partial<Person> = {
      avatarUrl: ''
    };

    rules = {
      avatar: [
        (value: File) => !value || value.size < 5 * 1024 * 1024 || 'Avatar size should be less than 5 MB!'
      ]
    }

    onAvatarChanged(file: File) {
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.person.avatarUrl = reader.result as string;
      }
    }

    onSave() {
      // TODO implement validation, avatar uploading
      const newPerson = { ...this.person } as Person;
      delete newPerson.avatarUrl;
      delete newPerson.id;

      this.createPerson(newPerson);
    }
  }
</script>
