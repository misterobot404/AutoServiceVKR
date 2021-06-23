<template>
  <v-app>
    <v-main>
      <router-view class="app"/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'Circe Regular';
  src: url('assets/Circe-Regular.ttf');
}

.app {
  font-family: 'Circe Regular', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
