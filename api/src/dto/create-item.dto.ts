export class CreateItemDto {
    name: string;
    amount?: number;
    unit?: string;

    constructor(name: string, amount?: number, unit?: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
}