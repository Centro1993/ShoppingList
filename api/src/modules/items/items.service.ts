import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateItemDto} from './dto/create-item.dto';
import {Item} from "./schemas/item.schema";
import {GetItemGroupedByDayDto} from "./dto/get-item-grouped-by-day.dto";
import * as dayjs from 'dayjs'

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>) {
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return await createdItem.save();
    }

    async get(id: string): Promise<Item> {
        return await this.itemModel.findById(id).populate('itemPreset').exec();
    }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().populate('itemPreset').exec();
    }

    /*
    Returns all items grouped by the day they have been acquired:
    {
        [
            {
                _id: '08.09.2020',
                acquiredAt: Date,
                items: [GetItemDto]
            }
        ]
    }
    Not acquired Items are always listed under the current date.
     */
    async findAllAndGroupByDay(): Promise<GetItemGroupedByDayDto[]> {
        const notAcquiredItems = await this.itemModel.find({ acquired: false }).sort({ createdAt: -1 }).populate('itemPreset').exec();

        // find all not acquired items and group them by date, newest first
        const acquiredItemsGroupedByDay = await this.itemModel.aggregate([
            {
              $match: {
                  acquired: true
              }
            },
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
                            format: "%d.%m.%Y",
                            date: "$acquiredAt"
                        }
                    },
                    items: {
                        $push: '$$ROOT'
                    },
                    acquiredAt: {
                        $max: '$acquiredAt'
                    }
                }
            },
            {
                $sort: {
                    acquiredAt: -1
                }
            }
        ])

        let allItemsGroupedByDay = acquiredItemsGroupedByDay
        if (notAcquiredItems.length > 0) {
            // join not acquired items with acquired items
            // acquired items are sorted under the current date (create if it does not exist)
            const currentDateFormatted = dayjs().format('DD.MM.YYYY')
            let itemsGroupedByDayCurrentDateIndex = acquiredItemsGroupedByDay.findIndex(itemsGroupedByDay => itemsGroupedByDay._id === currentDateFormatted)
            
            if (itemsGroupedByDayCurrentDateIndex !== -1) {
                // join all not acquired items with all acquired items from today
                allItemsGroupedByDay[itemsGroupedByDayCurrentDateIndex].items = [...notAcquiredItems, ...acquiredItemsGroupedByDay[itemsGroupedByDayCurrentDateIndex].items]
            } else {
                // create a new day object at the top of the array with all not acquired items in it
                const currentDayItemsGroupedByDay = new GetItemGroupedByDayDto(notAcquiredItems, currentDateFormatted)
                allItemsGroupedByDay = [currentDayItemsGroupedByDay, ...acquiredItemsGroupedByDay]
            }

            // index of the current day is either the one we found before or 0 (because we stacked new day at the top)
            itemsGroupedByDayCurrentDateIndex = itemsGroupedByDayCurrentDateIndex !== -1 ? itemsGroupedByDayCurrentDateIndex : 0
            // sort the joined items via createdAt
            allItemsGroupedByDay[itemsGroupedByDayCurrentDateIndex].items = allItemsGroupedByDay[itemsGroupedByDayCurrentDateIndex].items.sort((itemA, itemB) => {
                if (itemA.createdAt < itemB.createdAt) return -1
                if (itemA.createdAt < itemB.createdAt) return 1
                return 0
            })
        }

        return allItemsGroupedByDay
    }

    async patchOne(editedItem: any): Promise<void> {
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