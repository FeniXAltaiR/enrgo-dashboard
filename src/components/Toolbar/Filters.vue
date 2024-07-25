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
    density="compact"
    variant="solo"
    hide-details
    item-title="name"
    item-value="id"
    v-model="id_counterparties"
    single-line
    clearable
    multiple
    chips
    closable-chips
    class="filters__autocomplete"
  ></v-autocomplete>

  <v-autocomplete
    label="Договор"
    :items="filteredContracts"
    style="max-width: 320px"
    density="compact"
    variant="solo"
    hide-details
    item-title="num"
    item-value="id"
    v-model="id_contract"
    single-line
    clearable
    :disabled="!id_counterparties.length"
  ></v-autocomplete>
</template>

<script lang="ts">
import { watch } from 'vue'
import { defineComponent, ref, computed } from 'vue'
import { DictsIds, useStore } from '@/store'

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
      if (id_counterparties.value.length) {
        return dicts.value.contracts.filter((dictItem: any) =>
          id_counterparties.value.includes(dictItem.id_counterparties)
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
      store.commit('setDictId', { dict: DictsIds.Counterpartie, id: [] })
      store.commit('setDictId', { dict: DictsIds.Contract, id: null })
    })

    const id_counterparties = computed(
      () => store.state.dictsIds.id_counterparties
    )
    watch(id_counterparties, () => {
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

      get id_counterparties() {
        return store.state.dictsIds.id_counterparties
      },
      set id_counterparties(id) {
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

<style>
.filters__autocomplete {
  max-width: 320px;
}

.filters__autocomplete .v-field__input {
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>
