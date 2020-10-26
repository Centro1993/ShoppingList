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
    amount?: number | null;

    @IsBoolean()
    acquired: boolean;

    constructor(itemPreset: string, amount?: number | null, unit?: string) {
        this.itemPreset = itemPreset;
        this.amount = amount;
        this.acquired = false;
        this.unit = unit;
    }
}