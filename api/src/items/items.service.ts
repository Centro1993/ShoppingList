import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from '../dto/create-item.dto';
import { Item } from "../schemas/item.schema";

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
}