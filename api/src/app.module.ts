import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './modules/items/items.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration'

@Module({
  imports: [
    MongooseModule.forRoot(configuration().mongodb.uri),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ItemsModule,
  ],
})
export class AppModule {}