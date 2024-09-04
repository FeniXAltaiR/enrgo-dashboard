<template>
  <Bar :data="(data as any)" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Filler,
  LinearScale,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { defineComponent, PropType } from 'vue'
import { ChartData } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
)
ChartJS.register(ChartDataLabels)

export default defineComponent({
  name: 'BarChart',

  components: {
    Bar,
  },

  props: {
    data: {
      type: Object as PropType<
        ChartData<'bar' | 'line', (number | [number, number] | null)[], unknown>
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
