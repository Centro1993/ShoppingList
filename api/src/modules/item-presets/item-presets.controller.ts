import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {ItemPresetsService} from "./item-presets.service";
import {ItemsService} from "../items/items.service";
import {CreateItemPresetDto} from "./dto/create-item-preset.dto";
import {ItemPreset} from "./schemas/item-preset.schema";

@Controller('item-preset')
export class ItemPresetsController {
    constructor(
        private readonly itemPresetsService: ItemPresetsService,
        private readonly itemsService: ItemsService
        ) {}

    @Get()
    async find(@Query() query): Promise<ItemPreset[]> {
        return await this.itemPresetsService.find(query.userInput);
    }

    @Post()
    async create(@Body() createItemPresetDto: CreateItemPresetDto) {
        createItemPresetDto.name = createItemPresetDto.name.charAt(0).toUpperCase() + createItemPresetDto.name.slice(1)
        return await this.itemPresetsService.create(createItemPresetDto);
    }

    @Delete(':id')
    async deleteOne(@Param() params): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        await this.itemsService.deleteWhere({itemPreset: params.id})
        return await this.itemPresetsService.deleteOne(params.id);
    }
}