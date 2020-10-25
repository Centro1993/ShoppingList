import {IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsPositive} from "class-validator";
import units from "../../../lib/enums/units"

export class CreateItemDto {
    @IsMongoId()
    @IsNotEmpty()
    itemPreset: string;

    @IsOptional()
    @IsIn(units)
    unit?: string;

    @IsOptional()
    @IsPositive()
    amount?: number;

    @IsBoolean()
    acquired: boolean;

    constructor(itemPreset: string, amount?: number, unit?: string) {
        this.itemPreset = itemPreset;
        this.amount = amount;
        this.acquired = false;
        this.unit = unit;
    }
}