# kutime

> 한기대 시간표 (web app)

## Requirements

* Node 10+

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production
$ yarn build

# launch server in production mode
$ yarn start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://nuxtjs.org).

## Production Server Management

1. Launch server with systemd

``` bash
# First, you need to fill in the empty WorkingDirectory value in the service file.

# Then do the following:
$ sudo cp intime-nuxt.service /etc/systemd/system
$ sudo systemctl enable intime-nuxt.service
$ sudo systemctl start intime-nuxt.service
```

2. Deploy

``` bash
$ git fetch
$ git checkout (RELEASE_VERSION)
$ yarn build
$ sudo systemctl restart intime-nuxt.service
```
