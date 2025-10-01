"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateStudentDTO = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var isCpf_decorator_1 = require("src/shared/decorators/isCpf.decorator");
var CreateStudentDTO = /** @class */ (function () {
    function CreateStudentDTO() {
    }
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "name");
    __decorate([
        isCpf_decorator_1.IsCPF()
    ], CreateStudentDTO.prototype, "cpf");
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "rg");
    __decorate([
        class_validator_1.IsDate(),
        class_transformer_1.Transform(function (_a) {
            var value = _a.value;
            return new Date(value);
        }),
        class_validator_1.IsNotEmpty()
    ], CreateStudentDTO.prototype, "birthDate");
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "academicRegistrationCode");
    __decorate([
        class_validator_1.IsEmail()
    ], CreateStudentDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "telephone");
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "courseStudy");
    __decorate([
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "password");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "UF");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "city");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "district");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "address");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateStudentDTO.prototype, "postalCode");
    return CreateStudentDTO;
}());
exports.CreateStudentDTO = CreateStudentDTO;
