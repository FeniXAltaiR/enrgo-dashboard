import { createStore } from 'vuex'
import api from '@/api/endpoints'

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

export default createStore({
  state: {
    toolbarDate: null as [string, string] | null,

    dictsIds: {
      [DictsIds.Group]: null,
      [DictsIds.Counterpartie]: null,
      [DictsIds.Contract]: null,
    } as Record<DictsIds, string | null>,

    dicts: {
      [Dicts.Groups]: [],
      [Dicts.Counterparties]: [],
      [Dicts.Contracts]: [],
    } as Record<Dicts, any[]>,
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
