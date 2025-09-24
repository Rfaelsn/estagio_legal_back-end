"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.TermCommitmentService = void 0;
var common_1 = require("@nestjs/common");
var file_entity_1 = require("@/modules/file/domain/entities/file.entity");
var internshipProcess_entity_1 = require("@/modules/internshipProcess/domain/entities/internshipProcess.entity");
var internshipProcess_service_1 = require("@/modules/internshipProcess/application/service/internshipProcess.service");
var createTermCommitment_usecase_1 = require("../../domain/usecase/createTermCommitment.usecase");
var user_entity_1 = require("@/modules/user/domain/entities/user.entity");
var TermCommitmentService = /** @class */ (function () {
    function TermCommitmentService(termCommitmentRepository, internshipProcessService, internshipProcessHistoryService, fileService, generatePdfService, fileStorageService, prismaService, userService, notificationService) {
        this.termCommitmentRepository = termCommitmentRepository;
        this.internshipProcessService = internshipProcessService;
        this.internshipProcessHistoryService = internshipProcessHistoryService;
        this.fileService = fileService;
        this.generatePdfService = generatePdfService;
        this.fileStorageService = fileStorageService;
        this.prismaService = prismaService;
        this.userService = userService;
        this.notificationService = notificationService;
    }
    TermCommitmentService.prototype.create = function (createTermCommitmentDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, pdf, _a, result, error_1, deleteError_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 10]);
                        return [4 /*yield*/, this.userService.getUserById(createTermCommitmentDTO.id_user)];
                    case 1:
                        userData = _b.sent();
                        return [4 /*yield*/, this.generatePdfService.createTermCommitmentPdf(__assign(__assign({}, createTermCommitmentDTO), { user: __assign({}, userData), institution: __assign({}, userData.institution) }))];
                    case 2:
                        pdf = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.fileStorageService.uploadPdfFile(pdf, file_entity_1.FileType.TERM_COMMITMENT)];
                    case 3:
                        _a.termCommitmentFileId = _b.sent();
                        return [4 /*yield*/, this.prismaService.$transaction(function (prismaClientTransaction) { return __awaiter(_this, void 0, void 0, function () {
                                var createTermCommitmentUseCase, termCommitment, id, termCommitmentEntityFileId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            createTermCommitmentUseCase = new createTermCommitment_usecase_1.CreateTermCommitmentUseCase(this.termCommitmentRepository);
                                            return [4 /*yield*/, createTermCommitmentUseCase.handle(createTermCommitmentDTO, prismaClientTransaction)];
                                        case 1:
                                            termCommitment = _a.sent();
                                            return [4 /*yield*/, this.internshipProcessService.create(termCommitment.id, termCommitment.id_user, prismaClientTransaction)];
                                        case 2:
                                            id = (_a.sent()).id;
                                            return [4 /*yield*/, this.fileService.registerFilePathProcess({
                                                    filePath: this.termCommitmentFileId,
                                                    fileType: file_entity_1.FileType.TERM_COMMITMENT
                                                })];
                                        case 3:
                                            termCommitmentEntityFileId = (_a.sent()).id;
                                            return [4 /*yield*/, this.internshipProcessHistoryService.registerHistoryWithFile({
                                                    status: internshipProcess_entity_1.InternshipProcessStatus.IN_PROGRESS,
                                                    movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                                                    description: 'processo iniciado pelo aluno',
                                                    idInternshipProcess: id,
                                                    files: [
                                                        {
                                                            fileId: termCommitmentEntityFileId
                                                        },
                                                    ]
                                                }, prismaClientTransaction)];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/, { id: id, termCommitment: termCommitment, termCommitmentEntityFileId: termCommitmentEntityFileId }];
                                    }
                                });
                            }); })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, {
                                termFilePathId: result.termCommitmentEntityFileId,
                                internshipProcessId: result.id
                            }];
                    case 5:
                        error_1 = _b.sent();
                        if (!this.termCommitmentFileId) return [3 /*break*/, 9];
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.fileStorageService.deletePdfFile(this.termCommitmentFileId)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        deleteError_1 = _b.sent();
                        console.error('Erro ao deletar arquivo:', deleteError_1);
                        return [3 /*break*/, 9];
                    case 9: throw error_1;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TermCommitmentService.prototype.assign = function (validateAssignTermDto, file, user) {
        return __awaiter(this, void 0, Promise, function () {
            var termCommitmentFilePathId, error_2, deleteError_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        termCommitmentFilePathId = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 10]);
                        if (!(file === null || file === void 0 ? void 0 : file.buffer)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileStorageService.uploadPdfFile(file.buffer, file_entity_1.FileType.TERM_COMMITMENT)];
                    case 2:
                        termCommitmentFilePathId = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.prismaService.$transaction(function (prismaClientTransaction) { return __awaiter(_this, void 0, void 0, function () {
                            var termCommitmentEntityFileId, id, newHistory, updatedInternshipProcessStateData, internshipProcess;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(file === null || file === void 0 ? void 0 : file.buffer)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.fileService.registerFilePathProcess({
                                                filePath: termCommitmentFilePathId,
                                                fileType: file_entity_1.FileType.TERM_COMMITMENT,
                                                isAssigned: true
                                            }, prismaClientTransaction)];
                                    case 1:
                                        id = (_a.sent()).id;
                                        termCommitmentEntityFileId = id;
                                        _a.label = 2;
                                    case 2:
                                        newHistory = this.getNewInternshipProcessHistoryByUserRole(user.role, validateAssignTermDto, termCommitmentEntityFileId);
                                        updatedInternshipProcessStateData = this.getNewInternshipProcessStateDataByUserRole(user.role, validateAssignTermDto);
                                        return [4 /*yield*/, this.internshipProcessService.updateInternshipProcess(updatedInternshipProcessStateData, prismaClientTransaction)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, this.internshipProcessHistoryService.updateLatestHistory({
                                                endDate: new Date(),
                                                idInternshipProcess: validateAssignTermDto.internshipProcessId
                                            }, prismaClientTransaction)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, this.internshipProcessHistoryService.registerHistory(newHistory, prismaClientTransaction)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, this.internshipProcessService.findById(validateAssignTermDto.internshipProcessId, prismaClientTransaction)];
                                    case 6:
                                        internshipProcess = _a.sent();
                                        //o id do usuario tem que ser o id do aluno
                                        return [4 /*yield*/, this.sendNotificationByTermStatus(internshipProcess.id_user, internshipProcess.id, user.role, updatedInternshipProcessStateData.status, updatedInternshipProcessStateData.movement)];
                                    case 7:
                                        //o id do usuario tem que ser o id do aluno
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        error_2 = _a.sent();
                        if (!termCommitmentFilePathId) return [3 /*break*/, 9];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.fileStorageService.deletePdfFile(termCommitmentFilePathId)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        deleteError_2 = _a.sent();
                        console.error('Erro ao deletar arquivo:', deleteError_2);
                        return [3 /*break*/, 9];
                    case 9: throw error_2;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TermCommitmentService.prototype.sendNotificationByTermStatus = function (userId, internshipProcessId, userRole, currentStatus, currentMovement) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(userRole === user_entity_1.Role.STUDENT &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_START)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.notificationService.sendNotificationToEmployees('Novo termo de compromisso enviado para análise.', internshipProcessId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!((userRole === user_entity_1.Role.ADMINISTRATOR || userRole === user_entity_1.Role.EMPLOYEE) &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.COMPLETED &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_START)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.notificationService.sendNotificationToStudent(userId, 'Seu termo de compromisso foi aprovado.', internshipProcessId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!((userRole === user_entity_1.Role.ADMINISTRATOR || userRole === user_entity_1.Role.EMPLOYEE) &&
                            currentStatus === internshipProcess_entity_1.InternshipProcessStatus.REJECTED &&
                            currentMovement === internshipProcess_entity_1.InternshipProcessMovement.STAGE_START)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.notificationService.sendNotificationToStudent(userId, 'Termo de compromisso recusado.', internshipProcessId)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TermCommitmentService.prototype.getNewInternshipProcessHistoryByUserRole = function (userRole, validateAssignTermDto, registeredFileId) {
        if (userRole === user_entity_1.Role.STUDENT) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                status: internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW,
                idInternshipProcess: validateAssignTermDto.internshipProcessId,
                fileIds: [registeredFileId]
            };
        }
        else if (validateAssignTermDto.validate &&
            (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR)) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                endDate: new Date(),
                idInternshipProcess: validateAssignTermDto.internshipProcessId,
                fileIds: [registeredFileId]
            };
        }
        else if (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR) {
            return {
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                idInternshipProcess: validateAssignTermDto.internshipProcessId,
                observations: validateAssignTermDto.remark
            };
        }
    };
    TermCommitmentService.prototype.getNewInternshipProcessStateDataByUserRole = function (userRole, validateAssignTermDto) {
        if (userRole === user_entity_1.Role.STUDENT) {
            return {
                id: validateAssignTermDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.UNDER_REVIEW,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START
            };
        }
        else if (validateAssignTermDto.validate &&
            (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR)) {
            return {
                id: validateAssignTermDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START
            };
        }
        else if (userRole === user_entity_1.Role.EMPLOYEE || userRole === user_entity_1.Role.ADMINISTRATOR) {
            return {
                id: validateAssignTermDto.internshipProcessId,
                status: internshipProcess_entity_1.InternshipProcessStatus.REJECTED,
                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START
            };
        }
    };
    TermCommitmentService.prototype.linkDocumentToTermCommitment = function (linkTermCommitmentFilePathDTO) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.termCommitmentRepository.linkDocumentToTermCommitment(linkTermCommitmentFilePathDTO)];
            });
        });
    };
    TermCommitmentService.prototype.updateTermInfo = function (internshipProcessId, idUser, updateTermInfoDto) {
        return __awaiter(this, void 0, Promise, function () {
            var userData, pdf, _a, error_3, deleteError_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 10]);
                        return [4 /*yield*/, this.userService.getUserById(idUser)];
                    case 1:
                        userData = _b.sent();
                        return [4 /*yield*/, this.generatePdfService.createTermCommitmentPdf(__assign(__assign({}, updateTermInfoDto), { user: __assign({}, userData), institution: __assign({}, userData.institution) }))];
                    case 2:
                        pdf = _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.fileStorageService.uploadPdfFile(pdf, file_entity_1.FileType.TERM_COMMITMENT)];
                    case 3:
                        _a.termCommitmentFileId = _b.sent();
                        return [4 /*yield*/, this.prismaService.$transaction(function (prismaClientTransaction) { return __awaiter(_this, void 0, void 0, function () {
                                var termCommitmentEntityFileId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.fileService.registerFilePathProcess({
                                                filePath: this.termCommitmentFileId,
                                                fileType: file_entity_1.FileType.TERM_COMMITMENT
                                            })];
                                        case 1:
                                            termCommitmentEntityFileId = (_a.sent()).id;
                                            return [4 /*yield*/, this.internshipProcessHistoryService.registerHistoryWithFile({
                                                    status: internshipProcess_entity_1.InternshipProcessStatus.IN_PROGRESS,
                                                    movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                                                    description: 'atualizado pelo aluno',
                                                    idInternshipProcess: internshipProcessId,
                                                    files: [
                                                        {
                                                            fileId: termCommitmentEntityFileId
                                                        },
                                                    ]
                                                }, prismaClientTransaction)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessService.updateInternshipProcess({
                                                    id: internshipProcessId,
                                                    status: internshipProcess_entity_1.InternshipProcessStatus.IN_PROGRESS,
                                                    movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START
                                                }, prismaClientTransaction)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.internshipProcessHistoryService.updateLatestHistory({
                                                    endDate: new Date(),
                                                    idInternshipProcess: internshipProcessId
                                                }, prismaClientTransaction)];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, this.termCommitmentRepository.update(internshipProcessId, updateTermInfoDto, prismaClientTransaction)];
                                        case 5:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        error_3 = _b.sent();
                        if (!this.termCommitmentFileId) return [3 /*break*/, 9];
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.fileStorageService.deletePdfFile(this.termCommitmentFileId)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        deleteError_3 = _b.sent();
                        console.error('Erro ao deletar arquivo:', deleteError_3);
                        return [3 /*break*/, 9];
                    case 9: throw error_3;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TermCommitmentService.prototype.isValidWeeklyWorkloadLimit = function (idUser, newWeeklyWorkload, startDateNewInternship, endDateNewInternship) {
        return __awaiter(this, void 0, Promise, function () {
            var userTerms, totWeeklyWorkloadInInterval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.termCommitmentRepository.findTermsUserInIntervalDates(idUser, startDateNewInternship, endDateNewInternship)];
                    case 1:
                        userTerms = _a.sent();
                        totWeeklyWorkloadInInterval = userTerms.reduce(function (totWeeklyWorkloadInterval, term) {
                            return totWeeklyWorkloadInterval + term.weeklyWorkload;
                        }, 0);
                        return [2 /*return*/, totWeeklyWorkloadInInterval + newWeeklyWorkload <= 30];
                }
            });
        });
    };
    TermCommitmentService = __decorate([
        common_1.Injectable(),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return internshipProcess_service_1.InternshipProcessService; })))
    ], TermCommitmentService);
    return TermCommitmentService;
}());
exports.TermCommitmentService = TermCommitmentService;
