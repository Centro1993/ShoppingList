import {GetItemSuggestionDto} from "../../item-suggestions/dto/get-item-suggestion.dto";

export class GetItemDto {
    itemSuggestion: GetItemSuggestionDto;
    amount: number;
    unit: string;
    acquired: boolean;

    _id: string;
    createdAt: Date;
    updatedAt: Date;
}