import {GetItemPresetDto} from "../../item-presets/dto/get-item-preset.dto";

export class GetItemDto {
    itemPreset: GetItemPresetDto;
    amount: number | null;
    acquired: boolean;
    unit: string | null;
    acquiredAt: Date | null;

    _id: string;
    createdAt: Date;
    updatedAt: Date;
}