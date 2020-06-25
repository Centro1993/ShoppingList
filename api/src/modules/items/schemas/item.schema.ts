import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    timestamps: true
})
export class Item extends Document {
    @Prop(raw({ type: MongooseSchema.Types.ObjectId, ref: 'ItemPreset' }))
    itemPreset: MongooseSchema.Types.ObjectId;

    @Prop()
    amount: number;

    @Prop()
    unit: string;

    @Prop()
    acquired: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);