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

      <v-col cols="12" md="6" sm="6">
        <v-layout class="h-100 flex-wrap" style="gap: 12px">
          <div
            v-for="view in dashboardViewList"
            :key="view.value"
            style="width: calc(50% - 12px)"
          >
            <v-layout class="flex-column h-100" style="overflow: initial">
              <dashboard-view-card-wrapper
                :title="view.title"
                :color="view.color"
                :loading="loading"
                :to="`/monitoring/${view.value}`"
                @click="() => (graphType = view.value)"
                :active="graphType === view.value"
              >
                <vue-autocounter
                  :startAmount="
                    prevReportData?.[view.value]
                      ? prevReportData?.[view.value]
                      : 0
                  "
                  :endAmount="
                    reportData?.[view.value] ? reportData?.[view.value] : 0
                  "
                  :duration="1"
                  :suffix="` ${view.suffix}`"
                  :autoinit="true"
                  @finished="loading = false"
                  separator="."
                />
              </dashboard-view-card-wrapper>
            </v-layout>
          </div>
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
import { dashboardViewList } from './constants'

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
      animation: {},
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          ticks: {
            // color: 'white',
            // stepSize: 1,
            format: {
              // maximumFractionDigits: 1,
            },
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
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white',
          align: 'top',
          textAlign: 'left',
          font: {
            size: 14,
          },
          formatter(value, context) {
            return new Intl.NumberFormat('ru', {
              compactDisplay: 'short',
              notation: 'compact',
            }).format(value)
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
      type_graph,
      type_group,
    } = useReportData({ type_group: 'itog' })

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
      graphType: type_graph,
      dashboardViewList,
    }
  },
})
</script>
