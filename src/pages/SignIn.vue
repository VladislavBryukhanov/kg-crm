<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="380"
    >
      <v-card>
        <v-card-title class="headline">Links to corporate documents:</v-card-title>

        <template v-if="!documentLinks.length">
          <v-container v-if="isLoading">
            <v-skeleton-loader
              v-for="n in skeletonItems"
              :key="n"
              height="54"
              type="list-item"
            ></v-skeleton-loader>
          </v-container>

          <v-card-text v-else>
            <h3 class="headline font-weight-light primary--text">
              No document links found
            </h3>
          </v-card-text>
        </template>

        <v-card-text v-else>
          <div v-for="docLink in documentLinks" :key="docLink.id">
            <v-btn 
              text 
              color="primary"
              :href="docLink.url"
              target="_blank"
            >{{docLink.label}}</v-btn>
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
        <v-btn text large color="secondary" @click="onViewDocs">View docs</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { SIGN_IN, LIST_DOCUMENT_LINKS } from '@/store/action-types';
  import { RootState } from '../models/store';
import { DocumentLink } from '../models/document-link';

  @Component({ 
    methods: mapActions({ 
      signIn: SIGN_IN,
      listDocumentLinks: LIST_DOCUMENT_LINKS
    }),
    computed: mapState<RootState>({
      documentLinks: (state: RootState) => state.DocumentLinkModule.documentLinks
    }),
  })
  export default class SignIn extends Vue {
    signIn!: () => Promise<void>;
    listDocumentLinks!: () => Promise<void>;
    documentLinks!: DocumentLink[];

    readonly skeletonItems = 4;
    isLoading = false;
    dialog = false;

    async onViewDocs() {
      this.dialog = true;
      this.isLoading = !this.documentLinks.length;

      if (this.isLoading) {
        await this.listDocumentLinks();
        this.isLoading = false;
      }
    }

    async onSignIn() {
      await this.signIn();
      this.$router.push({ name: 'Persons' })
    }
  }
</script>