import {IsIn, IsOptional, IsString} from "class-validator";
import units from "../../../lib/enums/units";

export class CreateItemPresetDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsIn(units)
    unit?: string;

    constructor(name: string, unit?: string) {
        this.name = name;
        this.unit = unit || null;
    }
}