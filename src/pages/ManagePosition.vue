<template>
  <v-container>
    <v-layout>
      <v-flex sm8 offset-sm2>
        <v-card elevation="6">
          <v-list>
            <v-progress-linear
              absolute
              top
              :active="isItemProcessing"
              :indeterminate="isItemProcessing"
              color="primary"
            ></v-progress-linear>
            <v-text-field 
              solo
              light 
              v-model="newPosition"
              placeholder="Add new position"
              append-icon="library_add"
              @click:append="onAddPosition"
              @keyup.enter="onAddPosition"
              :disabled="isItemProcessing"
            >
            </v-text-field>

            <v-container v-if="isLoading && !positions.length">
              <v-skeleton-loader
                v-for="n in skeletonItems"
                :key="n"
                height="54"
                type="list-item"
              ></v-skeleton-loader>
            </v-container>

            <v-container v-else-if="!isLoading && !positions.length">
              <h3 class="display-1 font-weight-light primary--text">
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
                  <v-icon color="red darken-2">delete_forever</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { RootState, SnackBar } from '@/models/store';
  import { CreateEntity } from '@/models/common';
  import { DynamicOption } from '@/models/dynamic-option';
  import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION, SHOW_SNACKBAR } from '@/store/action-types';

  @Component({
    computed: mapState<RootState>({
      positions: (state: RootState) => state.PositionModule.positions
    }),
    methods: {
      ...mapActions({
        listPositions: LIST_POSITIONS,
        createPosition: CREATE_POSITION,
        deletePosition: DELETE_POSITION,
      }),
      ...mapMutations({
        showSnackbar: SHOW_SNACKBAR
      })
    }
  })
  export default class ManagePosition extends Vue {
    positions!: DynamicOption[];
    listPositions!: () => Promise<void>;
    createPosition!: (position: CreateEntity<DynamicOption>) => Promise<void>;
    deletePosition!: (positionId: string) => Promise<void>;
    showSnackbar!: (snackbar: SnackBar) => void;

    readonly skeletonItems = 4;
    isLoading = true;

    isItemProcessing = false;
    newPosition = '';

    created() {
      this.listPositions()
        .then(res => this.isLoading = false);
    }

    // TODO implement edit mode
    // TODO check unique

    validatePosition(positionName: string) {
      if (positionName.length >= 2 && positionName.length <= 48) {
        return true;
      }
      this.showSnackbar({
        message: 'Position name must be longer then 1 and less then 32 characters!',
        duration: 5000
      });
    }

    async onAddPosition() {
      if (!this.validatePosition(this.newPosition)) return;

      const confirm = await this.$root.$data.$confirmDialog(
        'Confirm creating',
        `Are you sure you want to create ${this.newPosition} position`
      );

      if (confirm) {
        this.isItemProcessing = true;
        await this.createPosition({ label: this.newPosition });
        this.newPosition = '';
        this.isItemProcessing = false;
      }
    }

    async onRemovePosition(position: DynamicOption) {
       const confirm = await this.$root.$data.$confirmDialog(
        'Confirm position removing',
        `Are you sure you want to remove ${position.label} from the list of positions`
      );

      if (confirm) {
        this.isItemProcessing = true;
        await this.deletePosition(position.id!);
        this.isItemProcessing = false;
      }
    }
  }
</script>