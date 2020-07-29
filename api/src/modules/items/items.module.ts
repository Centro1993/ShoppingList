import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './schemas/item.schema';
import {AppGateway} from "../../app.gateway";
import {DayjsProvider} from "../../dayjs.provider";

@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
    controllers: [ItemsController],
    providers: [ItemsService, AppGateway, DayjsProvider],
    exports: [ItemsService]
})
export class ItemsModule {}