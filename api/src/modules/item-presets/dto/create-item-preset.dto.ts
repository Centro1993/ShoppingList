import {IsString} from "class-validator";

export class CreateItemPresetDto {
    @IsString()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}