import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemPresetsController } from './item-presets.controller';
import { ItemPresetsService } from './item-presets.service';
import { ItemPreset, ItemPresetSchema } from './schemas/item-preset.schema';
import {ItemsModule} from "../items/items.module";
import {AppGateway} from "../../app.gateway";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ItemPreset.name, schema: ItemPresetSchema }]),
        ItemsModule
    ],
    controllers: [ItemPresetsController],
    providers: [ItemPresetsService, AppGateway]
})
export class ItemPresetsModule {}