<template>
  <v-container>
    <v-row v-if="persons">
      <v-col
         v-for="person in persons" 
        :key="person.id"
        :cols="6"
      >
        <person-card maxWidth="320" :person="person"></person-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { Person, Position, Department } from '@/models/person';
  import PersonCard from '@/components/PersonCard.vue';
  import { LIST_PERSONS } from '@/store/action-types';
  import { RootState } from '@/models/store';

  @Component({ 
    components: { PersonCard },
    computed: mapState<RootState>({
      persons: (state: RootState) => state.PersonModule.persons
    }),
    methods: mapActions({
      listPersons: LIST_PERSONS
    })
  })
  export default class NavDrawer extends Vue {
    listPersons!: () => Promise<void>;
    
    created() {
      this.listPersons();
    }
  }
</script>