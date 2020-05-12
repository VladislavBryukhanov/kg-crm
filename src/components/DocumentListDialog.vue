<template>
  <v-dialog
    v-model="dialog"
    max-width="380"
  >
    <v-card>
      <v-card-title class="headline">Links to corporate documents</v-card-title>

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
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';
  import { LIST_DOCUMENT_LINKS } from '../store/action-types';
  import { RootState } from '../models/store';
  import { DocumentLink } from '../models/document-link';

  @Component({ 
    methods: mapActions({ 
      listDocumentLinks: LIST_DOCUMENT_LINKS
    }),
    computed: mapState<RootState>({
      documentLinks: (state: RootState) => state.DocumentLinkModule.documentLinks
    }),
  })
  export default class DocumentListDialog extends Vue {
    listDocumentLinks!: () => Promise<void>;
    documentLinks!: DocumentLink[];

    @Prop(Boolean)
    isOpened!: boolean;

    readonly skeletonItems = 4;
    isLoading = false;
    dialog = this.isOpened;

    @Watch('isOpened', { immediate: true })
    async onOpenDialog(isOpened: boolean) {
      this.dialog = this.isOpened;

      if (!isOpened) return;

      this.isLoading = !this.documentLinks.length;

      if (this.isLoading) {
        await this.listDocumentLinks();
        this.isLoading = false;
      }
    }

    @Watch('dialog')
    async onCloseDialog(dialog: boolean) {
      !dialog && this.$emit('update:isOpened', dialog);
    }
  }
</script>