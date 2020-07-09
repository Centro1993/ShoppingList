import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
    timestamps: true
})
export class ItemPreset extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    unit: string;
}

export const ItemPresetSchema = SchemaFactory.createForClass(ItemPreset);