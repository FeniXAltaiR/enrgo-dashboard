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
  Group = 'id_group',
  Counterpartie = 'id_counterpartie',
  Contract = 'id_contract',
}

export interface State {
  dicts: Record<Dicts, any[]>
  dictsIds: StateDictsIdsMapping
  toolbarDate: [string, string] | null
}

export type StateDictsIdsMapping = {
  [DictsIds.Group]: string | null
  [DictsIds.Counterpartie]: string[]
  [DictsIds.Contract]: string | null
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
      [DictsIds.Group]: null,
      [DictsIds.Counterpartie]: [],
      [DictsIds.Contract]: null,
    },

    dicts: {
      [Dicts.Groups]: [],
      [Dicts.Counterparties]: [],
      [Dicts.Contracts]: [],
    },
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
