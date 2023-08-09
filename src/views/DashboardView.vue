<template>
  <v-layout class="pa-6 flex-1-1 flex-wrap">
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="12" md="4">
        <v-card
          elevation="12"
          color="indigo-darken-3"
          title="Итоговые значения"
          class="h-100 d-flex flex-column"
        >
          <v-layout class="align-end justify-center flex-1-1">
            <BarChart :data="data" :options="options" />
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import BarChart from '@/components/BarChart/BarChart.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardView',

  components: {
    BarChart,
  },

  data: () => ({
    data: {
      labels: ['Доходы', 'Расходы'],
      datasets: [
        {
          label: 'Итоговые значения',
          data: [40, 20],
          backgroundColor: ['#1B5E20', '#B71C1C'],
          maxBarThickness: 64,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          ticks: {
            color: 'white',
          },
        },
        x: {
          grid: {
            offset: false,
            display: false,
          },
          ticks: {
            color: 'white',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'rgb(255, 99, 132)',
            font: {
              size: 14,
            },
          },
        },
      },
      layout: {
        padding: 12,
      },
    },
  }),
})
</script>

<style></style>
