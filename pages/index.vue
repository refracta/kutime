<template>
  <section class="my-container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="my-logo" />
    <h1 class="my-title">
      USERS
    </h1>
    <ul class="my-users">
      <li v-for="(user, index) in users" :key="index" class="my-user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style lang="scss" scoped>
.my-title {
  margin: 30px 0;
}

.my-users {
  list-style: none;
  margin: 0;
  padding: 0;
}

.my-user {
  margin: 10px 0;
}
</style>
