<template>
  <vue-date-picker
    v-model="date"
    style="max-width: 320px"
    :teleport="true"
    model-type="yyyy-MM-dd"
    format="yyyy-MM-dd"
    :enable-time-picker="false"
    mode-height="50"
    locale="ru"
    auto-apply
    range
  ></vue-date-picker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ToolbarDatePicker',

  setup() {
    const date = ref<[string?, string?]>([])

    return {
      date,
    }
  },
})
</script>
