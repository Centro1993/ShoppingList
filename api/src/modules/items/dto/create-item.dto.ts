import {IsBoolean, IsIn, IsMongoId, IsOptional, IsPositive} from "class-validator";
import units from "../../../lib/enums/units"

export class CreateItemDto {
    @IsMongoId()
    itemSuggestionId: string;

    @IsPositive()
    amount?: number;

    @IsOptional()
    @IsIn(units)
    unit?: string;

    @IsBoolean()
    acquired: boolean;

    constructor(itemSuggestionId: string, amount?: number, unit?: string) {
        this.itemSuggestionId = itemSuggestionId;
        this.amount = amount;
        this.unit = unit;
        this.acquired = false;
    }
}