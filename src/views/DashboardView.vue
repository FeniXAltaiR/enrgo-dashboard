<template>
  <v-container class="flex-1-1 flex-wrap" style="max-width: 1280px">
    <v-row>
      <v-col cols="12" md="12">
        <v-card
          elevation="12"
          color="indigo-darken-3"
          title="Итоговые значения"
          class="d-flex flex-column w-100"
        >
          <v-layout class="align-end justify-center flex-1-1">
            <BarChart :data="data" :options="options" />
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BarChart from '@/components/BarChart/BarChart.vue'
import { defineComponent } from 'vue'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

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
          label: 'Товары',
          data: [40, 20],
          backgroundColor: colors.red.darken2,
          maxBarThickness: 64,
        },
        {
          label: 'Работы',
          data: [32, 16],
          backgroundColor: colors.yellow.darken2,
          maxBarThickness: 64,
        },
        {
          label: 'Люди',
          data: [24, 12],
          backgroundColor: colors.green.darken2,
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
          stacked: true,
        },
        x: {
          grid: {
            offset: false,
            display: false,
          },
          ticks: {
            color: 'white',
          },
          stacked: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white',
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
