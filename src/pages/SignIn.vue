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
        <v-btn large color="primary" v-on:click="onSignIn">Sign in</v-btn>
        <v-btn text large color="secondary">View docs</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class SignIn extends Vue {
  mounted() {
    firebase.auth().onAuthStateChanged(auth => {
      console.log('AUTH', auth);
    });
  }

  onSignIn() {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(authProvider)
      .then(res => console.log(res));
  }
}
</script>