<template>
  <v-card
    elevation="6"
    class="d-flex flex-column w-100 flex-grow-1"
    :loading="loading"
  >
    <v-card-title class="d-flex font-weight-bold text-h6">
      <span>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="showTableIcon"
        density="compact"
        icon="mdi-table"
        variant="text"
        class="ml-1"
        :to="`/monitoring/table`"
      ></v-btn>
    </v-card-title>

    <v-card-text
      v-for="view in items"
      :key="view.title"
      :class="[
        'd-flex',
        'align-center',
        'text-subtitle-1',
        'py-1',
        'cardWrapper__cardText',
        { 'bg-grey-lighten-2': graphType === view.value },
      ]"
      @click="() => $emit('updateGraphType', view.value)"
    >
      <span>{{ view.title }}</span>
      <v-spacer></v-spacer>
      <vue-autocounter
        :startAmount="
          prevReportData?.[view.value] ? prevReportData?.[view.value] : 0
        "
        :endAmount="reportData?.[view.value] ? reportData?.[view.value] : 0"
        :duration="1"
        :suffix="` ${view.suffix}`"
        :autoinit="true"
        separator="."
        class="font-weight-bold"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { ReportDataModel } from '@/utils/reports'
import { DashboardViewInfo } from '@/views/DashboardView/types'

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
    graphType: {
      type: String as PropType<keyof ReportDataModel>,
      default: 'primary',
    },
    loading: {
      type: [String, Boolean],
      default: false,
    },
    items: {
      type: Array as PropType<DashboardViewInfo[]>,
      default: () => [],
    },
    prevReportData: {
      type: Object as PropType<ReportDataModel>,
      default: () => ({}),
    },
    reportData: {
      type: Object as PropType<ReportDataModel>,
      default: () => ({}),
    },
    showTableIcon: {
      type: Boolean,
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

<style lang="scss">
.cardWrapper__cardText {
  cursor: pointer;

  &:hover {
    background-color: #e1e1e1;
  }
}
</style>
