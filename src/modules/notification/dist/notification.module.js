"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationModule = void 0;
var common_1 = require("@nestjs/common");
var notification_gateway_1 = require("./adapter/gateways/notification.gateway");
var notification_service_1 = require("./application/service/notification.service");
var notification_repository_1 = require("./adapter/repository/notification.repository");
var prisma_module_1 = require("src/config/prisma/prisma.module");
var notification_controller_1 = require("./adapter/http/rest/notification.controller");
var user_module_1 = require("../user/user.module");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        common_1.Module({
            controllers: [notification_controller_1.NotificationController],
            providers: [
                notification_gateway_1.NotificationGateway,
                notification_service_1.NotificationService,
                notification_repository_1.NotificationsRepository,
            ],
            imports: [prisma_module_1.PrismaModule, user_module_1.UserModule],
            exports: [notification_service_1.NotificationService, notification_gateway_1.NotificationGateway]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
