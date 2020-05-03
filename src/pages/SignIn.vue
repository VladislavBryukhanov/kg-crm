<template>
  <div>
    <v-card
      class="mx-auto pa-2"
      max-width="420"
    >
      <v-img 
        class="white--text align-end"
        height="200px"
        :src="require('@/assets/kg.jpeg')">
        
      </v-img>

      <v-card-text>
        <p class="display-1 text--secondary">
          Sign in
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn large color="primary" @click="onSignIn">Sign in</v-btn>
        <v-btn text large color="secondary">View docs</v-btn>
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
  async onSignIn() {
    await this.signIn();
    this.$router.push({ name: 'Persons' })
  }
}
</script>