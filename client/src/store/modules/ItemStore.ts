import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
import {CreateItemDto} from "../../../../api-dist/dist/modules/items/dto/create-item.dto";
import {VuexModule, Module, Mutation, Action, getModule, config} from 'vuex-module-decorators';
import store from '@/store'
import {GetItemGroupedByDayDto} from "../../../../api-dist/dist/modules/items/dto/get-item-grouped-by-day.dto";
import { $socket } from '@/main'
import axios from "axios";
import { AxiosResponse } from "axios";

const rest = axios.create({
    baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_URL
})

// Set rawError to true by default on all @Action decorators
config.rawError = true

@Module({ dynamic: true, store, name: 'item' })
class Item extends VuexModule {
    itemsGroupedByDay: GetItemGroupedByDayDto[] = Array<GetItemGroupedByDayDto>();

    @Mutation
    setItemsGroupedByDay(itemsGroupedByDay: GetItemGroupedByDayDto[]) {
        this.itemsGroupedByDay = itemsGroupedByDay
    }

    @Action({commit: 'setItemsGroupedByDay'})
    // eslint-disable-next-line @typescript-eslint/camelcase
    async fetchItems() {
        const res: AxiosResponse<GetItemGroupedByDayDto[]> = await rest.get<GetItemGroupedByDayDto[]>('/item')
        if(!res.data) return []
        return res.data
    }

    @Action
    async createItem(newItem: CreateItemDto) {
        await rest.post<CreateItemDto>('/item', newItem)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async patchItem(editedItem: GetItemDto) {
        await rest.patch<void>(`/item`, editedItem)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async removeItem(id: string) {
        await rest.delete<GetItemDto>(`/item/${id}`)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async removeAllItems() {
        await rest.delete<GetItemDto>(`/item`)
        await this.fetchItems()
        $socket.emit('updated')
    }
}

export const ItemStore = getModule(Item, store)