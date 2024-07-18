<template>
  <Bar :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { defineComponent, PropType } from 'vue'
import { ChartData } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

export default defineComponent({
  name: 'BarChart',

  components: {
    Bar,
  },

  props: {
    data: {
      type: Object as PropType<
        ChartData<'bar', (number | [number, number] | null)[], unknown>
      >,
      default: () => ({}),
    },
    options: {
      type: Object as PropType<ChartOptions<'bar'>>,
      default: () => ({}),
    },
  },

  setup(props) {
    return {
      ...props,
    }
  },
})
</script>
