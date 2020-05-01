<template>
  <v-container>
    <v-layout>
      <v-flex sm8 offset-sm2>
        <v-card elevation="6">
          <v-list>
            <v-text-field 
              solo
              light 
              placeholder="Add new position"
              append-icon="library_add"
              @click:append="onAddPosition"
            >
            </v-text-field>

            <v-container>
              <h3 class="display-1 font-weight-light primary--text" v-if="!positions.length">
                No positions found
              </h3>
            </v-container>

            <v-list-item
              v-for="position in positions"
              :key="position.id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="position.label"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="onRemovePosition(position)">
                  <v-icon color="red darken-2">close</v-icon>
                </v-btn>
              </v-list-item-action>
              
              <!-- <v-divider></v-divider> -->
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';
  import { RootState } from '@/models/store';
  import { DynamicOption } from '@/models/dynamic-option';
  import { LIST_POSITIONS } from '@/store/action-types';

  @Component({
    computed: mapState<RootState>({
      positions: (state: RootState) => state.PositionModule.positions
    }),
    methods: mapActions({
      listPositions: LIST_POSITIONS
    })
  })
  export default class ManagePosition extends Vue {
    positions!: DynamicOption[];
    listPositions!: () => Promise<void>;

    created() {
      this.listPositions();
    }

    onAddPosition() {

    }

    async onRemovePosition(position: DynamicOption) {
       const confirm = await this.$root.$data.$confirmDialog(
        'Confirm position removing',
        `Are you sure you want to remove ${position.label} from the list of positions`
      );
    }
  }
</script>