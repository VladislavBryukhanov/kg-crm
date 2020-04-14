<template>
  <v-container>
    <v-layout justify-center>
      <person-card maxWidth="320" :person="person"></person-card>
    </v-layout>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="6">
          <v-text-field 
            prepend-icon="contacts"
            label="Full name *" 
            v-model="person.fullName" 
            :rules="rules.fullName"
            counter="64"
            cleaable
          ></v-text-field>
          <v-text-field 
            prepend-icon="email"
            label="Gmail *" 
            v-model="person.gmail" 
            :rules="rules.gmail"
            cleaable
          ></v-text-field>
          <v-text-field 
            prepend-icon="phone"
            label="Phone *" 
            v-model="person.phone" 
            :rules="rules.phone"
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
            accept="image/ *"
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
            label="Department *"
            prepend-icon="apartment"
            item-text="label"
            item-value="value"
            :items="departmentOptions"
            :rules="rules.department"
            v-model="person.department"
          ></v-select>
          <v-select
            label="Position *"
            prepend-icon="business_center"
            item-text="label"
            item-value="value"
            :items="positionOptions"
            :rules="rules.position"
            v-model="person.position"
          ></v-select>
          <vuetify-date-picker
            label="Hiring date *"
            :date.sync="person.hiredAt"
          ></vuetify-date-picker>
          <v-textarea
            solo
            label="Development plan"
            v-model="person.developmentPlan"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <v-btn
      v-if="isDataValid"
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

    valid = false;

    rules = {
      avatar: [
        (v: File) => !v || v.size < 5 * 1024 * 1024 || 'Avatar size should be less than 5 MB!',
      ],
      fullName: [
        (v?: string) => !!v || 'Full name is required',
        (v?: string) => v && v.length >= 3 && v.length <= 64 || 'Full name should be more than 3 characters and less than 64'
      ],
      gmail: [
        (v?: string) => {
          if (!v) {
            return 'Gmail is required';
          }
          
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(v.toLowerCase()) || 'Invalid Gmail';
        }
      ],
      phone: [
        (v?: string) => {
          if (!v) {
            return 'Phone is required';
          }
          
          const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          return regex.test(v) || 'Invalid Phone number';
        }
      ],
      department: [
        (v: string) => !!v || 'Department is required',
      ],
      position: [
        (v: string) => !!v || 'Position is required',
      ],
    };

    person: Partial<Person> = {
      avatarUrl: ''
    };

    get isDataValid() {
      return this.valid && this.person.hiredAt;
    }

    onAvatarChanged(file: File) {
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.person.avatarUrl = reader.result as string;
      }
    }

    async onSave() {
      // TODO implement avatar uploading
      const newPerson = { ...this.person } as Person;
      delete newPerson.avatarUrl;
      delete newPerson.id;

      await this.createPerson(newPerson);
      this.$router.go(-1);
    }
  }
</script>
