import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateItemDto} from './dto/create-item.dto';
import {Item} from "./schemas/item.schema";
import {GetItemGroupedByDayDto} from "./dto/get-item-grouped-by-day.dto";

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>) {
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return await createdItem.save();
    }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().populate('itemPreset').exec();
    }

    async findAllAndGroupByDay(): Promise<GetItemGroupedByDayDto[]> {
        return await this.itemModel.aggregate([
            {
              $lookup: {
                  from: 'itempresets',
                  localField: 'itemPreset',
                  foreignField: '_id',
                  as: 'itemPreset'
              }
            },
            {
              $unwind: '$itemPreset'
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    items: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
    }

    async patchOne(editedItem): Promise<void> {
        return await this.itemModel.updateOne({_id: editedItem._id}, editedItem).exec()
    }

    async deleteOne(id: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemModel.deleteOne({_id: id}).exec();
    }

    async deleteAll(): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemModel.deleteMany({}).exec();
    }

    async deleteWhere(query): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
        return await this.itemModel.deleteMany(query).exec();
    }
}