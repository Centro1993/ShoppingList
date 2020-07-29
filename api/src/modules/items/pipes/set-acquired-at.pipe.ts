import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import {ItemsService} from "../items.service";
import {GetItemDto} from "../dto/get-item.dto";
import {DayjsProvider} from "../../../dayjs.provider";

@Injectable()
export class SetAcquiredAtPipe implements PipeTransform<GetItemDto> {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly dayjsProvider: DayjsProvider
    ) {}

    async transform(item: GetItemDto, metadata: ArgumentMetadata): Promise<GetItemDto> {
        const itemBeforePatch = await this.itemsService.get(item._id)

        // set acquiredAt if item is patched to acquired
        if (!itemBeforePatch.acquired && item.acquired) item.acquiredAt = this.dayjsProvider.dayjs().toDate()

        // remove acquiredAt if item is de-acquired
        if (itemBeforePatch.acquired && !item.acquired) item.acquiredAt = null

        return item;
    }
}