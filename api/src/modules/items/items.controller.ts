import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import {GetItemDto} from "./dto/get-item.dto";
import {GetItemGroupedByDayDto} from "./dto/get-item-grouped-by-day.dto";
import {SetAcquiredAtPipe} from "./pipes/set-acquired-at.pipe";
import {AppGateway} from "../../app.gateway";

@Controller('item')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly appGateway: AppGateway
        ) {}

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        return await this.itemsService.create(createItemDto);
    }

    @Patch()
    @UsePipes(SetAcquiredAtPipe)
    async patchOne(@Body() editedItem: GetItemDto): Promise<void> {
        return await this.itemsService.patchOne(editedItem)
    }

    @Get()
    async findAll(): Promise<GetItemGroupedByDayDto[]> {
        return await this.itemsService.findAllAndGroupByDay();
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