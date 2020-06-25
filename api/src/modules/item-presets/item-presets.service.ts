import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemPreset } from "./schemas/item-preset.schema";
import {CreateItemPresetDto} from "./dto/create-item-preset.dto";

@Injectable()
export class ItemPresetsService {
    constructor(@InjectModel('ItemPreset') private itemPresetModel: Model<ItemPreset>) {}

    async create(createItemPresetDto: CreateItemPresetDto): Promise<ItemPreset> {
        const createdItemPreset = new this.itemPresetModel(createItemPresetDto);
        return await createdItemPreset.save();
    }

    async find(userInputString: string): Promise<ItemPreset[]> {
        return await this.itemPresetModel.find({ name: { $regex: new RegExp(userInputString), $options: 'i' } } ).exec();
    }
    async deleteOne(id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemPresetModel.deleteOne({_id: id}).exec();
    }
}