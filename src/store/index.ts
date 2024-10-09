import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { getDateRangeOfYear } from '@/helpers'
import api from '@/api/endpoints'
import { InjectionKey } from 'vue'

export enum Dicts {
  Groups = 'groups',
  Counterparties = 'counterparties',
  Contracts = 'contracts',
}

export enum DictsIds {
  Group = 'id_groups',
  Counterpartie = 'id_counterparties',
  Contract = 'id_contracts',
}

export interface State {
  dicts: Record<Dicts, any[]>
  dictsIds: StateDictsIdsMapping
  toolbarDate: [string, string] | null
  years: string[]
  periods: string[]
  is_sum: boolean
}

export type StateDictsIdsMapping = {
  [DictsIds.Group]: string[]
  [DictsIds.Counterpartie]: string[]
  [DictsIds.Contract]: string[]
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const useStore = () => {
  return baseUseStore(key)
}

export const store = createStore<State>({
  state: {
    toolbarDate: getDateRangeOfYear(),

    dictsIds: {
      [DictsIds.Group]: [],
      [DictsIds.Counterpartie]: [],
      [DictsIds.Contract]: [],
    },

    dicts: {
      [Dicts.Groups]: [],
      [Dicts.Counterparties]: [],
      [Dicts.Contracts]: [],
    },

    years: [],

    periods: [],

    is_sum: false,
  },

  getters: {},

  mutations: {
    setDict(state, { dict, data }) {
      state.dicts[dict as Dicts] = data
    },

    setDictId(state, { dict, id }) {
      state.dictsIds[dict as DictsIds] = id
    },

    setToolbarDate(state, date) {
      state.toolbarDate = date
    },

    setYears(state, years) {
      state.years = years
    },

    setPeriods(state, periods) {
      state.periods = periods
    },

    setIsSum(state, bool) {
      state.is_sum = bool
    },
  },

  actions: {
    async postDict(context, dict) {
      const { data } = await api.dicts.post(dict)

      context.commit('setDict', {
        dict,
        data,
      })
    },
  },

  modules: {},
})
