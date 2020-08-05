import * as rm from "typed-rest-client/RestClient";
import {VuexModule, Module, Mutation, Action, getModule, config} from 'vuex-module-decorators';
import {GetItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/get-item-preset.dto";
import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";
import store from '@/store'
import { $socket } from '../../main'

// Set rawError to true by default on all @Action decorators
config.rawError = true

const rest: rm.RestClient = new rm.RestClient('client', process.env.VUE_APP_API_URL)

@Module({ dynamic: true, store, name: 'itemPreset' })
class ItemPreset extends VuexModule {

    itemPresets: GetItemPresetDto[] = Array<GetItemPresetDto>()

    @Mutation
    setItemPresets(itemPresets: GetItemPresetDto[]) {
        this.itemPresets = itemPresets
    }

    @Action({ commit: 'setItemPresets' })
    async findItemPresets(userInput: string) {
        const res: rm.IRestResponse<GetItemPresetDto[]> = await rest.get<GetItemPresetDto[]>('/item-preset', {
            queryParameters: {
                params: {
                    itemPresetNameUserInput: userInput
                }
            }
        })
        return res.result
    }

    @Action
    async createItemPreset(itemPreset: CreateItemPresetDto): Promise<GetItemPresetDto | null> {
        const res: rm.IRestResponse<GetItemPresetDto> = await rest.create<GetItemPresetDto>('/item-preset', itemPreset)
        return res.result
    }

    @Action
    async deleteItemPreset(itemPresetId: string): Promise<void> {
        const res: rm.IRestResponse<void> = await rest.del<void>(`/item-preset/${itemPresetId}`)
        await this.context.dispatch('fetchItems')
        $socket.emit('updated')
    }
}

export const ItemPresetStore = getModule(ItemPreset)