<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('Home')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('Dashboard')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!user" link to="/login">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user" @click="logout">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar
        app
        clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$t('Quiz Learn')}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="icon">
        <v-img
            src="@/assets/hero.png">
        </v-img>
      </div>


      <div v-if="user && user.email" >
        <v-chip>
          {{ user.email }}
        </v-chip>
      </div>

    </v-app-bar>
  </div>
</template>



<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {auth} from "@/firebase";
import {State} from "@/models/State";

@Component({
})
export default class Navbar extends Vue {
  public drawer = null

  get user() {
    return this.$store.state.user
  }

  created() {
    this.$vuetify.theme.dark = true
  }

  async logout(){
    await auth.signOut()
    this.$router.push({ name: 'Login'})
  }
  async levelClick(){
    this.$router.push({ name: 'Home'})
  }

}
</script>


<style scoped>
 .userChip {
   padding-right:120px
 }
 .icon{
   margin-right: -10px;
 }
 .level{
   margin-right: 10px;
 }
</style>
