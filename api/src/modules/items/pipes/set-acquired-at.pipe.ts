import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import {ItemsService} from "../items.service";
import {GetItemDto} from "../dto/get-item.dto";

@Injectable()
export class SetAcquiredAtPipe implements PipeTransform<GetItemDto> {
    constructor(private readonly itemsService: ItemsService) {}

    async transform(item: GetItemDto, metadata: ArgumentMetadata): Promise<GetItemDto> {
        const itemBeforePatch = await this.itemsService.get(item._id)

        // set acquiredAt if item is patched to acquired
        if (!itemBeforePatch.acquired && item.acquired) item.acquiredAt = new Date()

        // remove acquiredAt if item is de-acquired
        if (itemBeforePatch.acquired && !item.acquired) item.acquiredAt = null

        return item;
    }
}