<template>
  <v-app>
    <GlobalNavigation />
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="toggleNavigation" />
      <v-toolbar-title>인하대 시간표</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2017-2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import GlobalNavigation from '~/components/GlobalNavigation.vue'

export default {
  components: {
    GlobalNavigation
  },
  mounted () {
    this.$store.commit('setLeftDrawer', this.$vuetify.breakpoint.lgAndUp)
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('toggleLeftDrawer')
    }
  }
}
</script>
