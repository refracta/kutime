<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app></v-toolbar>
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

<style>
.my-container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.my-button, .my-button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.my-button:hover, .my-button:focus
{
  color: #fff;
  background-color: #000;
}

.my-title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
