<template>
  <v-layout class="flex-1-1 h-100">
    <v-app-bar color="grey-darken-4" class="px-4">
      <v-layout style="column-gap: 12px" class="align-center">
        <v-btn
          icon="mdi-cog"
          replace
          href="/main"
          density="comfortable"
        ></v-btn>

        <ToolbarDatePicker></ToolbarDatePicker>

        <v-spacer></v-spacer>

        <ToolbarFilters></ToolbarFilters>
      </v-layout>
    </v-app-bar>

    <v-main class="bg-grey-darken-3">
      <kinesis-container class="h-100 overflow-hidden">
        <kinesis-element
          :strength="0"
          type="depth"
          transformOrigin="50% 50%"
          class="h-100"
        >
          <router-view v-slot="{ Component, route }">
            <!-- <transition appear mode="out-in"> -->
            <component
              :is="Component"
              :key="route.path"
              class="h-100 d-flex flex-column"
            />
            <!-- </transition> -->
          </router-view>
        </kinesis-element>
      </kinesis-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'
import ToolbarFilters from '@/components/Toolbar/Filters.vue'
import ToolbarDatePicker from '@/components/Toolbar/DatePicker.vue'

export default defineComponent({
  name: 'App',

  components: {
    ToolbarFilters,
    ToolbarDatePicker,
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('postDict', 'groups')
      store.dispatch('postDict', 'counterparties')
      store.dispatch('postDict', 'contracts')
    })
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
