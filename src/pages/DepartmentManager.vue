<template>
  <dynamic-options-manager 
    entityName="department"
    :options="departments"
    :getAll="listDepartments"
    :create="createDepartment"
    :delete="deleteDepartment"
  ></dynamic-options-manager>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';
  import { RootState } from '@/models/store';
  import { LIST_DEPARTMENTS, CREATE_DEPARTMENT, DELETE_DEPARTMENT } from '@/store/action-types';
  import DynamicOptionsManager from '@/components/DynamicOptionsManager.vue';

  @Component({
    components: { DynamicOptionsManager },
    computed: mapState<RootState>({
      departments: (state: RootState) => state.DepartmentModule.departments
    }),
    methods: mapActions({
      listDepartments: LIST_DEPARTMENTS,
      createDepartment: CREATE_DEPARTMENT,
      deleteDepartment: DELETE_DEPARTMENT,
    }),
  })
  export default class DepartmentManager extends Vue {}
</script>