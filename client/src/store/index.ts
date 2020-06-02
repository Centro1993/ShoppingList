import Vue from "vue";
import Vuex from "vuex";
import * as rm from 'typed-rest-client/RestClient'
import {CreateItemDto} from "../../../api-dist/dist/dto/create-item.dto";
import {GetItemDto} from "../../../api-dist/dist/dto/get-item.dto";

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
    items: Array<GetItemDto>()
  },
  mutations: {
    async setItems(state, createItem: CreateItemDto) {
      const restRes: rm.IRestResponse<HttpBinData> = await rest.create<HttpBinData>('/item', createItem)
    },
  },
  actions: {
    async fetchItems({commit}) {
      const res: rm.IRestResponse<GetItemDto[]>= await rest.get<GetItemDto[]>('/item')
      console.log(res)
      this.state.items = res.result || []
    }
  },
  modules: {}
});