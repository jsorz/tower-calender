<template>
  <div id="app">
    <p>Nav List</p>
    <ul>
      <li><router-link to="/demo">Go to Demo</router-link></li>
      <li><router-link to="/calendar">Go to Calendar</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
