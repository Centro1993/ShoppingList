import {IsNotEmpty, IsPositive} from "class-validator";


export class GetItemDto {
    @IsNotEmpty()
    name: string;

    @IsPositive()
    amount: number;

    unit: string;
}