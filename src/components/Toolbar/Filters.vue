<template>
  <v-autocomplete
    label="Группа контрагентов"
    :items="dicts.groups"
    style="max-width: 320px"
    density="compact"
    variant="solo"
    hide-details
    item-title="name"
    item-value="id"
    v-model="id_group"
    single-line
    clearable
  ></v-autocomplete>

  <v-autocomplete
    label="Контрагент"
    :items="filteredCounterparties"
    style="max-width: 320px"
    density="compact"
    variant="solo"
    hide-details
    item-title="name"
    item-value="id"
    v-model="id_counterpartie"
    single-line
    clearable
  ></v-autocomplete>

  <v-autocomplete
    label="Договор"
    :items="filteredContracts"
    style="max-width: 320px"
    density="compact"
    variant="solo"
    hide-details
    item-title="short_name"
    item-value="id"
    v-model="id_contract"
    single-line
    clearable
    :disabled="!id_counterpartie"
  ></v-autocomplete>
</template>

<script lang="ts">
import { watch } from 'vue'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { DictsIds } from '@/store'

export default defineComponent({
  name: 'ToolbarFilters',

  setup() {
    const store = useStore()
    const dicts = computed(() => store.state.dicts)

    const filteredCounterparties = computed(() => {
      if (id_group.value) {
        return dicts.value.counterparties.filter(
          (dictItem: any) => dictItem.id_group === id_group.value
        )
      }

      return dicts.value.counterparties
    })

    const filteredContracts = computed(() => {
      if (id_counterpartie.value) {
        return dicts.value.contracts.filter(
          (dictItem: any) =>
            dictItem.id_counterpartie === id_counterpartie.value
        )
      }

      const counterpartieIds = filteredCounterparties.value.map(
        (dictItem: any) => dictItem.id
      )
      return dicts.value.contracts.filter((dictItem: any) =>
        counterpartieIds.includes(dictItem.id_counterpartie)
      )
    })

    const id_group = computed(() => store.state.dictsIds.id_group)
    watch(id_group, () => {
      store.commit('setDictId', { dict: DictsIds.Counterpartie, id: null })
      store.commit('setDictId', { dict: DictsIds.Contract, id: null })
    })

    const id_counterpartie = computed(
      () => store.state.dictsIds.id_counterpartie
    )
    watch(id_counterpartie, () => {
      store.commit('setDictId', { dict: DictsIds.Contract, id: null })
    })

    return {
      dicts,
      filteredCounterparties,
      filteredContracts,

      get id_group() {
        return store.state.dictsIds.id_group
      },
      set id_group(id) {
        store.commit('setDictId', { dict: DictsIds.Group, id })
      },

      get id_counterpartie() {
        return store.state.dictsIds.id_counterpartie
      },
      set id_counterpartie(id) {
        store.commit('setDictId', { dict: DictsIds.Counterpartie, id })
      },

      get id_contract() {
        return store.state.dictsIds.id_contract
      },
      set id_contract(id) {
        store.commit('setDictId', { dict: DictsIds.Contract, id })
      },
    }
  },
})
</script>
