import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSuggestionsController } from './item-suggestions.controller';
import { ItemSuggestionsService } from './item-suggestions.service';
import { ItemSuggestion, ItemSuggestionSchema } from './schemas/item-suggestion.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: ItemSuggestion.name, schema: ItemSuggestionSchema }])],
    controllers: [ItemSuggestionsController],
    providers: [ItemSuggestionsService],
})
export class ItemSuggestionsModule {}