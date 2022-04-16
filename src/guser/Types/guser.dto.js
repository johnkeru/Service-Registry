"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FTGusersResponse = exports.FTMeResponse = exports.GuserDTO = void 0;
var graphql_1 = require("@nestjs/graphql");
var GuserDTO = /** @class */ (function () {
    function GuserDTO() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], GuserDTO.prototype, "id");
    __decorate([
        (0, graphql_1.Field)()
    ], GuserDTO.prototype, "email");
    __decorate([
        (0, graphql_1.Field)()
    ], GuserDTO.prototype, "username");
    __decorate([
        (0, graphql_1.Field)({ defaultValue: false })
    ], GuserDTO.prototype, "active");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], GuserDTO.prototype, "image");
    __decorate([
        (0, graphql_1.Field)()
    ], GuserDTO.prototype, "created_at");
    __decorate([
        (0, graphql_1.Field)()
    ], GuserDTO.prototype, "updated_at");
    GuserDTO = __decorate([
        (0, graphql_1.ObjectType)()
    ], GuserDTO);
    return GuserDTO;
}());
exports.GuserDTO = GuserDTO;
var FTMeResponse = /** @class */ (function () {
    function FTMeResponse() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return GuserDTO; }, { nullable: true })
    ], FTMeResponse.prototype, "guser");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], FTMeResponse.prototype, "fault_tolerance");
    FTMeResponse = __decorate([
        (0, graphql_1.ObjectType)()
    ], FTMeResponse);
    return FTMeResponse;
}());
exports.FTMeResponse = FTMeResponse;
var FTGusersResponse = /** @class */ (function () {
    function FTGusersResponse() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return [GuserDTO]; }, { nullable: true })
    ], FTGusersResponse.prototype, "gusers");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], FTGusersResponse.prototype, "fault_tolerance");
    FTGusersResponse = __decorate([
        (0, graphql_1.ObjectType)()
    ], FTGusersResponse);
    return FTGusersResponse;
}());
exports.FTGusersResponse = FTGusersResponse;
