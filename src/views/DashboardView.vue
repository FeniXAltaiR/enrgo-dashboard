<template>
  <v-container
    class="flex-1-1 flex-wrap grey-lighten-5"
    style="max-width: 1280px"
  >
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card
          elevation="12"
          :color="color"
          title="Итоговые значения"
          class="d-flex flex-column w-100 h-100"
        >
          <v-layout class="align-end justify-center flex-1-1">
            <BarChart
              :key="JSON.stringify(data) + JSON.stringify(options)"
              :data="data"
              :options="options"
              height="320"
            />
          </v-layout>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-layout
          class="flex-column h-100"
          style="row-gap: 24px; overflow: initial"
        >
          <dashboard-view-card-wrapper
            title="Состояние договора"
            color="warning"
            :loading="loading"
            to="/monitoring/is_current"
          >
            <vue-autocounter
              :startAmount="prevReportData?.is_current ?? 0"
              :endAmount="reportData?.is_current ?? 0"
              :duration="1"
              suffix=" На исполнении"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Дебиторская задолженность"
            color="error"
            :loading="loading"
            to="/monitoring/debt"
          >
            <vue-autocounter
              :startAmount="prevReportData?.debt ?? 0"
              :endAmount="reportData?.debt ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Плановая прибыль"
            color="success"
            :loading="loading"
            to="/monitoring/profit"
          >
            <vue-autocounter
              :startAmount="prevReportData?.profit ?? 0"
              :endAmount="reportData?.profit ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>
        </v-layout>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-layout
          class="flex-column h-100"
          style="row-gap: 24px; overflow: initial"
        >
          <dashboard-view-card-wrapper
            title="Цена договора"
            color="info"
            :loading="loading"
            to="/monitoring/c_price"
          >
            <vue-autocounter
              :startAmount="Number(prevReportData?.c_price ?? 0)"
              :endAmount="Number(reportData?.c_price ?? 0)"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Расходы"
            color="error"
            :loading="loading"
            to="/monitoring/e_sum"
          >
            <vue-autocounter
              :startAmount="prevReportData?.e_sum ?? 0"
              :endAmount="reportData?.e_sum ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Прибыль на текущую дату"
            color="success"
            :loading="loading"
            to="/monitoring/curent_profit"
          >
            <vue-autocounter
              :startAmount="prevReportData?.curent_profit ?? 0"
              :endAmount="reportData?.curent_profit ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
              separator="."
            />
          </dashboard-view-card-wrapper>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BarChart from '@/components/BarChart/BarChart.vue'
// import LineChart from '@/components/LineChart/LineChart.vue'
import DashboardViewCardWrapper from '@/components/DashboardView/CardWrapper.vue'
import { defineComponent, ref, computed, watch } from 'vue'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'
import { useReportData } from '@/utils/reports'
import { ChartData, ChartOptions } from 'chart.js'

export default defineComponent({
  name: 'DashboardView',

  components: {
    BarChart,
    // LineChart,
    DashboardViewCardWrapper,
  },

  setup() {
    const initialChartData: ChartData<
      'bar',
      (number | [number, number] | null)[],
      unknown
    > = {
      labels: [],
      datasets: [
        {
          label: 'Количество договоров',
          data: [],
          backgroundColor: colors.blue.darken2,
          maxBarThickness: 64,
        },
      ],
    }
    const options: ChartOptions<'bar'> = {
      responsive: true,
      animation: {
        onComplete: function ({ chart }) {
          const ctx = chart.ctx

          chart.config.data.datasets.forEach(function (dataset, i) {
            const meta = chart.getDatasetMeta(i)

            meta.data.forEach(function (bar, index) {
              const data = dataset.data[index]

              ctx.font = '16px verdana'
              ctx.fillStyle = 'white'
              ctx.fillText(String(data), bar.x - 28, bar.y + 16)
            })
          })
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          ticks: {
            // color: 'white',
            stepSize: 1,
          },
          stacked: true,
        },
        x: {
          grid: {
            offset: false,
            display: false,
          },
          ticks: {
            // color: 'white',
          },
          stacked: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            // color: 'white',
            font: {
              size: 14,
            },
          },
        },
      },
      layout: {
        padding: 12,
      },
    }
    const color = 'rgba(255, 255, 255, .8)'

    // Report Data
    const {
      data: reportData,
      prevData: prevReportData,
      loading: reportLoading,
      chartData,
    } = useReportData({ type_group: 'list' })

    const loading = ref<string | boolean>(reportLoading.value)

    watch(reportLoading, (value) => {
      if (value) {
        loading.value = reportLoading.value
      } else {
        loading.value = value
      }
    })

    return {
      data: computed(() => chartData.value ?? initialChartData),
      options,
      color,
      prevReportData: computed(() => prevReportData.value.models?.[0] ?? {}),
      reportData: computed(() => reportData.value.models?.[0] ?? {}),
      reportLoading,
      loading,
    }
  },
})
</script>
