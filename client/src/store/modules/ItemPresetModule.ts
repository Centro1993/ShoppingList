
import * as rm from "typed-rest-client/RestClient";
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import {GetItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/get-item-preset.dto";
import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";
import store from '@/store'

const rest: rm.RestClient = new rm.RestClient('client', 'http://localhost:3000')

@Module({ dynamic: true, store, name: 'itemPreset' })
class ItemPreset extends VuexModule {

    itemPresets: GetItemPresetDto[] = Array<GetItemPresetDto>()

    @Mutation
    async setItemPresets(itemPresets: GetItemPresetDto[]) {
        this.itemPresets = itemPresets
    }

    @Action({ commit: 'setItemPresets' })
    async findItemPresets(userInput: string) {
        const res: rm.IRestResponse<GetItemPresetDto[]> = await rest.get<GetItemPresetDto[]>('/item-preset', {
            queryParameters: {
                params: {
                    userInput
                }
            }
        })
        return res.result
    }

    @Action
    async createItemPreset(itemPreset: CreateItemPresetDto): Promise<GetItemPresetDto | null> {
        const res: rm.IRestResponse<GetItemPresetDto> = await rest.create<GetItemPresetDto>('/item-preset', itemPreset)
        console.log(res.result)
        return res.result
    }
}

export const ItemPresetModule = getModule(ItemPreset)