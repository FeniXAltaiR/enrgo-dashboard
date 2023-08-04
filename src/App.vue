<template>
  <v-layout class="flex-1-1 h-100">
    <v-app-bar density="compact" color="purple-darken-3"></v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
