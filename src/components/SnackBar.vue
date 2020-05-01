<template>
  <v-snackbar 
    v-model="snackbar.isDisplayed"
    :duration="snackbar.duration"
    multi-line
  >
    {{snackbar.message}}
    <v-btn text @click="hideSnackbar" color="red darken-2">
      Close
    </v-btn>
  </v-snackbar>    
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapState, mapMutations } from 'vuex';
  import { HIDE_SNACKBAR } from '@/store/action-types';
  import { RootState } from '../models/store';

  @Component({
    computed: mapState<RootState>({
      snackbar: (state: RootState) => state.UiUtilsModule.snackbar
    }),
    methods: mapMutations({
      hideSnackbar: HIDE_SNACKBAR
    }),
  })
  export default class SnackBar extends Vue {}
</script>