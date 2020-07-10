import {GetItemDto} from "./get-item.dto";
import {Item} from "../schemas/item.schema";

export class GetItemGroupedByDayDto {

    items: GetItemDto[] | Item[];

    _id: string;

    constructor(items: GetItemDto[] | Item[], id: string) {
        this.items = items;
        this._id = id;
    }
}