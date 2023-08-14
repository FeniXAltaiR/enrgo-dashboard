<template>
  <v-layout class="flex-1-1 h-100">
    <v-app-bar color="indigo-darken-3" class="px-4">
      <v-layout style="column-gap: 12px" class="align-center">
        <v-btn
          icon="mdi-exit-to-app"
          replace
          href="/"
          density="comfortable"
        ></v-btn>

        <vue-date-picker
          v-model="date"
          style="max-width: 320px"
          :teleport="true"
          model-type="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :enable-time-picker="false"
          mode-height="50"
          dark
          locale="ru"
          auto-apply
          range
        ></vue-date-picker>

        <v-spacer></v-spacer>

        <v-autocomplete
          label="Группа контрагентов"
          :items="dicts.groups"
          style="max-width: 320px"
          density="compact"
          variant="solo"
          hide-details
          item-title="name"
          item-value="id"
          single-line
          clearable
        ></v-autocomplete>

        <v-autocomplete
          label="Контрагент"
          :items="dicts.counterparties"
          style="max-width: 320px"
          density="compact"
          variant="solo"
          hide-details
          item-title="name"
          item-value="id"
          single-line
          clearable
        ></v-autocomplete>

        <v-autocomplete
          label="Договор"
          :items="dicts.contracts"
          style="max-width: 320px"
          density="compact"
          variant="solo"
          hide-details
          item-title="short_name"
          item-value="id"
          single-line
          clearable
        ></v-autocomplete>
      </v-layout>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',

  setup() {
    const date = ref<[string?, string?]>([])

    const store = useStore()

    onMounted(() => {
      store.dispatch('postDict', 'groups')
      store.dispatch('postDict', 'counterparties')
      store.dispatch('postDict', 'contracts')
    })

    return { date, dicts: computed(() => store.state.dicts) }
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
