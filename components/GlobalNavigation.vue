<template>
  <v-navigation-drawer
    v-model="isActive"
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
</template>

<script>
export default {
  name: 'global-navigation',
  computed: {
    isActive: {
      get () {
        return this.$store.state.isActiveLeftDrawer
      },
      set (newValue) {
        if (newValue !== this.isActive) {
          this.$store.commit('setLeftDrawer', newValue)
        }
      }
    }
  }
}
</script>
