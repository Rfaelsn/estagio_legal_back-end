"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var roles_decorator_1 = require("src/auth/decorators/roles.decorator");
var user_entity_1 = require("../../../domain/entities/user.entity");
var common_1 = require("@nestjs/common");
var is_public_decorator_1 = require("src/auth/decorators/is-public.decorator");
var user_decorator_1 = require("@/auth/decorators/user.decorator");
var client_1 = require("@prisma/client");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.createStudent = function (createStudentDTO) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var error_1, target;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.create(createStudentDTO)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_1 = _b.sent();
                        if (error_1 instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                            error_1.code === 'P2002') {
                            target = (_a = error_1.meta) === null || _a === void 0 ? void 0 : _a.target;
                            if (target === null || target === void 0 ? void 0 : target.includes('email')) {
                                throw new common_1.ConflictException('E-mail já cadastrado.');
                            }
                            if (target === null || target === void 0 ? void 0 : target.includes('cpf')) {
                                throw new common_1.ConflictException('CPF já cadastrado.');
                            }
                            throw new common_1.ConflictException('Já existe um registro com esses dados.');
                        }
                        throw new common_1.InternalServerErrorException('Erro ao criar estudante.');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.findByEmail(email)];
            });
        });
    };
    UserController.prototype.showUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, req.user];
            });
        });
    };
    UserController.prototype.getUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.findByEmail(user.email)];
            });
        });
    };
    UserController.prototype.findUser = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    UserController.prototype.updateStudent = function (user) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    UserController.prototype.deleteAluno = function (user) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    UserController.prototype.createEmployee = function (user) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    __decorate([
        is_public_decorator_1.IsPublic(),
        common_1.Post('student'),
        __param(0, common_1.Body())
    ], UserController.prototype, "createStudent");
    __decorate([
        common_1.Get('findByEmail'),
        __param(0, common_1.Query('email'))
    ], UserController.prototype, "findByEmail");
    __decorate([
        common_1.Get('me'),
        __param(0, common_1.Request())
    ], UserController.prototype, "showUser");
    __decorate([
        common_1.Get('profile'),
        __param(0, user_decorator_1.User())
    ], UserController.prototype, "getUser");
    __decorate([
        common_1.Get(':id')
    ], UserController.prototype, "findUser");
    __decorate([
        roles_decorator_1.Roles(user_entity_1.Role.STUDENT),
        common_1.Put('student:id')
    ], UserController.prototype, "updateStudent");
    __decorate([
        common_1.Delete('student:id')
    ], UserController.prototype, "deleteAluno");
    __decorate([
        common_1.Post('employee'),
        roles_decorator_1.Roles(user_entity_1.Role.ADMINISTRATOR)
    ], UserController.prototype, "createEmployee");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
