import {Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import {GetItemDto} from "./dto/get-item.dto";

@Controller('item')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        return await this.itemsService.create(createItemDto);
    }

    @Patch()
    async patchOne(@Body() editedItem: GetItemDto): Promise<void> {
        return await this.itemsService.patchOne(editedItem)
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Delete()
    async deleteAll(): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemsService.deleteAll();
    }

    @Delete(':id')
    async deleteOne(@Param() params): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemsService.deleteOne(params.id);
    }
}