import {
  computed,
  onActivated,
  onBeforeMount,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import api from '@/api/endpoints'

export interface ReportData {
  models?: ReportDataModel[]
  columns?: ReportDataColumn[]
}

export interface ReportDataColumn {
  value: string
  text: string
}

export interface ReportDataModel {
  is_current?: string | number
  debt?: string | number
  profit?: string | number
  c_price?: string | number
  e_sum?: string | number
  curent_profit?: string | number
}

export const useReportData = (defaultParams: Record<string, string> = {}) => {
  const store = useStore()
  const id_group = computed(() => store.state.dictsIds.id_group)
  const id_counterpartie = computed(() => store.state.dictsIds.id_counterpartie)
  const id_contract = computed(() => store.state.dictsIds.id_contract)
  const date = computed(() => store.state.toolbarDate)

  const prevReportData = ref<ReportData>({})
  const reportData = ref<ReportData>({})
  const loading = ref<string | boolean>(false)
  const updateReportData = () => {
    loading.value = 'warning'

    const setReportData = async (params: Record<string, string> = {}) => {
      const { data: reports } = await api.reports.post({
        ...defaultParams,
        date_from: date.value?.[0] ?? null,
        date_to: date.value?.[1] ?? null,
        ...params,
      })
      prevReportData.value = reportData.value
      reportData.value = reports
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

    prevReportData.value = reportData.value
    reportData.value = {}
    loading.value = false
  }

  watch([id_group, id_counterpartie, id_contract, date], updateReportData, {
    immediate: true,
  })

  return {
    data: reportData,
    prevData: prevReportData,
    loading,
    refetch: updateReportData,
  }
}
