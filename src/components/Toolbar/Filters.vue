<template>
  <v-autocomplete
    label="Группы заказчиков"
    :items="dicts.groups"
    density="compact"
    variant="solo"
    hide-details
    item-title="name"
    item-value="id"
    v-model="id_groups"
    single-line
    clearable
    multiple
    chips
    closable-chips
    class="filters__autocomplete"
  ></v-autocomplete>

  <v-autocomplete
    label="Заказчики"
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
    label="Договора"
    :items="filteredContracts"
    density="compact"
    variant="solo"
    hide-details
    item-title="num"
    item-value="id"
    v-model="id_contracts"
    single-line
    clearable
    multiple
    chips
    closable-chips
    class="filters__autocomplete"
    :disabled="!id_counterparties.length"
  ></v-autocomplete>
</template>

<script lang="ts">
import { watch, onBeforeMount, onMounted } from 'vue'
import { defineComponent, ref, computed } from 'vue'
import { DictsIds, useStore } from '@/store'
import { getSessionStorageValue, setSessionStorageValue } from '@/helpers'

export default defineComponent({
  name: 'ToolbarFilters',

  setup() {
    const store = useStore()
    const dicts = computed(() => store.state.dicts)

    const filteredCounterparties = computed(() => {
      if (id_groups.value.length) {
        return dicts.value.counterparties.filter((dictItem: any) =>
          id_groups.value.includes(dictItem.id_group)
        )
      }

      return dicts.value.counterparties
    })

    const filteredContracts = computed(() => {
      if (id_counterparties.value.length) {
        return dicts.value.contracts.filter((dictItem: any) =>
          id_counterparties.value.includes(dictItem.id_counterpartie)
        )
      }

      return []
    })

    const id_groups = computed(() => store.state.dictsIds.id_groups)
    const id_counterparties = computed(
      () => store.state.dictsIds.id_counterparties
    )

    onBeforeMount(() => {
      getDictsIdsFromSessionStorage()
    })

    onMounted(() => {
      watch(id_groups, () => {
        store.commit('setDictId', { dict: DictsIds.Counterpartie, id: [] })
        store.commit('setDictId', { dict: DictsIds.Contract, id: [] })
      })
      watch(id_counterparties, () => {
        store.commit('setDictId', { dict: DictsIds.Contract, id: [] })
      })
    })

    const getDictsIdsFromSessionStorage = () => {
      Object.values(DictsIds).forEach((DictId) => {
        store.commit('setDictId', {
          dict: DictId,
          id: getSessionStorageValue<string[]>({
            key: DictId,
            formatter: (value) => value.split(','),
            defaultValue: [],
          }),
        })
      })
    }

    const updateDictIds = (dict: DictsIds, ids: string[]) => {
      setSessionStorageValue({
        key: dict,
        value: ids.toString(),
      })
      store.commit('setDictId', { dict, id: ids })
    }

    return {
      dicts,
      filteredCounterparties,
      filteredContracts,

      get id_groups() {
        return store.state.dictsIds.id_groups
      },
      set id_groups(id) {
        updateDictIds(DictsIds.Group, id)
      },

      get id_counterparties() {
        return store.state.dictsIds.id_counterparties
      },
      set id_counterparties(id) {
        updateDictIds(DictsIds.Counterpartie, id)
      },

      get id_contracts() {
        return store.state.dictsIds.id_contracts
      },
      set id_contracts(id) {
        updateDictIds(DictsIds.Contract, id)
      },
    }
  },
})
</script>

<style>
.filters__autocomplete {
  max-width: 240px;
}

.filters__autocomplete .v-field__input {
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>
