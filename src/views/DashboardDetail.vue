<template>
  <v-container
    class="flex-1-1 flex-wrap grey-lighten-5 overflow-hidden"
    style="position: relative"
    fluid
  >
    <v-table density="compact" hover class="h-100 overflow-auto">
      <thead>
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
          <td v-for="item in reportData.columns" :key="item.value">
            {{ model[item.value as keyof ReportDataModel] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useReportData } from '@/utils/reports'
import { ReportDataModel } from '@/utils/reports'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'DashboardDetail',

  setup() {
    const route = useRoute()
    const { data: reportData, loading, type_group } = useReportData()

    type_group.value = 'list'

    return { reportData, loading }
  },
})
</script>
