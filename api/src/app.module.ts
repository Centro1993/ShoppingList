import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './modules/items/items.module';
import { ItemPresetsModule } from './modules/item-presets/item-presets.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration'
import {AppGateway} from "./app.gateway";

@Module({
  imports: [
    MongooseModule.forRoot(configuration().mongodb.uri),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ItemsModule,
    ItemPresetsModule
  ]
})
export class AppModule {}