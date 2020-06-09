import {IsIn, IsNotEmpty, IsOptional, IsPositive} from "class-validator";
import units from "../../../lib/enums/units"

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsPositive()
    amount?: number;

    @IsOptional()
    @IsIn(units)
    unit?: string;

    constructor(name: string, amount?: number, unit?: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}