import {IsBoolean, IsIn, IsNotEmpty, IsPositive} from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsPositive()
    amount?: number;

    @IsIn(['Kilo'])
    unit?: string;

    @IsBoolean()
    acquired?: boolean;

    constructor(name: string, amount?: number, unit?: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}