import { computed, Ref, ref, toRef, ToRefs, toRefs, watch } from 'vue'
import api from '@/api/endpoints'
import { useStore } from '@/store'
import { ChartData } from 'chart.js'

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

export interface ReportData {
  models?: ReportDataModel[]
  columns?: ReportDataColumn[]
}

export interface ReportDataColumn {
  value: keyof ReportDataModel
  text: string
  align?: string
  visible: boolean
  forder: number
}

export interface ReportDataModel {
  is_current?: number
  is_completed?: number
  debt?: number
  profit?: number
  c_price?: number
  e_sum?: number
  curent_profit?: number
  ccount?: number
  price_fulfilled?: number
  price_done?: number
  price_price_done?: number
  price_paid_y?: number
}

export interface UseReportDataProps {
  type_group?: string
  type_graph?: string
  type_detail?: string
}

export const useReportData = (props?: UseReportDataProps) => {
  const store = useStore()
  const id_groups = computed(() => store.state.dictsIds.id_groups)
  const id_counterparties = computed(
    () => store.state.dictsIds.id_counterparties
  )
  const id_contracts = computed(() => store.state.dictsIds.id_contracts)
  const date = computed(() => store.state.toolbarDate)
  const years = computed(() => store.state.years)
  const periods = computed(() => store.state.periods)

  // props
  const type_graph = ref<keyof ReportDataModel>('c_price')
  const type_group = ref<string>(props?.type_group ?? '')

  const prevReportData = ref<ReportData>({})
  const reportData = ref<ReportData>({})
  const chartData = ref<
    ChartData<'bar', (number | [number, number] | null)[], unknown> | undefined
  >(undefined)
  const loading = ref<string | boolean>(false)
  const refetch = () => {
    loading.value = 'primary'

    const updateData = async (
      reportParams: Record<string, string | string[]> = {},
      chartParams: Record<string, string | string[]> = {}
    ) => {
      const { data: reports } = await api.reports.post({
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        years: years.value,
        periods: periods.value,
        type_group: type_group.value,
        ...reportParams,
      })

      const { data: chart } = await api.reports.chart({
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        years: years.value,
        periods: periods.value,
        type_graph: type_graph.value,
        ...chartParams,
      })

      /* Высчитываем кол-во закрытых договоров */
      reports.models.forEach((reportItem: any) => {
        reportItem.is_completed =
          (reportItem.ccount ?? 0) - (reportItem.is_current ?? 0)
      })

      prevReportData.value = reportData.value
      reportData.value = reports
      chartData.value = {
        labels: chart.labels,
        datasets: chart.datasets ?? [],
      }
      loading.value = false
    }

    if (id_contracts.value.length) {
      updateData(
        {
          id_counterparties: id_counterparties.value,
          id_contracts: id_contracts.value,
          type_dict: 'counterparties',
        },
        {
          id_counterparties: id_counterparties.value,
          id_contracts: id_contracts.value,
          type_dict: 'counterparties',
        }
      )
      return
    }

    if (id_counterparties.value.length) {
      updateData(
        {
          id_counterparties: id_counterparties.value,
          type_dict: 'counterparties',
        },
        {
          id_counterparties: id_counterparties.value,
          type_dict: 'counterparties',
        }
      )
      return
    }

    if (id_groups.value.length) {
      updateData(
        {
          id_groups: id_groups.value,
          type_dict: 'groups',
        },
        {
          id_groups: id_groups.value,
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
    [
      id_groups,
      id_counterparties,
      id_contracts,
      date,
      type_graph,
      type_group,
      years,
      periods,
    ],
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
