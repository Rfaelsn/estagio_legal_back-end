"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TermCommitmentModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_module_1 = require("src/config/prisma/prisma.module");
var termCommitment_service_1 = require("./application/service/termCommitment.service");
var termCommitment_controller_1 = require("./adapter/http/rest/termCommitment.controller");
var termCommitment_repository_1 = require("./adapter/repository/termCommitment.repository");
var internship_process_history_module_1 = require("../internship-process-history/internship-process-history.module");
var file_module_1 = require("../file/file.module");
var intershipProcess_module_1 = require("../internshipProcess/intershipProcess.module");
var file_storage_module_1 = require("../file-storage/file-storage.module");
var generate_pdf_module_1 = require("../generate-pdf/generate-pdf.module");
var user_module_1 = require("../user/user.module");
var notification_module_1 = require("../notification/notification.module");
var TermCommitmentModule = /** @class */ (function () {
    function TermCommitmentModule() {
    }
    TermCommitmentModule = __decorate([
        common_1.Module({
            controllers: [termCommitment_controller_1.termCommitmentController],
            providers: [termCommitment_service_1.TermCommitmentService, termCommitment_repository_1.TermCommitmentRepository],
            imports: [
                prisma_module_1.PrismaModule,
                common_1.forwardRef(function () { return intershipProcess_module_1.InternshipProcessModule; }),
                internship_process_history_module_1.InternshipProcessHistoryModule,
                file_module_1.FileModule,
                file_storage_module_1.FileStorageModule,
                generate_pdf_module_1.GeneratePdfModule,
                user_module_1.UserModule,
                notification_module_1.NotificationModule,
            ],
            exports: [termCommitment_service_1.TermCommitmentService]
        })
    ], TermCommitmentModule);
    return TermCommitmentModule;
}());
exports.TermCommitmentModule = TermCommitmentModule;
