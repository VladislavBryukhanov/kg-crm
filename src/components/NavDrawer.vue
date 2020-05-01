<template>
  <v-container>
    <v-navigation-drawer
      mini-variant-width="80"
      width="260"
      app permanent clipped
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-list-item 
        class="px-2"
        link
        @click="goToEditProfile"
      >
        <v-list-item-avatar>
          <v-img :src="profile.avatarUrl | personAvatarUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="subtitle-1">
          {{profile.fullName}}
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item-group :value="activeRoute">
        <v-list-item
          link
          v-for="item in items"
          :key="item.title"
          @click.stop="item.action"
        >
          <v-list-item-icon>
            <v-icon size="30">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="body-2">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid app fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { SIGN_OUT } from '@/store/action-types';
  import { mapActions, mapState } from 'vuex';
  import * as workerImg from '@/assets/worker.png';
  import { Person } from '@/models/person';
  import { RootState } from '@/models/store';
  import { Route } from 'vue-router';

  @Component({ 
    methods: mapActions({
      signOutAction: SIGN_OUT
    }),
    computed: mapState<RootState>({
      profile: (state: RootState) => state.AuthModule.me
    })
  })
  export default class NavDrawer extends Vue {
    signOutAction!: () => Promise<void>;
    profile!: Person;

    mini = true;
    drawer = true;
    items = [
      { 
        title: 'Person list',
        icon: 'supervised_user_circle',
        pathName: 'Persons',
        action: () => this.navigateTo('/persons'),
      },
      {
        title: 'Create person',
        icon: 'person_add',
        pathName: 'CreatePerson',
        action: () => this.navigateTo('/new-person'),
      },
      {
        title: 'Manage positions',
        icon: 'business_center',
        pathName: 'ManagePosition',
        action: () => this.navigateTo('/manage-position')
      },
      { 
        title: 'Vacation',
        icon: 'today',
        pathName: '',
        action: () => this.navigateTo('/'),
      },
      { 
        title: 'Sign out',
        icon: 'power_settings_new',
        action: this.signOut,
      }
    ];

    activeRoute!: number;

    created() {
      this.activeRoute = this.items.findIndex(({ pathName }) => pathName === this.$router.currentRoute.name)
    }

    @Watch('$route')
    private onRouteChange(to: Route, from: Route) {
      this.activeRoute = this.items.findIndex(({ pathName }) => pathName === to.name);
    }

    goToEditProfile() {
      if (!this.mini) {
        this.$router.push({ name: 'EditPerson', params: { personId: this.profile.id! } });
      }
    }

    navigateTo(path: string) {
      this.$router.push(path)
    }

    async signOut() {
      await this.signOutAction();
      this.navigateTo('/auth');
    }
  }
</script>