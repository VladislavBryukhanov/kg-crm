<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="360"
    >
      <v-card>
        <v-card-title class="headline">Links to corporate documents:</v-card-title>

        <v-card-text>
          <div>
            <v-btn text small color="primary">Link 1</v-btn>
          </div>

          <div>
            <v-btn text small color="primary">Link 2</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

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
        <v-btn text large color="secondary" @click="dialog = true">View docs</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { SIGN_IN } from '@/store/action-types';

@Component({ 
  methods: mapActions({ signIn: SIGN_IN })
})
export default class SignIn extends Vue {
  dialog = false;

  async onSignIn() {
    await this.signIn();
    this.$router.push({ name: 'Persons' })
  }
}
</script>