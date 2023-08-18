<template>
  <v-card
    elevation="6"
    color="rgba(255, 255, 255, .8)"
    class="d-flex flex-column w-100 flex-grow-1"
    :loading="loading"
    hover
  >
    <v-card-title class="text-subtitle-1 d-flex">
      <span>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-btn
        density="compact"
        icon="mdi-unfold-more-horizontal"
        variant="text"
      ></v-btn>
    </v-card-title>

    <v-card-text
      class="d-flex align-center justify-center text-h5 font-weight-bold flex-column"
      :class="`text-${color}`"
    >
      {{ value }}
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

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
      default: 'primary',
    },
    loading: {
      type: [String, Boolean],
      default: false,
    },
  },

  setup(props) {
    return {
      ...toRefs(props),
    }
  },
})
</script>
