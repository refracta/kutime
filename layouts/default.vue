<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app>
      <v-btn icon>
        <v-icon>fab fa-vuejs</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fas fa-times</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>fab fa-node-js</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>
