<template>
  <v-layout class="flex-1-1 h-100">
    <v-app-bar color="grey-darken-4" class="px-4">
      <v-layout style="column-gap: 12px" class="align-center">
        <v-btn
          icon="mdi-exit-to-app"
          replace
          href="/"
          density="comfortable"
        ></v-btn>
        <v-btn
          icon="mdi-home"
          replace
          density="comfortable"
          to="/monitoring"
        ></v-btn>

        <ToolbarDatePicker></ToolbarDatePicker>

        <v-spacer></v-spacer>

        <ToolbarFilters></ToolbarFilters>
      </v-layout>
    </v-app-bar>

    <v-main
      class="bg-grey-lighten-5"
      style="
        background: url('https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg');
      "
    >
      <kinesis-container class="h-100">
        <kinesis-element :strength="2" type="depth" transformOrigin="50% 50%">
          <router-view v-slot="{ Component, route }">
            <!-- <transition appear mode="out-in"> -->
            <component :is="Component" :key="route.path" />
            <!-- </transition> -->
          </router-view>
        </kinesis-element>
      </kinesis-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
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
