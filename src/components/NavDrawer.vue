<template>
  <v-container>
    <v-navigation-drawer
      mini-variant-width="80"
      width="260"
      app permanent clipped
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-list-item class="px-2" link @click="goToEditProfile">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="subtitle-1">John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

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
    </v-navigation-drawer>

    <v-content>
      <v-container fluid app fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class NavDrawer extends Vue {
    mini = true;
    drawer = true;
    items = [
      { 
        title: 'User list',
        icon: 'supervised_user_circle',
        action: () => this.navigateTo('/persons'),
      },
      { 
        title: 'Vacation',
        icon: 'today',
        action: () => this.navigateTo('/'),
      },
      { 
        title: 'Sign out',
        icon: 'power_settings_new',
        action: this.signOut,
      }
    ];

    goToEditProfile() {
      console.log(this.mini);
      if (this.mini) return;
      this.navigateTo('/edit-person');
    }

    navigateTo(path: string) {
      this.$router.push(path)
    }

    signOut() {
      console.log('sign Out');
      this.$router.push({ name: 'SignIn' });
    }
  }
</script>