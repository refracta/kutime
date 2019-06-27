<template>
  <section class="my-container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="my-logo" />
    <h1 class="my-title">
      User
    </h1>
    <h2 class="my-info">
      {{ user.name }}
    </h2>
    <nuxt-link class="my-button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/users/' + params.id)
      .then((res) => {
        return { user: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  head () {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
.my-title
{
  margin-top: 30px;
}
.my-info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.my-button
{
  margin-top: 30px;
}
</style>
