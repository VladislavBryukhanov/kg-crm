<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-layout justify-center>
      <div>
        <person-card 
          maxWidth="320"
          :person="person"
          :isReadonly="true"
        ></person-card>
      </div>
      
      <v-sheet
        class="ml-8 pa-6"
        elevation="2"
      >
        <v-form v-model="valid">
          <h3 class="headline primary--text">
            Personal profile
          </h3>

          <v-row>
            <v-col cols="6">
              <v-text-field 
                prepend-icon="contacts"
                label="Full name *" 
                v-model="person.fullName" 
                :rules="rules.fullName"
                counter="64"
                clearable
              ></v-text-field>
              <v-text-field 
                prepend-icon="email"
                label="Gmail *" 
                v-model="person.gmail" 
                :rules="rules.gmail"
                clearable
              ></v-text-field>
              <v-text-field 
                prepend-icon="phone"
                label="Phone *" 
                v-model="person.phone" 
                :rules="rules.phone"
                clearable
              ></v-text-field>
              <v-text-field 
                prepend-icon="location_on"
                label="Address"
                v-model="person.address"
                clearable
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
                label="Department *"
                prepend-icon="apartment"
                item-text="label"
                return-object
                :items="departmentOptions"
                :rules="rules.department"
                v-model="person.department"
              ></v-select>
              <v-select
                label="Position *"
                prepend-icon="business_center"
                item-text="label"
                return-object
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
          
          <div>
            <v-divider></v-divider>

            <h3 class="headline primary--text mt-5">
              Days off statistics
            </h3>


            <v-row>
              <v-col cols="12" v-if="person.scheduledVacation">
                <h3 class="subtitle-1 secondary--text mx-4">
                  Last scheduled vacation
                </h3>
              </v-col>

              <v-col cols="6" v-if="person.scheduledVacation" class="px-8">
                <v-layout justify-space-between class="secondary-text body-2">
                  <span>{{person.scheduledVacation.startDate | date('DD MMMM YYYY')}}</span>
                  <span>{{person.scheduledVacation.endDate | date('DD MMMM YYYY')}}</span>
                </v-layout>
                <v-layout justify-space-between class="font-weight-thin caption">
                  <span>Start date</span>
                  <span>End date</span>
                </v-layout>
              </v-col>

              <v-col cols="6">
                <v-text-field 
                  label="Available vacation days" 
                  type="number"
                  prepend-icon="beach_access"
                  v-model.number="person.vacationDays" 
                  :rules="rules.vacationDays"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mx-4 mt-6">
              <vuetify-date-picker
                label="Sick leave days"
                :multiple="true"
                :date.sync="person.sickLeaveDays"
              ></vuetify-date-picker>
            </v-row>

            <v-row class="mx-4 mt-6">
              <vuetify-date-picker
                label="Unpaid leave days"
                :multiple="true"
                :date.sync="person.unpaydLeaveDays"
              ></vuetify-date-picker>
            </v-row>
          </div>
          
        </v-form>
      </v-sheet>
    </v-layout>

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
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { Route } from 'vue-router';
  import isEqual from 'lodash.isequal';
  import { CREATE_PERSON, FETCH_PERSON_BY_ID, UPDATE_PERSON, LIST_POSITIONS, LIST_DEPARTMENTS } from '@/store/action-types';
  import PersonCard from '@/components/PersonCard.vue';
  import VuetifyDatePicker from '@/components/atoms/VuetifyDatePicker.vue';
  import { Person } from '@/models/person';
  import { RootState } from '@/models/store';
  import { CreatePerson, UpdatePerson } from '@/models/store/person/actions-payload';
  import { DynamicOption } from '../models/dynamic-option';

  @Component({
    components: { VuetifyDatePicker, PersonCard },
     computed: mapState<RootState>({
      persons: (state: RootState) => state.PersonModule.persons,
      departmentOptions: (state: RootState) => state.DepartmentModule.departments,
      positionOptions: (state: RootState) => state.PositionModule.positions,
    }),
    methods: mapActions({ 
      createPerson: CREATE_PERSON,
      fetchPerson: FETCH_PERSON_BY_ID,
      updatePerson: UPDATE_PERSON,
      listPositions: LIST_POSITIONS,
      listDepartments: LIST_DEPARTMENTS,
    }),
  })
  export default class PersonConstructor extends Vue {
    private fetchPerson!: (personId: string) => Promise<void>;
    private createPerson!: (payload: CreatePerson) => Promise<void>;
    private updatePerson!: (payload: UpdatePerson) => Promise<void>;
    private listPositions!: () => Promise<void>;
    private listDepartments!: () => Promise<void>;

    persons!: Person[];
    positionOptions!: DynamicOption[];
    departmentOptions!: DynamicOption[];

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

    loading = false;

    personAvatar?: File;

    originalPerson?: Person;
    person: Partial<Person> = { avatarUrl: '' }; // avatarUrl init value needed for reactivity

    get isDataValid() {
      const isFormValid = this.valid && this.person.hiredAt;
      const isAnyUpdates = this.originalPerson && !isEqual(this.person, this.originalPerson);

      return isFormValid && (!this.isEditMode || isAnyUpdates);
    }

    private get isEditMode() {
      return !!this.$router.currentRoute.params.personId;
    }

    @Watch('persons', { immediate: true })
    private onPersonsChanged(persons: Person[]) {
      const { personId } = this.$router.currentRoute.params;

      if (!personId || !this.persons.length) return;

      this.initPerson(personId, this.persons);
    }

    @Watch('$route')
    private onRouteChange(to: Route, from: Route) {
      const { personId } = to.params;

      if (personId) {
        if (!this.persons) {
          return this.fetchPerson(personId);  
        }

        return this.initPerson(personId, this.persons);
      }

      this.person = { avatarUrl: '' }; // avatarUrl init value needed for reactivity
      this.originalPerson = undefined;
    }

    private created() {
      const { personId } = this.$router.currentRoute.params;

      if (personId && !this.persons.find(({ id }) => id === personId)) {
        this.fetchPerson(personId);
      }

      if (!this.positionOptions.length) {
        this.listPositions();
      }

      if (!this.departmentOptions.length) {
        this.listDepartments();
      }
    }

    private initPerson(personId: string, persons: Person[]) {
      this.originalPerson = persons.find(({ id }) => id === personId);

      if (!this.originalPerson) return;
      
      const { avatarUrl } = this.originalPerson;
      
      if (!avatarUrl) {
        this.originalPerson.avatarUrl = '';
      }

      this.person = { ...this.originalPerson };
    }

    onAvatarChanged(file: File) {
      if (!file) return;

      this.personAvatar = file;
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.person.avatarUrl = reader.result as string;
      }
    }

    async onSave() {
      this.loading = true;

      const newPerson = { ...this.person } as Person;
      delete newPerson.id;
      delete newPerson.avatarUrl;

      if (this.isEditMode) {
        await this.updatePerson({ 
          personId: this.person.id!,
          updates: newPerson,
          avatar: this.personAvatar,
        });
      } else {
        await this.createPerson({ 
          person: newPerson,
          avatar: this.personAvatar,
        });
      }
      
      this.loading = false;
    }
  }
</script>
