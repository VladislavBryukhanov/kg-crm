<template>
  <dynamic-options-manager 
    entityName="position"
    :options="positions"
    :getAll="listPositions"
    :create="createPosition"
    :delete="deletePosition"
  ></dynamic-options-manager>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';
  import { RootState } from '@/models/store';
  import { LIST_POSITIONS, CREATE_POSITION, DELETE_POSITION } from '@/store/action-types';
  import DynamicOptionsManager from '@/components/DynamicOptionsManager.vue';

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
  export default class PositionManager extends Vue {}
</script>