<template>
  <v-container class="flex-1-1 flex-wrap" style="max-width: 1280px">
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card
          elevation="12"
          color="indigo-darken-3"
          title="Итоговые значения"
          class="d-flex flex-column w-100 h-100"
        >
          <v-layout class="align-end justify-center flex-1-1">
            <BarChart :data="data" :options="options" height="320" />
          </v-layout>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-layout class="flex-column h-100" style="row-gap: 24px">
          <dashboard-view-card-wrapper
            title="Состояние договора"
            value="На исполнении"
            color="warning"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Дебиторская задолженность"
            value="1000 руб"
            color="error"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Плановая прибыль"
            value="7500 руб"
          ></dashboard-view-card-wrapper>
        </v-layout>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-layout class="flex-column h-100" style="row-gap: 24px">
          <dashboard-view-card-wrapper
            title="Цена договора"
            value="20000 руб"
            color="white"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Расходы"
            value="10000 руб"
            color="error"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Прибыль на текущую дату"
            value="2500 руб"
          ></dashboard-view-card-wrapper>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BarChart from '@/components/BarChart/BarChart.vue'
// import LineChart from '@/components/LineChart/LineChart.vue'
import DashboardViewCardWrapper from '@/components/DashboardView/CardWrapper.vue'
import { defineComponent } from 'vue'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

export default defineComponent({
  name: 'DashboardView',

  components: {
    BarChart,
    // LineChart,
    DashboardViewCardWrapper,
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
