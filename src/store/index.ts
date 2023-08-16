import { createStore } from 'vuex'
import api from '@/api/endpoints'

export enum Dicts {
  Groups = 'groups',
  Counterparties = 'counterparties',
  Contracts = 'contracts',
}

export default createStore({
  state: {
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
