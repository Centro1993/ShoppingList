import {IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsPositive} from "class-validator";
import units from "../../../lib/enums/units"

export class CreateItemDto {
    @IsMongoId()
    @IsNotEmpty()
    itemPreset: string;

    @IsPositive()
    amount?: number;

    @IsOptional()
    @IsIn(units)
    unit?: string;

    @IsBoolean()
    acquired: boolean;

    constructor(itemPreset: string, amount?: number, unit?: string) {
        this.itemPreset = itemPreset;
        this.amount = amount;
        this.unit = unit;
        this.acquired = false;
    }
}