<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  export default defineComponent({
    name: 'App'
  })
</script>

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

#app {
  flex-grow: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #797979;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
