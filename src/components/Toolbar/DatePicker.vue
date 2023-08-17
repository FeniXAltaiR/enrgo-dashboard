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
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ToolbarDatePicker',

  setup() {
    const store = useStore()

    return {
      get date() {
        return store.state.toolbarDate
      },
      set date(value) {
        store.commit('setToolbarDate', value)
      },
    }
  },
})
</script>
