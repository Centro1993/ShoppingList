
import * as rm from "typed-rest-client/RestClient";
import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import {GetItemSuggestionDto} from "../../../../api-dist/dist/modules/item-suggestions/dto/get-item-suggestion.dto";
import {CreateItemSuggestionDto} from "../../../../api-dist/dist/modules/item-suggestions/dto/create-item-suggestion.dto";
import store from '@/store'

const rest: rm.RestClient = new rm.RestClient('client', 'http://localhost:3000')

@Module({ dynamic: true, store, name: 'item-suggestion' })
class ItemSuggestion extends VuexModule {

    itemSuggestions: GetItemSuggestionDto[] = Array<GetItemSuggestionDto>()

    @Mutation
    async setItemSuggestions(itemSuggestions: GetItemSuggestionDto[]) {
        this.itemSuggestions = itemSuggestions
    }

    @Action({ commit: 'setItemSuggestions' })
    async findItemSuggestions(userInput: string) {
        const res: rm.IRestResponse<GetItemSuggestionDto[]> = await rest.get<GetItemSuggestionDto[]>('/item', {
            queryParameters: {
                params: {
                    userInput
                }
            }
        })
        return res.result
    }

    @Action
    async createItemSuggestion(itemSuggestion: CreateItemSuggestionDto): Promise<GetItemSuggestionDto | null> {
        const res: rm.IRestResponse<GetItemSuggestionDto> = await rest.create<GetItemSuggestionDto>('/item-suggestion', itemSuggestion)
        return res.result
    }
}

export const ItemSuggestionModule = getModule(ItemSuggestion)