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
            <BarChart :data="data" :options="options" height="320" />
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
          >
            <vue-autocounter
              :startAmount="prevReportData?.is_current ?? 0"
              :endAmount="reportData?.is_current ?? 0"
              :duration="1"
              suffix=" На исполнении"
              :autoinit="true"
              @finished="loading = false"
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Дебиторская задолженность"
            color="error"
            :loading="loading"
          >
            <vue-autocounter
              :startAmount="prevReportData?.debt ?? 0"
              :endAmount="reportData?.debt ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Плановая прибыль"
            color="success"
            :loading="loading"
          >
            <vue-autocounter
              :startAmount="prevReportData?.profit ?? 0"
              :endAmount="reportData?.profit ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
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
          >
            <vue-autocounter
              :startAmount="Number(prevReportData?.c_price ?? 0)"
              :endAmount="Number(reportData?.c_price ?? 0)"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Расходы"
            color="error"
            :loading="loading"
          >
            <vue-autocounter
              :startAmount="prevReportData?.e_sum ?? 0"
              :endAmount="reportData?.e_sum ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
            />
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Прибыль на текущую дату"
            color="success"
            :loading="loading"
          >
            <vue-autocounter
              :startAmount="prevReportData?.curent_profit ?? 0"
              :endAmount="reportData?.curent_profit ?? 0"
              :duration="1"
              suffix=" руб"
              :autoinit="true"
              @finished="loading = false"
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
import { useStore } from 'vuex'
import api from '@/api/endpoints'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

export interface ReportData {
  is_current?: string | number
  debt?: string | number
  profit?: string | number
  c_price?: string | number
  e_sum?: string | number
  curent_profit?: string | number
}

export default defineComponent({
  name: 'DashboardView',

  components: {
    BarChart,
    // LineChart,
    DashboardViewCardWrapper,
  },

  setup() {
    const data = {
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
    }
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          ticks: {
            // color: 'white',
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
    const store = useStore()
    const date = computed(() => store.state.toolbarDate)
    const prevReportData = ref<ReportData>({})
    const reportData = ref<ReportData>({})
    const loading = ref<string | boolean>(false)

    const id_group = computed(() => store.state.dictsIds.id_group)
    const id_counterpartie = computed(
      () => store.state.dictsIds.id_counterpartie
    )
    const id_contract = computed(() => store.state.dictsIds.id_contract)
    const updateReportData = () => {
      loading.value = 'warning'

      const setReportData = async (params: Record<string, string> = {}) => {
        const { data: reports } = await api.reports.post({
          date_from: date.value?.[0] ?? null,
          date_to: date.value?.[1] ?? null,
          type_group: 'itog',
          ...params,
        })
        prevReportData.value = reportData.value
        reportData.value = reports.models?.[0] ?? {}
      }

      if (id_contract.value) {
        setReportData({
          id_counterpartie: id_counterpartie.value,
          id_contract: id_contract.value,
          type_dict: 'counterparties',
        })
        return
      }

      if (id_counterpartie.value) {
        setReportData({
          id_counterpartie: id_counterpartie.value,
          type_dict: 'counterparties',
        })
        return
      }

      if (id_group.value) {
        setReportData({
          id_group: id_group.value,
          type_dict: 'groups',
        })
        return
      }

      prevReportData.value = reportData.value
      reportData.value = {}
      loading.value = false
    }

    watch([id_group, id_counterpartie, id_contract, date], updateReportData)

    return {
      data,
      options,
      color,
      prevReportData,
      reportData,
      loading,
    }
  },
})
</script>
