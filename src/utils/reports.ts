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

export interface UseReportDataProps {
  type_group?: string
  type_graph?: string
  type_detail?: string
}

export const useReportData = (props?: UseReportDataProps) => {
  const store = useStore()
  const id_group = computed(() => store.state.dictsIds.id_group)
  const id_counterpartie = computed(() => store.state.dictsIds.id_counterpartie)
  const id_contract = computed(() => store.state.dictsIds.id_contract)
  const date = computed(() => store.state.toolbarDate)

  // props
  const type_graph = ref<keyof ReportDataModel>('is_current')
  const type_group = ref<string>(props?.type_group ?? '')

  const prevReportData = ref<ReportData>({})
  const reportData = ref<ReportData>({})
  const chartData = ref<
    ChartData<'bar', (number | [number, number] | null)[], unknown> | undefined
  >(undefined)
  const loading = ref<string | boolean>(false)
  const refetch = () => {
    loading.value = 'warning'

    const updateData = async (
      reportParams: Record<string, string> = {},
      chartParams: Record<string, string> = {}
    ) => {
      const { data: reports } = await api.reports.post({
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        type_group: type_group.value,
        ...reportParams,
      })

      const { data: chart } = await api.reports.chart({
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        type_graph: type_graph.value,
        ...chartParams,
      })

      prevReportData.value = reportData.value
      reportData.value = reports
      chartData.value = {
        labels: chart.labels,
        datasets: Array.isArray(chart.datasets)
          ? chart.datasets
          : [
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
      updateData(
        {
          id_counterpartie: id_counterpartie.value,
          id_contract: id_contract.value,
          type_dict: 'counterparties',
        },
        {
          id_counterpartie: id_counterpartie.value,
          id_contract: id_contract.value,
          type_dict: 'counterparties',
        }
      )
      return
    }

    if (id_counterpartie.value) {
      updateData(
        {
          id_counterpartie: id_counterpartie.value,
          type_dict: 'counterparties',
        },
        {
          id_counterpartie: id_counterpartie.value,
          type_dict: 'counterparties',
        }
      )
      return
    }

    if (id_group.value) {
      updateData(
        {
          id_group: id_group.value,
          type_dict: 'groups',
        },
        {
          id_group: id_group.value,
          type_dict: 'groups',
        }
      )
      return
    }

    if (date.value) {
      updateData(
        {
          type_dict: 'groups',
        },
        {}
      )
      return
    }

    prevReportData.value = reportData.value
    reportData.value = {}
    chartData.value = undefined
    loading.value = false
  }

  watch(
    [id_group, id_counterpartie, id_contract, date, type_graph, type_group],
    refetch,
    {
      immediate: true,
    }
  )

  return {
    data: reportData,
    chartData,
    prevData: prevReportData,
    loading,
    type_graph,
    type_group,
  }
}
