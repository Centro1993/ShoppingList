import Vue from "vue";
import Vuex from "vuex";
import * as rm from 'typed-rest-client/RestClient'
import {GetItemDto} from "../../../api-dist/dist/modules/items/dto/get-item.dto";
import {CreateItemDto} from "../../../api-dist/dist/modules/items/dto/create-item.dto";

const rest: rm.RestClient = new rm.RestClient('api', 'http://localhost:3000')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: Array<GetItemDto>()
  },
  mutations: {
    async setItems(state, items: GetItemDto[]) {
      state.items = items
    },
  },
  actions: {
    async fetchItems({commit}) {
      const res: rm.IRestResponse<GetItemDto[]>= await rest.get<GetItemDto[]>('/item')
      commit('setItems', res.result);
    },
    async createItem({dispatch}, newItem: CreateItemDto) {
      const res: rm.IRestResponse<CreateItemDto>= await rest.create<CreateItemDto>('/item', newItem)
      await dispatch('fetchItems')
    },
    async removeItem({dispatch}, id: string) {
      const res: rm.IRestResponse<CreateItemDto>= await rest.del<GetItemDto>(`/item/${id}`)
      await dispatch('fetchItems')
    },
    async removeAllItems({dispatch}) {
      const res: rm.IRestResponse<CreateItemDto>= await rest.del<GetItemDto>(`/item`)
      await dispatch('fetchItems')
    }
  },
  modules: {}
});