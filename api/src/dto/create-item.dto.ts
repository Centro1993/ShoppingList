import {IsNotEmpty, IsPositive} from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsPositive()
    amount?: number;

    unit?: string;

    constructor(name: string, amount?: number, unit?: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}