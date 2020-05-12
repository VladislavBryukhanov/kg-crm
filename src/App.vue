<template>
  <div id="app">
    <v-app>
      <router-view/>
      <SnackBar/>
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
      <DocumentListDialog :isOpened.sync="dialog"></DocumentListDialog>
      <v-btn
        color="secondary"
        dark
        fixed
        bottom
        left
        fab
        @click="dialog = true"
      >
        <v-icon>assignment</v-icon>
      </v-btn>

    </v-app>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import ConfirmDialog from '@/components/ConfirmDialog.vue';
  import SnackBar from '@/components/SnackBar.vue';
  import DocumentListDialog from '@/components/DocumentListDialog.vue';
  
  @Component({ components: { DocumentListDialog, ConfirmDialog, SnackBar } })
  export default class App extends Vue {
    dialog = false;

    mounted() {
      this.$root.$data.$confirmDialog = (this.$refs.confirmDialog as ConfirmDialog).open;
    }
  }
</script>