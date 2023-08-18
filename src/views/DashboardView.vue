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
            :value="`${reportData?.is_current ?? 0} На исполнении`"
            color="warning"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Дебиторская задолженность"
            :value="`${reportData?.debt ?? 0} руб`"
            color="error"
          >
            <!-- <LineChart :data="data" :options="options" height="320" />  -->
          </dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Плановая прибыль"
            :value="`${reportData?.profit ?? 0} руб`"
          ></dashboard-view-card-wrapper>
        </v-layout>
      </v-col>

      <v-col cols="12" md="3" sm="6">
        <v-layout
          class="flex-column h-100"
          style="row-gap: 24px; overflow: initial"
        >
          <dashboard-view-card-wrapper
            title="Цена договора"
            :value="`${reportData?.c_price ?? 0} руб`"
            color="info"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Расходы"
            :value="`${reportData?.e_sum ?? 0} руб`"
            color="error"
          ></dashboard-view-card-wrapper>

          <dashboard-view-card-wrapper
            title="Прибыль на текущую дату"
            :value="`${reportData?.curent_profit ?? 0} руб`"
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
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import api from '@/api/endpoints'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

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

    const store = useStore()
    const date = computed(() => store.state.toolbarDate)
    const reportData = ref({})

    const id_group = computed(() => store.state.dictsIds.id_group)
    const id_counterpartie = computed(
      () => store.state.dictsIds.id_counterpartie
    )
    watch([id_group, id_counterpartie, date], async () => {
      if (id_counterpartie.value) {
        const { data: reports } = await api.reports.post({
          date_from: date.value?.[0] ?? null,
          date_to: date.value?.[1] ?? null,
          id_counterpartie: id_counterpartie.value,
          type_dict: 'counterparties',
          type_group: 'itog',
        })
        reportData.value = reports.models?.[0] ?? {}
        return
      }

      if (id_group.value) {
        const { data: reports } = await api.reports.post({
          date_from: date.value?.[0] ?? null,
          date_to: date.value?.[1] ?? null,
          id_group: id_group.value,
          type_dict: 'groups',
          type_group: 'itog',
        })
        reportData.value = reports.models?.[0] ?? {}
        return
      }

      reportData.value = {}
    })

    return {
      data,
      options,
      color,
      reportData,
    }
  },
})
</script>
