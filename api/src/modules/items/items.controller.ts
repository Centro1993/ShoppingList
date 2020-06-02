import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from '../../dto/create-item.dto';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        await this.itemsService.create(createItemDto);
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }
}