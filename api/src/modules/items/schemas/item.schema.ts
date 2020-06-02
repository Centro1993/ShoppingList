import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
    @Prop()
    name: string;

    @Prop()
    amount: number;

    @Prop()
    unit: string;

    @Prop()
    acquired: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);