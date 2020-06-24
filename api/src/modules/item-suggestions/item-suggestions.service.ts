import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemSuggestion } from "./schemas/item-suggestion.schema";
import {CreateItemSuggestionDto} from "./dto/create-item-suggestion.dto";

@Injectable()
export class ItemSuggestionsService {
    constructor(@InjectModel('ItemSuggestion') private itemSuggestionModel: Model<ItemSuggestion>) {}

    async create(createItemSuggestionDto: CreateItemSuggestionDto): Promise<ItemSuggestion> {
        const createdItemSuggestion = new this.itemSuggestionModel(createItemSuggestionDto);
        return createdItemSuggestion.save();
    }

    async find(userInputString: string): Promise<ItemSuggestion[]> {
        return this.itemSuggestionModel.find({ name: `/${userInputString}/` }).exec();
    }
    async deleteOne(id: string): Promise<void> {
        return this.itemSuggestionModel.deleteOne({_id: id}).exec();
    }
}