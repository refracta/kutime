<template>
  <section class="my-container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="my-logo" />
    <h1 class="my-title">
      {{ error.statusCode }}
    </h1>
    <h2 class="my-info">
      {{ error.message }}
    </h2>
    <nuxt-link class="my-button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.my-title
{
  margin-top: 15px;
  font-size: 5em;
}
.my-info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.my-button
{
  margin-top: 50px;
}
</style>
