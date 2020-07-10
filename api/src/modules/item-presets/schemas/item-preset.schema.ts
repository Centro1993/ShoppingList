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

    createdAt: Date;
    updatedAt: Date;
}

export const ItemPresetSchema = SchemaFactory.createForClass(ItemPreset);