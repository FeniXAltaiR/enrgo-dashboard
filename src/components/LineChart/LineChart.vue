<template>
  <Line :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  Point,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { defineComponent, PropType } from 'vue'
import { ChartData } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  name: 'LineChart',

  components: {
    Line,
  },

  props: {
    data: {
      type: Object as PropType<
        ChartData<'line', (number | Point | null)[], unknown>
      >,
      default: () => ({}),
    },
    options: {
      type: Object as PropType<ChartOptions<'line'>>,
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
