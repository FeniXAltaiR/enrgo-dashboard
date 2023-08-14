import { createStore } from 'vuex'
import api from '@/api/endpoints'

export enum Dicts {
  Counterparties = 'counterparties',
  Contracts = 'contracts',
}

export default createStore({
  state: {
    dicts: {
      groups: [],
      counterparties: [],
      contracts: [],
    },
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
