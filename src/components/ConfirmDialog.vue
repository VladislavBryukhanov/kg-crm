<template>
  <v-dialog v-model="dialogOpened" light width="350">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" color="red darken-2">
          Cancel
        </v-btn>
        <v-btn text @click="confirm" color="primary">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  
  @Component
  export default class ConfirmDialog extends Vue {
    dialogOpened = false;
    title = '';
    message = '';
    resolve!: (result: boolean) => void;

    open(title: string, message: string) {
      this.dialogOpened = !this.dialogOpened;
      this.title = title;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
      })
    }

    confirm() {
      this.resolve(true);
      this.dialogOpened = !this.dialogOpened;
    }

    cancel() {
      this.resolve(false);
      this.dialogOpened = !this.dialogOpened;
    }
  }
</script>