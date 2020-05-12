<template>
  <v-container>
    <v-layout>
      <v-flex sm8 offset-sm2>
        <v-card elevation="6">
          <v-progress-linear
            absolute
            top
            :active="isItemProcessing"
            :indeterminate="isItemProcessing"
            color="primary"
          ></v-progress-linear>

          <v-list>
            <template v-if="!documentLinks.length">
              <v-container v-if="isLoading">
                <v-skeleton-loader
                  v-for="n in skeletonItems"
                  :key="n"
                  height="74"
                  type="list-item-two-line"
                ></v-skeleton-loader>
              </v-container>

              <v-container v-else>
                <h3 class="headline font-weight-light primary--text">
                  No document links found
                </h3>
              </v-container>
            </template>

            <v-list-item two-line
              v-for="docLink in documentLinks"
              :key="docLink.id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="docLink.label"></v-list-item-title>
                <v-list-item-subtitle v-text="docLink.url"></v-list-item-subtitle>
              </v-list-item-content>
      
              <v-list-item-action>
                <v-btn icon @click="onRemoveOption(docLink)">
                  <v-icon color="red darken-2">link_off</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn
      fab
      fixed
      dark
      bottom
      right
      color="primary"
      @click="docLinkDialog = true"
    >
      <v-icon>note_add</v-icon>
    </v-btn>

    <v-dialog v-model="docLinkDialog" max-width="420">
      <v-card>
        <v-card-title class="headline secondary--text">
          Add new document link
        </v-card-title>

        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field 
              label="Document label"
              prepend-icon="edit"
              :rules="validationRules.label"
              v-model="newDocLink.label"
              clearable
            ></v-text-field>
            <v-text-field 
              label="Link to document"
              prepend-icon="link"
              :rules="validationRules.url"
              v-model="newDocLink.url"
              clearable
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="!isValid"
            @click="onSaveDocLink"
          >
            Save
            <v-icon right>save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { mapActions, mapState } from 'vuex';
  import { RootState } from '../models/store';
  import { LIST_DOCUMENT_LINKS, CREATE_DOCUMENT_LINK, DELETE_DOCUMENT_LINK } from '../store/action-types';
  import { DocumentLink } from '../models/document-link';
  import { CreateEntity } from '../models/common';

  @Component({
    computed: mapState<RootState>({
      documentLinks: (state: RootState) => state.DocumentLinkModule.documentLinks
    }),
    methods: mapActions({
      listDocumentLinks: LIST_DOCUMENT_LINKS,
      createDocumentLink: CREATE_DOCUMENT_LINK,
      deleteDocumentLink: DELETE_DOCUMENT_LINK,
    }),
  })
  export default class DocumentLinksManager extends Vue {
    listDocumentLinks!: () => Promise<void>;
    createDocumentLink!: (docLink: CreateEntity<DocumentLink>) => Promise<void>;
    deleteDocumentLink!: (docLinkId: string) => Promise<void>;
    documentLinks!: DocumentLink[];

    readonly skeletonItems = 4;

    isLoading = false;
    isItemProcessing = false;

    docLinkDialog = false;
    isValid = false;

    newDocLink: CreateEntity<DocumentLink> = {
      label: '',
      url: '',
    };

    validationRules = {
      label: [
        (v?: string) => !!v || 'Label is required',
        (v?: string) => v && v.length >= 3 && v.length <= 64 || 'Label should be more than 3 characters and less than 64'
      ],
      url: [
        (v?: string) => {
          if (!v) {
            return 'Url is required';
          }
          const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
          return regexp.test(v.toLowerCase()) || 'Invalid Url';
        }
      ]
    };

    async created() {
      this.isLoading = !this.documentLinks.length;

      if (this.isLoading) {
        await this.listDocumentLinks();
        this.isLoading = false;
      }
    }

    async onSaveDocLink() {
      this.isItemProcessing = true;
      this.docLinkDialog = false;

      await this.createDocumentLink(this.newDocLink);

      this.isItemProcessing = false;
    }
    
    async onRemoveOption(docLink: DocumentLink) {
       const confirm = await this.$root.$data.$confirmDialog(
        `Confirm document link removing`,
        `Are you sure you want to remove "${docLink.label}" from the list of document links`
      );

      if (confirm) {
        this.isItemProcessing = true;
        await this.deleteDocumentLink(docLink.id!);
        this.isItemProcessing = false;
      }
    }
  }
</script>
