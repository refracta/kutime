<template>
  <v-layout
    align-center
    class="is-error-page"
    :class="{ 'is-active': isActiveLayout }"
  >
    <v-flex>
      <v-card
        flat
        color="transparent"
        :class="{ 'is-active': isActiveCard }"
      >
        <v-card-title class="pa-0">
          {{ error.statusCode }}
        </v-card-title>
        <v-card-text
          v-if="error.statusCode === 404"
          class="pa-0"
        >
          <div class="error-description">
            Oops, the page you're <br>
            looking for does not exist.
          </div>
          <v-divider></v-divider>
          <div class="error-guidance">
            <p>
              You may want to head back to the homepage.<br>
              If you think something is broken, report a problem.
            </p>
          </div>
        </v-card-text>
        <v-card-text
          v-else
          class="pa-0"
        >
          <div class="error-description">
            Looks like we're having <br>
            some server issues.
          </div>
          <v-divider></v-divider>
          <div class="error-guidance">
            <p>
              Go back to the previous page and try again.<br>
              If you think something is broken, report a problem.
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn
            v-if="error.statusCode === 404"
            round
            outline
            nuxt
            color="#005bac"
            href="/"
          >Go to homepage</v-btn>
          <v-btn
            round
            outline
            color="#005bac"
            href="https://www.facebook.com/InhaTimetable"
            target="_blank"
            rel="noopener"
          >Report a problem</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'error-page',
  props: ['error'],
  head () {
    const title = (this.error.statusCode === 404 ? '404 Not Found' : 'An error occurred')
    return {
      title,
      link: [
        { rel: 'stylesheet', media: 'screen', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600' }
      ]
    }
  },
  data () {
    return {
      isActiveLayout: false,
      isActiveCard: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isActiveLayout = true
      setTimeout(() => {
        this.isActiveCard = true
      }, 500)
    })
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/style/variables.scss";

.layout.is-error-page {
  position: relative;
  padding: 0 5%;
  background-color: transparent;
  font-family: "Source Sans Pro", sans-serif;

  &.is-active {
    background-color: $emblem-top-color;
  }

  .v-card {
    position: relative;
    left: -30px;
    opacity: 0;
    max-width: 400px;
    transition: left .5s ease-out, opacity .5s ease-out;

    &.is-active {
      left: 0;
      opacity: 1;
    }
  }

  .v-card__title {
    margin-bottom: 5px;
    color: $emblem-bottom-color;
    font-size: 48px;
    line-height: 60px;
    letter-spacing: -1px;
    transition: color .2s linear;
  }

  .error-description {
    color: #fff;
    font-size: 36px;
    line-height: 46px;
    transition: color .2s linear;
  }

  .v-divider {
    width: 250px;
    margin: 35px 0;
    background-color: $emblem-bottom-color;
  }

  .error-guidance {
    color: #fff;
    font-size: 18px;
    line-height: 27px;
    transition: color .2s linear;

    p {
      margin: 0;
    }
  }

  .v-card__actions {
    margin-top: 45px;

    .v-btn {
      height: 45px;
      margin: 0;
      border-width: 2px;
      padding: 0 30px;
      font-size: 14px;
      text-decoration: none;
      text-transform: uppercase;
      transition: color .2s linear, border-color .2s linear;

      &:hover {
        background-color: rgba(255, 255, 255, .05);
      }

      &:first-child {
        margin-right: 25px;
      }
    }
  }
}

@media screen and (max-width: 485px) {
  .layout.is-error-page {
    .error-description {
      font-size: 27px;
      line-height: 38px;
    }

    .v-divider {
      width: 185px;
      margin: 25px 0;
    }

    .error-guidance {
      font-size: 16px;
      line-height: 24px;
    }

    .v-card__actions {
      margin-top: 35px;

      .v-btn {
        width: 45%;
        height: 43px;
        padding: 0;
        font-size: 13px;
        text-align: center;

        &:first-child {
          margin-right: 10%;
        }
      }
    }
  }
}
</style>
