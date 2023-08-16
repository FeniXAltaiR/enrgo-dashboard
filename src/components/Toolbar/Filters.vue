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
  ></v-autocomplete>
</template>

<script lang="ts">
import { watch } from 'vue'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ToolbarFilters',

  setup() {
    const store = useStore()
    const dicts = computed(() => store.state.dicts)

    const id_group = ref<string | null>(null)
    const id_counterpartie = ref<string | null>(null)
    const id_contract = ref<string | null>(null)

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

    watch(id_group, () => {
      id_counterpartie.value = null
      id_contract.value = null
    })

    watch(id_counterpartie, () => {
      id_contract.value = null
    })

    return {
      dicts,
      filteredCounterparties,
      filteredContracts,
      id_group,
      id_counterpartie,
      id_contract,
    }
  },
})
</script>
