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
exports.InternshipProcessService = void 0;
var common_1 = require("@nestjs/common");
var internshipProcess_entity_1 = require("../../domain/entities/internshipProcess.entity");
var creatIntershipProcess_usecase_1 = require("../../domain/usecase/creatIntershipProcess.usecase");
var filterInternshipProcess_usecase_1 = require("../../domain/usecase/filterInternshipProcess.usecase");
var findByIdInternshipProcess_usecase_1 = require("../../domain/usecase/findByIdInternshipProcess.usecase");
var file_entity_1 = require("@/modules/file/domain/entities/file.entity");
var user_entity_1 = require("@/modules/user/domain/entities/user.entity");
var InternshipProcessService = /** @class */ (function () {
    function InternshipProcessService(internshipProcessRepository, fileService, notificationService, internshipProcessHistoryService, fileStorageService, prismaService) {
        this.internshipProcessRepository = internshipProcessRepository;
        this.fileService = fileService;
        this.notificationService = notificationService;
        this.internshipProcessHistoryService = internshipProcessHistoryService;
        this.fileStorageService = fileStorageService;
        this.prismaService = prismaService;
    }
    InternshipProcessService.prototype.registerEndInternshipProcess = function (registerEndInternshipProcessDto, file, user) {
        console.log('teste');
    };
    InternshipProcessService.prototype.create = function (idTermCommitment, idUser, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            var createInternshipProcessUseCase, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createInternshipProcessUseCase = new creatIntershipProcess_usecase_1.CreateInternshipProcessUseCase(this.internshipProcessRepository);
                        return [4 /*yield*/, createInternshipProcessUseCase.handle(idTermCommitment, idUser, prismaClientTransaction)];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessService.prototype.updateInternshipProcess = function (updateInternshipProcessStatusDTO, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internshipProcessRepository.updateInternshipProcess(updateInternshipProcessStatusDTO, prismaClientTransaction)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InternshipProcessService.prototype.filter = function (internshipProcessFilterDTO, userId, userRole) {
        return __awaiter(this, void 0, Promise, function () {
            var filterInternshipProcessUseCase, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filterInternshipProcessUseCase = new filterInternshipProcess_usecase_1.FilterInternshipProcessUseCase(this.internshipProcessRepository);
                        return [4 /*yield*/, filterInternshipProcessUseCase.handle(internshipProcessFilterDTO, userId, userRole)];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessService.prototype.findEligibleProcessesForCompletion = function (userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internshipProcessRepository.findEligibleProcessesForCompletion(userId, page, pageSize)];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessService.prototype.assignEndInternshipProcess = function (registerEndInternshipProcessDto, files, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isElegible, filePaths, _i, files_1, file, fileType, filePath, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (user.role !== user_entity_1.Role.EMPLOYEE &&
                            user.role !== user_entity_1.Role.ADMINISTRATOR &&
                            (registerEndInternshipProcessDto.validate ||
                                registerEndInternshipProcessDto.remark)) {
                            throw new Error('Apenas o funcionário ou administrador pode validar o processo de estágio.');
                        }
                        return [4 /*yield*/, this.isElegibleForCompletion(registerEndInternshipProcessDto.internshipProcessId, user.id)];
                    case 1:
                        isElegible = _a.sent();
                        if (!isElegible && user.role === user_entity_1.Role.STUDENT) {
                            throw new Error('O processo de estágio não está elegível para ser concluído. precisa estar no estágio de início de estágio concluído.');
                        }
                        filePaths = [];
                        if (!(files.length !== 0)) return [3 /*break*/, 5];
                        _i = 0, files_1 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 5];
                        file = files_1[_i];
                        fileType = this.getFileType(file.originalname);
                        return [4 /*yield*/, this.fileStorageService.uploadPdfFile(file.buffer, fileType)];
                    case 3:
                        filePath = _a.sent();
                        filePaths.push({
                            filePath: filePath,
                            fileType: fileType,
                            isAssigned: true
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.prismaService.$transaction(function (prismaClientTransaction) { return __awaiter(_this, void 0, void 0, function () {
                                var newHistory, updatedInternshipProcessStateData, internshipProcess, registeredFiles, newHistory, updatedInternshipProcessStateData, internshipProcess;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(filePaths.length === 0 &&
                                                !registerEndInternshipProcessDto.validate &&
                                                (user.role === user_entity_1.Role.EMPLOYEE || user.role === user_entity_1.Role.ADMINISTRATOR))) return [3 /*break*/, 6];
                                            newHistory = this.getNewInternshipProcessHistoryByUserRole(user.role, [], registerEndInternshipProcessDto);
                                            updatedInternshipProcessStateData = this.getNewInternshipProcessStateDataByUserRole(user.role, registerEndInternshipProcessDto);
                                            return [4 /*yield*/, this.updateInternshipProcess(updatedInternshipProcessStateData, prismaClientTransaction)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessHistoryService.updateLatestHistory({
                                                    endDate: new Date(),
                                                    idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId
                                                }, prismaClientTransaction)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessHistoryService.registerHistory(newHistory, prismaClientTransaction)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.findById(registerEndInternshipProcessDto.internshipProcessId, prismaClientTransaction)];
                                        case 4:
                                            internshipProcess = _a.sent();
                                            return [4 /*yield*/, this.sendNotificationByCurrentAssignHistory(internshipProcess.id_user, internshipProcess.id, user.role, updatedInternshipProcessStateData.status, updatedInternshipProcessStateData.movement)];
                                        case 5:
                                            _a.sent();
                                            return [3 /*break*/, 13];
                                        case 6: return [4 /*yield*/, this.fileService.registerFilePathsProcess(filePaths, prismaClientTransaction)];
                                        case 7:
                                            registeredFiles = _a.sent();
                                            newHistory = this.getNewInternshipProcessHistoryByUserRole(user.role, registeredFiles, registerEndInternshipProcessDto);
                                            updatedInternshipProcessStateData = this.getNewInternshipProcessStateDataByUserRole(user.role, registerEndInternshipProcessDto);
                                            return [4 /*yield*/, this.updateInternshipProcess(updatedInternshipProcessStateData, prismaClientTransaction)];
                                        case 8:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessHistoryService.updateLatestHistory({
                                                    endDate: new Date(),
                                                    idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId
                                                }, prismaClientTransaction)];
                                        case 9:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessHistoryService.registerHistory(newHistory, prismaClientTransaction)];
                                        case 10:
                                            _a.sent();
                                            return [4 /*yield*/, this.findById(registerEndInternshipProcessDto.internshipProcessId, prismaClientTransaction)];
                                        case 11:
                                            internshipProcess = _a.sent();
                                            return [4 /*yield*/, this.sendNotificationByCurrentAssignHistory(internshipProcess.id_user, internshipProcess.id, user.role, updatedInternshipProcessStateData.status, updatedInternshipProcessStateData.movement)];
                                        case 12:
                                            _a.sent();
                                            _a.label = 13;
                                        case 13: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        if (filePaths.length > 0) {
                            filePaths.forEach(function (filePath) {
                                _this.fileStorageService.deletePdfFile(filePath.filePath);
                            });
                        }
                        console.error('Erro ao deletar arquivo:', error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    InternshipProcessService.prototype.sendNotificationByCurrentAssignHistory = function (userId, internshipProcessId, userRole, currentStatus, currentMovement) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(userRole === user_entity_1.Role.STUDENT &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_END)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.notificationService.sendNotificationToEmployees('Nova solicitação de finalização de estágio.', internshipProcessId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!((userRole === user_entity_1.Role.ADMINISTRATOR || userRole === user_entity_1.Role.EMPLOYEE) &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.COMPLETED &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_END)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.notificationService.sendNotificationToStudent(userId, 'Atestado de Estágio emitido.', internshipProcessId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!((userRole === user_entity_1.Role.ADMINISTRATOR || userRole === user_entity_1.Role.EMPLOYEE) &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.REJECTED &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_END)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.notificationService.sendNotificationToStudent(userId, 'Solicitação de finalização de estágio recusada.', internshipProcessId)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    InternshipProcessService.prototype.getNewInternshipProcessHistoryByUserRole = function (userRole, registeredFiles, registerEndInternshipProcessDto) {
        if (userRole === user_entity_1.Role.STUDENT) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END,
                status: internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW,
                idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId,
                fileIds: registeredFiles.map(function (file) { return file.id; })
            };
        }
        else if (registerEndInternshipProcessDto.validate &&
            (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR)) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END,
                status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                endDate: new Date(),
                idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId,
                fileIds: registeredFiles.map(function (file) { return file.id; })
            };
        }
        else if (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END,
                status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                idInternshipProcess: registerEndInternshipProcessDto.internshipProcessId,
                observations: registerEndInternshipProcessDto.remark
            };
        }
    };
    InternshipProcessService.prototype.getNewInternshipProcessStateDataByUserRole = function (userRole, registerEndInternshipProcessDto) {
        if (userRole === user_entity_1.Role.STUDENT) {
            return {
                id: registerEndInternshipProcessDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END
            };
        }
        else if (registerEndInternshipProcessDto.validate &&
            (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR)) {
            return {
                id: registerEndInternshipProcessDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END
            };
        }
        else if (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR) {
            return {
                id: registerEndInternshipProcessDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END
            };
        }
    };
    InternshipProcessService.prototype.getFileType = function (fileName) {
        if (fileName === 'AutoAvaliacaoEstagiario.pdf') {
            return file_entity_1.FileType.STUDENT_SELF_EVALUATION;
        }
        else if (fileName === 'AvaliacaoConcedente.pdf') {
            return file_entity_1.FileType.INTERNSHIP_GRANTOR_EVALUATION;
        }
        else if (fileName === 'AvaliacaoProfessorOrientador.pdf') {
            return file_entity_1.FileType.SUPERVISOR_EVALUATION;
        }
        else if (fileName === 'CertificadoConclusaoEstagio.pdf') {
            return file_entity_1.FileType.INTERNSHIP_CERTIFICATE;
        }
        else {
            console.log(fileName);
            throw new Error("Tipo de arquivo desconhecido " + fileName);
        }
    };
    InternshipProcessService.prototype.isElegibleForCompletion = function (internshipProcessId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internshipProcessRepository.isElegibleForCompletion(internshipProcessId, userId)];
            });
        });
    };
    InternshipProcessService.prototype.validateAssignEndInternshipProcess = function (validateAssignEndInternshipProcessDto) {
        return __awaiter(this, void 0, void 0, function () {
            var formatFilePaths, registeredFiles, newHistory, newHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(validateAssignEndInternshipProcessDto.validate &&
                            validateAssignEndInternshipProcessDto.internshipCertificateFilePath)) return [3 /*break*/, 2];
                        formatFilePaths = validateAssignEndInternshipProcessDto.internshipCertificateFilePath;
                        return [4 /*yield*/, this.fileService.registerFilePathProcess(formatFilePaths)];
                    case 1:
                        registeredFiles = _a.sent();
                        this.updateInternshipProcess({
                            id: validateAssignEndInternshipProcessDto.internshipProcessId,
                            status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                            movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END
                        });
                        newHistory = {
                            movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END,
                            status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                            idInternshipProcess: validateAssignEndInternshipProcessDto.internshipProcessId,
                            fileIds: [registeredFiles.id]
                        };
                        //ajustar para determinar a data apenas da ultima movimentação
                        this.internshipProcessHistoryService.updateLatestHistory({
                            endDate: new Date(),
                            idInternshipProcess: validateAssignEndInternshipProcessDto.internshipProcessId
                        });
                        this.internshipProcessHistoryService.registerHistory(newHistory);
                        return [3 /*break*/, 3];
                    case 2:
                        this.updateInternshipProcess({
                            id: validateAssignEndInternshipProcessDto.internshipProcessId,
                            status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                            movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END
                        });
                        this.internshipProcessHistoryService.updateLatestHistory({
                            endDate: new Date(),
                            idInternshipProcess: validateAssignEndInternshipProcessDto.internshipProcessId
                        });
                        newHistory = {
                            movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_END,
                            status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                            idInternshipProcess: validateAssignEndInternshipProcessDto.internshipProcessId,
                            observations: validateAssignEndInternshipProcessDto.remark
                        };
                        this.internshipProcessHistoryService.registerHistory(newHistory);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InternshipProcessService.prototype.findById = function (id, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            var filterInternshipProcessUsecase, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filterInternshipProcessUsecase = new findByIdInternshipProcess_usecase_1.FindInternshipProcessByIdUsecase(this.internshipProcessRepository);
                        return [4 /*yield*/, filterInternshipProcessUsecase.handle(id, prismaClientTransaction)];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    __decorate([
        common_1.HttpCode(200)
    ], InternshipProcessService.prototype, "filter");
    InternshipProcessService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject('InternshipProcessRepository')),
        __param(1, common_1.Inject('FileService')),
        __param(2, common_1.Inject('NotificationService')),
        __param(3, common_1.Inject('InternshipProcessHistoryService')),
        __param(4, common_1.Inject('FileStorageService')),
        __param(5, common_1.Inject('PrismaService'))
    ], InternshipProcessService);
    return InternshipProcessService;
}());
exports.InternshipProcessService = InternshipProcessService;
