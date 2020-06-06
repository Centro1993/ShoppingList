import Vue from "vue";
import Vuex from "vuex";
import * as rm from 'typed-rest-client/RestClient'
import {CreateItemDto} from "../../../api-dist/dist/dto/create-item.dto";
import {GetItemDto} from "../../../api-dist/dist/dto/get-item.dto";

const rest: rm.RestClient = new rm.RestClient('api', 'http://localhost:3000')

Vue.use(Vuex);

interface HttpBinData {
  url: string;
  data: any;
  json: any;
  args?: any;
}

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
    }
  },
  modules: {}
});