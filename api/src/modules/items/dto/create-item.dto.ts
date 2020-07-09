import {IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsPositive} from "class-validator";
import units from "../../../lib/enums/units"

export class CreateItemDto {
    @IsMongoId()
    @IsNotEmpty()
    itemPreset: string;

    @IsPositive()
    amount?: number;

    @IsBoolean()
    acquired: boolean;

    constructor(itemPreset: string, amount?: number) {
        this.itemPreset = itemPreset;
        this.amount = amount;
        this.acquired = false;
    }
}