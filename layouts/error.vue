<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          {{ error.statusCode === 404 ? pageNotFound : otherError }}
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <nuxt-link to="/">
            Homepage
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'error-page',
  props: ['error'],
  head () {
    const title = (this.error.statusCode === 404 ? this.pageNotFound : this.otherError)
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>
