<template>
  <dynamic-options-manager 
    entityName="position"
    :options="positions"
    :getAll="listPositions"
    :create="createPosition"
    :delete="deletePosition"
    :optionConfig="optionConfig"
  ></dynamic-options-manager>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';
  import { RootState } from '@/models/store';
  import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION } from '@/store/action-types';
  import DynamicOptionsManager from '@/components/DynamicOptionsManager.vue';
  import { DynamicOptionProperies } from '../models/dynamic-option';

  @Component({
    components: { DynamicOptionsManager },
    computed: mapState<RootState>({
      positions: (state: RootState) => state.PositionModule.positions
    }),
    methods: mapActions({
      listPositions: LIST_POSITIONS,
      createPosition: CREATE_POSITION,
      deletePosition: DELETE_POSITION,
    }),
  })
  export default class PositionManager extends Vue {
    optionConfig: DynamicOptionProperies[] = [
      {
        label: 'Watch all vacations',
        icon: 'event_note',
        modelKey: 'watchAll',
      },
      {
        label: 'Watch department vacations',
        icon: 'event',
        modelKey: 'watchDepartment',
      }
    ]
  }
</script>