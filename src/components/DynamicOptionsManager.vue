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
              v-model="newOptionLabel"
              :placeholder="`Add new ${entityName}`"
              @keyup.enter="onAddOption"
              :disabled="isItemProcessing"
            >
              <template slot="append">
                <v-menu v-if="optionConfig">
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon v-if="selectedConfigPropKey" color="primary">
                        {{selectedConfigPropKey.icon}}
                      </v-icon>
                      <v-icon v-else>
                        settings
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item-group v-model="selectedConfigPropKey" color="primary">
                      <v-list-item 
                        v-for="config in optionConfig"
                        :value="config"
                        :key="config.modelKey"
                      >
                        <v-list-item-icon>
                          <v-icon>{{config.icon}}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          {{config.label}}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>

                <v-btn icon @click="onAddOption">
                  <v-icon>library_add</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <template v-if="!options.length">
              <v-container v-if="isLoading">
                <v-skeleton-loader
                  v-for="n in skeletonItems"
                  :key="n"
                  height="54"
                  type="list-item"
                ></v-skeleton-loader>
              </v-container>

              <v-container v-else>
                <h3 class="display-1 font-weight-light primary--text">
                  No {{entityName}}s found
                </h3>
              </v-container>
            </template>

            <v-list-item
              v-for="option in options"
              :key="option.id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="option.label"></v-list-item-title>
              </v-list-item-content>
              
              <v-tooltip v-if="getConfigOption(option)" top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" v-on="on">
                    {{getConfigOption(option).icon}}
                  </v-icon>
                </template>
                <span>{{getConfigOption(option).label}}</span>
              </v-tooltip>

              <v-list-item-action>
                <v-btn icon @click="onRemoveOption(option)">
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
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { RootState, SnackBar } from '@/models/store';
  import { CreateEntity } from '@/models/common';
  import { DynamicOption, DynamicOptionProperies, PositionConfig } from '@/models/dynamic-option';
  import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION, SHOW_SNACKBAR } from '@/store/action-types';
  import capitalize from 'lodash.capitalize';
  import memoize from 'lodash.memoize';

  @Component({
    name: 'dynamic-options-manager',
    methods: mapMutations({
      showSnackbar: SHOW_SNACKBAR
    })
  })
  export default class DynamicOptionsManager extends Vue {
    showSnackbar!: (snackbar: SnackBar) => void;

    @Prop(Function)
    getAll!: () => Promise<void>;
    
    @Prop(Function)
    create!: (option: CreateEntity<DynamicOption>) => Promise<void>;
    
    @Prop(Function)
    delete!: (optionId: string) => Promise<void>;

    @Prop(Array)
    options!: DynamicOption[];

    @Prop(String)
    entityName!: string;

    @Prop(Array)
    optionConfig?: DynamicOptionProperies[];

    readonly skeletonItems = 4;
    isLoading = true;
    isItemProcessing = false;

    newOptionLabel = '';
    selectedConfigPropKey: DynamicOptionProperies | null = null;

    created() {
      this.isLoading = !this.options.length;

      if (this.isLoading) {
        this.getAll()
          .then(res => this.isLoading = false);
      }
    }

    // TODO implement edit mode
    // TODO check unique

    getConfigOption = memoize((option: DynamicOption) =>
      this.optionConfig && this.optionConfig.find(({ modelKey }) => Object.keys(option).includes(modelKey)),
      (option: DynamicOption) => option.id
    )

    validateOption(optionName: string) {
      if (optionName.length >= 2 && optionName.length <= 48) {
        return true;
      }
      this.showSnackbar({
        message: `${capitalize(this.entityName)} name must be longer then 1 and less then 32 characters!`,
        duration: 5000
      });
    }

    async onAddOption() {
      if (!this.validateOption(this.newOptionLabel)) return;

      const confirm = await this.$root.$data.$confirmDialog(
        'Confirm creating',
        `Are you sure you want to create ${this.newOptionLabel} ${this.entityName}`
      );

      if (confirm) {
        this.isItemProcessing = true;

        const option: CreateEntity<DynamicOption> = { label: this.newOptionLabel };

        if (this.selectedConfigPropKey) {
          option[this.selectedConfigPropKey.modelKey] = true;
        }

        await this.create(option);

        this.newOptionLabel = '';
        this.selectedConfigPropKey = null;
        this.isItemProcessing = false;
      }
    }

    async onRemoveOption(option: DynamicOption) {
       const confirm = await this.$root.$data.$confirmDialog(
        `Confirm ${this.entityName} removing`,
        `Are you sure you want to remove ${option.label} from the list of ${this.entityName}s`
      );

      if (confirm) {
        this.isItemProcessing = true;
        await this.delete(option.id!);
        this.isItemProcessing = false;
      }
    }
  }
</script>