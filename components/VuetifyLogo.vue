<template>
  <img
    class="VuetifyLogo"
    alt="Vuetify Logo"
    src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
  >
</template>

<style>
.VuetifyLogo {
  height: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
