<template>
  <v-card
    elevation="12"
    color="indigo-darken-3"
    class="d-flex flex-column w-100 flex-grow-1"
  >
    <v-card-title class="text-subtitle-1">
      {{ title }}
    </v-card-title>

    <v-card-text
      class="d-flex align-center justify-center text-h5 font-weight-bold"
      :class="`text-${color}`"
    >
      {{ value }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardViewCardWrapper',

  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    color: {
      type: String,
      default: 'success',
    },
  },

  setup(props) {
    return {
      ...props,
    }
  },
})
</script>
