<template>
  <v-container>
    <v-row>
      <template v-if="isLoading">
        <v-col
          v-for="n in skeletonItems"
          :key="n"
          :cols="6"
        >
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </template>

      <v-col
        v-else
         v-for="person in persons" 
        :key="person.id"
        :cols="6"
      >
        <person-card :isReadonly="!profile.isAdmin" maxWidth="320" :person="person"></person-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { Person } from '@/models/person';
  import PersonCard from '@/components/PersonCard.vue';
  import { LIST_PERSONS } from '@/store/action-types';
  import { RootState } from '@/models/store';

  @Component({ 
    components: { PersonCard },
    computed: mapState<RootState>({
      profile: (state: RootState) => state.AuthModule.me,
      persons: (state: RootState) => state.PersonModule.persons
    }),
    methods: mapActions({
      listPersons: LIST_PERSONS
    })
  })
  export default class NavDrawer extends Vue {
    listPersons!: () => Promise<void>;

    persons!: Person[];
    
    readonly skeletonItems = 4;
    isLoading = true;

    async created() {
      this.isLoading = !this.persons.length;

      await this.listPersons();

      this.isLoading = false;
    }
  }
</script>