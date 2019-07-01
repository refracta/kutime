module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate (titleChunk) {
      return (titleChunk ? `${titleChunk} - 인하대 시간표` : '인하대 시간표')
    },
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    'vuetify/dist/vuetify.min.css',
    '~/assets/style/main.scss',
    '~/assets/css/main.css'
  ],
  build: {
    vendor: [
      '@fortawesome/fontawesome-free',
      'axios',
      'vuetify'
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~/plugins/vuetify'
  ],
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
