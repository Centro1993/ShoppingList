import {GetItemPresetDto} from "../../item-presets/dto/get-item-preset.dto";

export class GetItemDto {
    itemPreset: GetItemPresetDto;
    amount: number;
    acquired: boolean;

    _id: string;
    createdAt: Date;
    updatedAt: Date;
}