import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/shoppingList'),
    ItemsModule,
  ],
})
export class AppModule {}