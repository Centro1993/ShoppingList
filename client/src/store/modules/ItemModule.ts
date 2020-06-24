import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
import * as rm from "typed-rest-client/RestClient";
import {CreateItemDto} from "../../../../api-dist/dist/modules/items/dto/create-item.dto";
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import store from '@/store'

const rest: rm.RestClient = new rm.RestClient('client', 'http://localhost:3000')

@Module({ dynamic: true, store, name: 'item' })
class Item extends VuexModule {
    items: GetItemDto[] = Array<GetItemDto>();

    @Mutation
    async setItems(items: GetItemDto[]) {
        this.items = items
    }

    @Action({ commit: 'setItems' })
    async fetchItems() {
        const res: rm.IRestResponse<GetItemDto[]> = await rest.get<GetItemDto[]>('/item')
        return res.result
    }

    @Action
    async createItem(newItem: CreateItemDto) {
        await rest.create<CreateItemDto>('/item', newItem)
        await this.fetchItems()
    }

    @Action
    async patchItem(editedItem: GetItemDto) {
        await rest.update<void>(`/item`, editedItem)
        await this.fetchItems()
    }

    @Action
    async removeItem(id: string) {
        await rest.del<GetItemDto>(`/item/${id}`)
        await this.fetchItems()
    }

    @Action
    async removeAllItems() {
        await rest.del<GetItemDto>(`/item`)
        await this.fetchItems()
    }
}

export const ItemModule = getModule(Item)