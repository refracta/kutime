<template>
  <v-app
    :dark="darkMode"
  >
    <v-navigation-drawer
      v-model="leftDrawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-tile
          to="/"
          exact
        >
          <v-list-tile-action>
            <v-icon>fas fa-calendar-week</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>내 시간표</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="leftDrawer = !leftDrawer" />
      <v-toolbar-title>인하대 시간표</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="darkMode = !darkMode"
      >
        <v-icon>fas fa-adjust</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>fas fa-bars</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>Right drawer</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  },
  data () {
    return {
      leftDrawer: false,
      rightDrawer: false,
      darkMode: false
    }
  },
  mounted () {
    this.leftDrawer = this.$vuetify.breakpoint.lgAndUp
  }
}
</script>
