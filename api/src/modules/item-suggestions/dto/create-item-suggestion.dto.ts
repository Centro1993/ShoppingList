import {IsString} from "class-validator";

export class CreateItemSuggestionDto {
    @IsString()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}