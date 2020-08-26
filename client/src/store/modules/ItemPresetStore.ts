import axios from 'axios';
import { AxiosResponse } from 'axios';
import {VuexModule, Module, Mutation, Action, getModule, config} from 'vuex-module-decorators';
import {GetItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/get-item-preset.dto";
import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";
import store from '@/store'
import { $socket } from '@/main'

// Set rawError to true by default on all @Action decorators
config.rawError = true

const rest = axios.create({
    baseURL: process.env.VUE_APP_API_URL + process.env.VUE_APP_API_PATH
})

@Module({ dynamic: true, store, name: 'itemPreset' })
class ItemPreset extends VuexModule {

    itemPresets: GetItemPresetDto[] = Array<GetItemPresetDto>()

    @Mutation
    setItemPresets(itemPresets: GetItemPresetDto[]) {
        this.itemPresets = itemPresets
    }

    @Action({ commit: 'setItemPresets' })
    async findItemPresets(userInput: string) {
        const res: AxiosResponse<GetItemPresetDto[]> = await rest.get<GetItemPresetDto[]>('/item-preset', {
            params: {
                itemPresetNameUserInput: userInput
            }
        })
        return res.data
    }

    @Action
    async createItemPreset(itemPreset: CreateItemPresetDto): Promise<GetItemPresetDto | null> {
        const res: AxiosResponse<GetItemPresetDto> = await rest.post<GetItemPresetDto>('/item-preset', itemPreset)
        const newItemPreset = res.data
        this.itemPresets.push(newItemPreset)
        return newItemPreset
    }

    @Action
    async deleteItemPreset(itemPresetId: string): Promise<void> {
        const res: AxiosResponse = await rest.delete<void>(`/item-preset/${itemPresetId}`)
        await this.context.dispatch('fetchItems')
        $socket.emit('updated')
    }
}

export const ItemPresetStore = getModule(ItemPreset)