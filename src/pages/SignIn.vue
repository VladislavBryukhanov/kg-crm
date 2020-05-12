<template>
  <div>
    <v-card
      class="mx-auto pa-2"
      max-width="420"
    >
      <v-img 
        class="white--text align-end"
        height="200px"
        :src="require('@/assets/kg.jpeg')"
      ></v-img>

      <v-card-text>
        <p class="display-1 text--secondary">
          Sign in
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn large color="primary" @click="onSignIn">Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { SIGN_IN, LIST_DOCUMENT_LINKS } from '@/store/action-types';
  import DocumentListDialog from '@/components/DocumentListDialog.vue';

  @Component({ 
    methods: mapActions({ 
      signIn: SIGN_IN,
    }),
  })
  export default class SignIn extends Vue {
    signIn!: () => Promise<void>;

    async onSignIn() {
      await this.signIn();
      this.$router.push({ name: 'Persons' })
    }
  }
</script>