<template>
  <v-autocomplete
    label="Года"
    :items="yearsItems"
    density="compact"
    variant="solo"
    hide-details
    v-model="years"
    single-line
    clearable
    multiple
    chips
    closable-chips
    class="filters__autocomplete"
  ></v-autocomplete>

  <v-autocomplete
    label="Кварталы"
    :items="periodItems"
    density="compact"
    variant="solo"
    hide-details
    item-title="title"
    item-value="value"
    v-model="periods"
    single-line
    clearable
    multiple
    chips
    closable-chips
    class="filters__autocomplete"
  ></v-autocomplete>

  <v-checkbox v-model="is_sum" hide-details></v-checkbox>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import { getSessionStorageValue, setSessionStorageValue } from '@/helpers'

import { periodItems, START_YEAR } from './constants'

export default defineComponent({
  name: 'ToolbarDatePicker',

  setup() {
    const store = useStore()

    onBeforeMount(() => {
      getYearsFromSessionStorage()
      getPeriodsFromSessionStorage()
    })

    const getYearsFromSessionStorage = () => {
      store.commit(
        'setYears',
        getSessionStorageValue<string[]>({
          key: 'years',
          formatter: (value) => value.split(','),
          defaultValue: [],
        })
      )
    }

    const getPeriodsFromSessionStorage = () => {
      store.commit(
        'setPeriods',
        getSessionStorageValue<string[]>({
          key: 'periods',
          formatter: (value) => value.split(','),
          defaultValue: [],
        })
      )
    }

    const yearsItems = computed(() => {
      const currentYear = new Date().getFullYear()

      // создаем список с названиями годов
      return Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) =>
        (START_YEAR + i).toString()
      )
    })

    return {
      get date() {
        return store.state.toolbarDate
      },
      set date(value) {
        store.commit('setToolbarDate', value)
      },

      get years() {
        return store.state.years
      },
      set years(years) {
        setSessionStorageValue({
          key: 'years',
          value: years.toString(),
        })
        store.commit('setYears', years)
      },

      get periods() {
        return store.state.periods
      },
      set periods(periods) {
        setSessionStorageValue({
          key: 'periods',
          value: periods.toString(),
        })
        store.commit('setPeriods', periods)
      },

      yearsItems,
      periodItems,

      get is_sum() {
        return store.state.is_sum
      },
      set is_sum(bool) {
        store.commit('setIsSum', bool)
      },
    }
  },
})
</script>
