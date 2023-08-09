<template>
  <v-layout class="flex-1-1 h-100">
    <v-app-bar color="indigo-darken-3" class="px-4">
      <v-layout style="column-gap: 12px">
        <v-btn icon="$vuetify" replace to="/" density="comfortable"></v-btn>

        <vue-date-picker
          v-model="date"
          style="max-width: 320px"
          :teleport="true"
          model-type="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :enable-time-picker="false"
          dark
          locale="ru"
          auto-apply
          range
        ></vue-date-picker>
      </v-layout>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    const date = ref<[string?, string?]>([])

    return { date }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
