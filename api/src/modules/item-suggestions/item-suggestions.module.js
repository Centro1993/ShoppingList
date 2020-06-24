"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ItemsModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var items_controller_1 = require("./items.controller");
var items_service_1 = require("./item-suggestions.service");
var item_schema_1 = require("../schemas/item.schema");
var ItemSuggestionsModule = /** @class */ (function () {
    function ItemsModule() {
    }
    ItemsModule = __decorate([
        common_1.Module({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema }])],
            controllers: [items_controller_1.ItemsController],
            providers: [items_service_1.ItemSuggestionsService]
        })
    ], ItemsModule);
    return ItemsModule;
}());
exports.ItemsModule = ItemSuggestionsModule;
