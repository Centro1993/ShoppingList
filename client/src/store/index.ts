import Vue from "vue";
import Vuex from "vuex";
import * as rm from 'typed-rest-client/RestClient'

import {Item} from "../../../api/src/schemas/item.schema";
import {CreateItemDto} from "../../../api/src/dto/create-item.dto";

const rest: rm.RestClient = new rm.RestClient('http://api:3030')

Vue.use(Vuex);

interface HttpBinData {
  url: string;
  data: any;
  json: any;
  args?: any;
}

export default new Vuex.Store({
  state: {
    items: Array<Item>()
  },
  mutations: {
    async addItem(state, createItem: CreateItemDto) {
      const restRes: rm.IRestResponse<HttpBinData> = await rest.create<HttpBinData>("/item", createItem)
    },
    async fetchItems(state) {
      const res: rm.IRestResponse<Item[]>= await rest.get<Item[]>('/item')
      state.items = res.result || []
    }
  },
  actions: {},
  modules: {}
});