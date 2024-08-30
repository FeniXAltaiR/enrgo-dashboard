<template>
  <v-container class="flex-1-1 grey-lighten-5" style="position: relative" fluid>
    <v-card flat style="border-radius: 0" class="overflow-visible">
      <v-card-title class="text-left">
        <v-btn
          icon="mdi-arrow-left"
          density="comfortable"
          flat
          to="/monitoring"
        ></v-btn>
        <span>{{ title }}</span>
      </v-card-title>
    </v-card>

    <v-table density="compact" hover class="overflow-auto">
      <thead class="position-sticky top-0 bg-white" style="top: 0; z-index: 1">
        <tr>
          <th
            class="text-left"
            v-for="item in reportData.columns"
            :key="item.value"
            style="white-space: nowrap"
          >
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model, index) in reportData.models" :key="index">
          <td
            v-for="item in reportData.columns"
            :key="item.value"
            :class="`text-${item.align}`"
          >
            {{ model[item.value as keyof ReportDataModel] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useReportData } from '@/utils/reports'
import { ReportDataModel } from '@/utils/reports'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'DashboardDetail',

  setup() {
    const route = useRoute()
    const { data: reportData, loading, type_group } = useReportData()

    onMounted(() => {
      type_group.value = 'list'
    })

    const title = 'Таблица'

    return { reportData, loading, title }
  },
})
</script>
