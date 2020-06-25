import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Req} from '@nestjs/common';
import {ItemPresetsService} from "./item-presets.service";
import {CreateItemPresetDto} from "./dto/create-item-preset.dto";
import {ItemPreset} from "./schemas/item-preset.schema";
import {GetItemPresetDto} from "./dto/get-item-preset.dto";

@Controller('item-preset')
export class ItemPresetsController {
    constructor(private readonly itemPresetsService: ItemPresetsService) {}

    @Get()
    async find(@Query() query): Promise<ItemPreset[]> {
        return await this.itemPresetsService.find(query.userInput);
    }

    @Post()
    async create(@Body() createItemPresetDto: CreateItemPresetDto) {
        return await this.itemPresetsService.create(createItemPresetDto);
    }

    @Delete(':id')
    async deleteOne(@Param() params): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemPresetsService.deleteOne(params.id);
    }
}