<template>
  <div id="app">
    <v-app>
      <router-view/>
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-app>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import ConfirmDialog from '@/components/ConfirmDialog.vue';
  
  @Component({ components: { ConfirmDialog } })
  export default class App extends Vue {
    mounted() {
      this.$root.$data.$confirmDialog = (this.$refs.confirmDialog as ConfirmDialog).open;
    }
  }
</script>