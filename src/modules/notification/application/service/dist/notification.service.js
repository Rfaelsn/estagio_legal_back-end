"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var websockets_1 = require("@nestjs/websockets");
var createNotification_usecase_1 = require("../../domain/usecase/createNotification.usecase");
var findLatestNotificationsByUserId_usecase_1 = require("../../domain/usecase/findLatestNotificationsByUserId.usecase");
var setReadNotification_usecase_1 = require("../../domain/usecase/setReadNotification.usecase");
var user_entity_1 = require("@/modules/user/domain/entities/user.entity");
var NotificationService = /** @class */ (function () {
    function NotificationService(notificationRepository, userService) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.userSocketMap = new Map();
    }
    NotificationService.prototype.setServer = function (server) {
        this.server = server;
    };
    NotificationService.prototype.handleDisconnect = function (client) {
        console.log("Cliente desconectado: " + client.id);
        for (var _i = 0, _a = this.userSocketMap.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], userId = _b[0], socketId = _b[1];
            if (socketId === client.id) {
                this.userSocketMap["delete"](userId);
                break;
            }
        }
    };
    NotificationService.prototype.handleRegister = function (client, userId) {
        this.userSocketMap.set(userId, client.id);
        console.log("Usu\u00E1rio " + userId + " registrado com socket " + client.id);
    };
    NotificationService.prototype.sendNotificationToStudent = function (userId, message, internshipProcessId) {
        return __awaiter(this, void 0, void 0, function () {
            var socketId, notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socketId = this.userSocketMap.get(userId);
                        return [4 /*yield*/, this.saveNotificationToDatabase(userId, message, internshipProcessId)];
                    case 1:
                        notification = _a.sent();
                        if (socketId) {
                            this.server.to(socketId).emit('notification', notification);
                            console.log("Notifica\u00E7\u00E3o enviada para o usu\u00E1rio " + userId + " via WebSocket");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.sendNotificationToEmployees = function (message, internshipProcessId) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, employees, _i, employees_1, employee, socketId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveNotificationToEmployeeDatabase(message, internshipProcessId)];
                    case 1:
                        notification = _a.sent();
                        return [4 /*yield*/, this.userService.getUsersByRole(user_entity_1.Role.ADMINISTRATOR)];
                    case 2:
                        employees = _a.sent();
                        for (_i = 0, employees_1 = employees; _i < employees_1.length; _i++) {
                            employee = employees_1[_i];
                            socketId = this.userSocketMap.get(employee.id);
                            if (socketId) {
                                this.server.to(socketId).emit('notification', notification);
                                console.log("Notifica\u00E7\u00E3o enviada para o funcion\u00E1rio " + employee.id + " via WebSocket");
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.saveNotificationToDatabase = function (userId, message, internshipProcessId) {
        return __awaiter(this, void 0, void 0, function () {
            var createNotificationUsecase, notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createNotificationUsecase = new createNotification_usecase_1.CreateNotificationUsecase(this.notificationRepository);
                        return [4 /*yield*/, createNotificationUsecase.handle({
                                idUser: userId,
                                message: message,
                                userRole: user_entity_1.Role.STUDENT,
                                internshipProcessId: internshipProcessId
                            })];
                    case 1:
                        notification = _a.sent();
                        return [2 /*return*/, notification];
                }
            });
        });
    };
    NotificationService.prototype.saveNotificationToEmployeeDatabase = function (message, internshipProcessId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationRepository.create({
                        userRole: user_entity_1.Role.EMPLOYEE,
                        message: message,
                        internshipProcessId: internshipProcessId
                    })];
            });
        });
    };
    NotificationService.prototype.getNotificationToEmployees = function (page, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationRepository.findNotificationsByRole(user_entity_1.Role.EMPLOYEE, page, pageSize)];
            });
        });
    };
    NotificationService.prototype.findLatestNotificationsByUserId = function (findLatestNotificationsByUserIdDTO, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var findLatestNotificationsByUserIdUsecase, notifications;
            return __generator(this, function (_a) {
                findLatestNotificationsByUserIdUsecase = new findLatestNotificationsByUserId_usecase_1.FindLatestNotificationsByUserIdUsecase(this.notificationRepository);
                notifications = findLatestNotificationsByUserIdUsecase.handle(findLatestNotificationsByUserIdDTO, userId);
                return [2 /*return*/, notifications];
            });
        });
    };
    NotificationService.prototype.setReadNotification = function (notificationId) {
        return __awaiter(this, void 0, Promise, function () {
            var setReadNotificationUsecase;
            return __generator(this, function (_a) {
                setReadNotificationUsecase = new setReadNotification_usecase_1.SetReadNotificationUsecase(this.notificationRepository);
                setReadNotificationUsecase.handle(notificationId);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], NotificationService.prototype, "server");
    NotificationService = __decorate([
        common_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
