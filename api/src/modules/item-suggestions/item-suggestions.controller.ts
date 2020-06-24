import {Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {ItemSuggestionsService} from "./item-suggestions.service";
import {CreateItemSuggestionDto} from "./dto/create-item-suggestion.dto";
import {ItemSuggestion} from "./schemas/item-suggestion.schema";
import {GetItemSuggestionDto} from "./dto/get-item-suggestion.dto";

@Controller('item-suggestion')
export class ItemSuggestionsController {
    constructor(private readonly itemSuggestionsService: ItemSuggestionsService) {}

    @Get()
    async find(@Param() params): Promise<ItemSuggestion[]> {
        return await this.itemSuggestionsService.find(params.userInput);
    }

    @Post()
    async create(@Body() createItemSuggestionDto: CreateItemSuggestionDto) {
        return await this.itemSuggestionsService.create(createItemSuggestionDto);
    }

    @Delete(':id')
    async deleteOne(@Param() params): Promise<void> {
        return this.itemSuggestionsService.deleteOne(params.id);
    }
}