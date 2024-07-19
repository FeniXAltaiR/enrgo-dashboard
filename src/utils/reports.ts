import { computed, Ref, ref, toRef, ToRefs, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import api from '@/api/endpoints'
import { ChartData } from 'chart.js'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

export interface ReportData {
  models?: ReportDataModel[]
  columns?: ReportDataColumn[]
}

export interface ReportDataColumn {
  value: string
  text: string
}

export interface ReportDataModel {
  is_current?: number
  debt?: number
  profit?: number
  c_price?: number
  e_sum?: number
  curent_profit?: number
}

export interface UseReportData {
  type_group?: string
  type_graph?: string
  type_detail?: string
}

export const useReportData = (props: UseReportData = {}) => {
  const store = useStore()
  const id_group = computed(() => store.state.dictsIds.id_group)
  const id_counterpartie = computed(() => store.state.dictsIds.id_counterpartie)
  const id_contract = computed(() => store.state.dictsIds.id_contract)
  const date = computed(() => store.state.toolbarDate)

  const prevReportData = ref<ReportData>({})
  const reportData = ref<ReportData>({})
  const chartData = ref<
    ChartData<'bar', (number | [number, number] | null)[], unknown> | undefined
  >(undefined)
  const loading = ref<string | boolean>(false)
  const updateReportData = () => {
    loading.value = 'warning'

    const setReportData = async (params: Record<string, string> = {}) => {
      const { data: reports } = await api.reports.post({
        ...props,
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        ...params,
      })

      const { data: chart } = await api.reports.chart({
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        type_graph: props.type_graph,
        ...params,
      })

      prevReportData.value = reportData.value
      reportData.value = reports
      chartData.value = {
        labels: chart.labels,
        datasets: [
          {
            ...chart.datasets,
            backgroundColor: colors.blue.darken2,
            maxBarThickness: 64,
          },
        ],
      }
      loading.value = false
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

    if (date.value) {
      setReportData({})
      return
    }

    prevReportData.value = reportData.value
    reportData.value = {}
    chartData.value = undefined
    loading.value = false
  }

  const updateProps = (newProps: UseReportData) => {
    props.type_graph = newProps.type_graph
    updateReportData()
  }

  watch([id_group, id_counterpartie, id_contract, date], updateReportData, {
    immediate: true,
  })

  return {
    data: reportData,
    chartData,
    prevData: prevReportData,
    loading,
    refetch: updateReportData,
    updateProps,
  }
}
