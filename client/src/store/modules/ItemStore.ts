import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
import * as rm from "typed-rest-client/RestClient";
import {CreateItemDto} from "../../../../api-dist/dist/modules/items/dto/create-item.dto";
import {VuexModule, Module, Mutation, Action, getModule, config} from 'vuex-module-decorators';
import store from '@/store'
import {GetItemGroupedByDayDto} from "../../../../api-dist/dist/modules/items/dto/get-item-grouped-by-day.dto";
import globalConfiguration from '../../../../api-dist/dist/config/configuration'
const globalConfig = globalConfiguration()
import { $socket } from '../../main'

const rest: rm.RestClient = new rm.RestClient('client', globalConfig.apiUrl)

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
        const res: rm.IRestResponse<GetItemGroupedByDayDto[]> = await rest.get<GetItemGroupedByDayDto[]>('/item')
        if(!res.result) return []
        return res.result
    }

    @Action
    async createItem(newItem: CreateItemDto) {
        await rest.create<CreateItemDto>('/item', newItem)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async patchItem(editedItem: GetItemDto) {
        await rest.update<void>(`/item`, editedItem)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async removeItem(id: string) {
        await rest.del<GetItemDto>(`/item/${id}`)
        await this.fetchItems()
        $socket.emit('updated')
    }

    @Action
    async removeAllItems() {
        await rest.del<GetItemDto>(`/item`)
        await this.fetchItems()
        $socket.emit('updated')
    }
}

export const ItemStore = getModule(Item, store)