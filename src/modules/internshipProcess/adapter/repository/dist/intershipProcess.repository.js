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
exports.InternshipProcessRepository = void 0;
var common_1 = require("@nestjs/common");
var internshipProcess_entity_1 = require("../../domain/entities/internshipProcess.entity");
var InternshipProcessRepository = /** @class */ (function () {
    function InternshipProcessRepository(prisma) {
        this.prisma = prisma;
    }
    InternshipProcessRepository.prototype.create = function (createInternshipProcessDTO, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            var prisma, newInternshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = prismaClientTransaction || this.prisma;
                        return [4 /*yield*/, prisma.internshipProcess.create({
                                data: {
                                    movement: createInternshipProcessDTO.movement,
                                    status: createInternshipProcessDTO.status,
                                    startDateProcess: new Date(),
                                    id_user: createInternshipProcessDTO.id_user,
                                    id_termCommitment: createInternshipProcessDTO.id_termCommitment
                                },
                                include: {
                                    termCommitment: true,
                                    statusHistory: true
                                }
                            })];
                    case 1:
                        newInternshipProcess = _a.sent();
                        return [2 /*return*/, newInternshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.updateInternshipProcess = function (updateInternshipProcessStatusDTO, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            var prisma, prismaData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = prismaClientTransaction || this.prisma;
                        if (updateInternshipProcessStatusDTO.status === 'CONCLUÍDO') {
                            prismaData = {
                                status: updateInternshipProcessStatusDTO.status,
                                movement: updateInternshipProcessStatusDTO.movement,
                                endDateProcess: new Date()
                            };
                        }
                        else {
                            prismaData = {
                                status: updateInternshipProcessStatusDTO.status,
                                movement: updateInternshipProcessStatusDTO.movement
                            };
                        }
                        return [4 /*yield*/, prisma.internshipProcess.update({
                                where: { id: updateInternshipProcessStatusDTO.id },
                                data: prismaData
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.filter = function (internshipProcessFilterDTO) {
        return __awaiter(this, void 0, Promise, function () {
            var page, perPage, where, take, skip, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = internshipProcessFilterDTO.page, perPage = internshipProcessFilterDTO.perPage;
                        where = this.constructFilterWhere(internshipProcessFilterDTO);
                        take = perPage || 10;
                        skip = page ? (page - 1) * take : 0;
                        return [4 /*yield*/, this.prisma.internshipProcess.findMany({
                                where: where,
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                include: {
                                    user: true,
                                    termCommitment: true
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.filterByStudent = function (internshipProcessFilterByStudentDto, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var page, perPage, where, take, skip, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = internshipProcessFilterByStudentDto.page, perPage = internshipProcessFilterByStudentDto.perPage;
                        where = this.constructFilterWhere(internshipProcessFilterByStudentDto, userId);
                        take = perPage || 10;
                        skip = page ? (page - 1) * take : 0;
                        return [4 /*yield*/, this.prisma.internshipProcess.findMany({
                                where: where,
                                include: {
                                    user: true,
                                    termCommitment: true
                                },
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.findEligibleProcessesForCompletion = function (userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var take, skip, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        take = pageSize || 10;
                        skip = page ? (page - 1) * take : 0;
                        return [4 /*yield*/, this.prisma.internshipProcess.findMany({
                                where: {
                                    user: { id: userId },
                                    movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                                    status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED
                                },
                                include: {
                                    user: true,
                                    termCommitment: true
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.isElegibleForCompletion = function (internshipProcessId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.internshipProcess.findFirst({
                            where: {
                                id: internshipProcessId,
                                user: { id: userId },
                                movement: internshipProcess_entity_1.InternshipProcessMovement.STAGE_START,
                                status: internshipProcess_entity_1.InternshipProcessStatus.COMPLETED
                            }
                        })];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, !!internshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.findById = function (id, prismaClientTransaction) {
        return __awaiter(this, void 0, Promise, function () {
            var prisma, internshipProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = prismaClientTransaction || this.prisma;
                        return [4 /*yield*/, prisma.internshipProcess.findFirst({
                                where: {
                                    id: id
                                },
                                include: {
                                    user: true,
                                    termCommitment: true,
                                    statusHistory: {
                                        include: {
                                            files: true
                                        }
                                    }
                                }
                            })];
                    case 1:
                        internshipProcess = _a.sent();
                        return [2 /*return*/, internshipProcess];
                }
            });
        });
    };
    InternshipProcessRepository.prototype.constructFilterWhere = function (internshipProcessFilterByStudentDto, userId) {
        var termCommitment = internshipProcessFilterByStudentDto.termCommitment, user = internshipProcessFilterByStudentDto.user, movement = internshipProcessFilterByStudentDto.movement, status = internshipProcessFilterByStudentDto.status, startDateProcessRangeStart = internshipProcessFilterByStudentDto.startDateProcessRangeStart, startDateProcessRangeEnd = internshipProcessFilterByStudentDto.startDateProcessRangeEnd, endDateProcessRangeStart = internshipProcessFilterByStudentDto.endDateProcessRangeStart, endDateProcessRangeEnd = internshipProcessFilterByStudentDto.endDateProcessRangeEnd, internshipGrantor = internshipProcessFilterByStudentDto.internshipGrantor;
        var where = {};
        if (startDateProcessRangeStart != null ||
            startDateProcessRangeEnd != null) {
            where.startDateProcess = __assign(__assign({}, (startDateProcessRangeStart != null && {
                gte: new Date(startDateProcessRangeStart)
            })), (startDateProcessRangeEnd != null && {
                lte: new Date(startDateProcessRangeEnd)
            }));
        }
        if (endDateProcessRangeStart != null || endDateProcessRangeEnd != null) {
            where.endDateProcess = __assign(__assign({}, (endDateProcessRangeStart != null && {
                gte: new Date(endDateProcessRangeStart)
            })), (endDateProcessRangeEnd != null && {
                lte: new Date(endDateProcessRangeEnd)
            }));
        }
        if (movement != null) {
            where.movement = movement;
        }
        if (status != null) {
            where.status = status;
        }
        where.user = { id: userId };
        if ((user === null || user === void 0 ? void 0 : user.name) != null) {
            // Busca parcial e case-insensitive pelo nome do usuário/aluno
            where.user.name = {
                contains: user.name,
                mode: 'insensitive'
            };
        }
        if ((termCommitment === null || termCommitment === void 0 ? void 0 : termCommitment.courseStudy) != null) {
            where.user.courseStudy = termCommitment.courseStudy;
        }
        var termCommitmentWhere = {};
        if (internshipGrantor) {
            if (internshipGrantor.cnpj != null) {
                termCommitmentWhere.grantingCompanyCNPJ = internshipGrantor.cnpj;
            }
            if (internshipGrantor.name != null) {
                // Troca igualdade por contains (busca parcial, case-insensitive)
                termCommitmentWhere.grantingCompanyName = {
                    contains: internshipGrantor.name,
                    mode: 'insensitive'
                };
            }
        }
        if (termCommitment) {
            if (termCommitment.startDateInitialSearchInterval != null ||
                termCommitment.startDateFinalSearchInterval != null) {
                termCommitmentWhere.internshipStartDate = __assign(__assign({}, (termCommitment.startDateInitialSearchInterval != null && {
                    gte: new Date(termCommitment.startDateInitialSearchInterval)
                })), (termCommitment.startDateFinalSearchInterval != null && {
                    lte: new Date(termCommitment.startDateFinalSearchInterval)
                }));
            }
            if (termCommitment.endDateInitialSearchInterval != null ||
                termCommitment.endDateFinalSearchInterval != null) {
                termCommitmentWhere.internshipEndDate = __assign(__assign({}, (termCommitment.endDateInitialSearchInterval != null && {
                    gte: new Date(termCommitment.endDateInitialSearchInterval)
                })), (termCommitment.endDateFinalSearchInterval != null && {
                    lte: new Date(termCommitment.endDateFinalSearchInterval)
                }));
            }
            if (termCommitment.isMandatory != null) {
                termCommitmentWhere.isMandatory = termCommitment.isMandatory;
            }
        }
        if (Object.keys(termCommitmentWhere).length > 0) {
            where.termCommitment = termCommitmentWhere;
        }
        return where;
    };
    InternshipProcessRepository = __decorate([
        common_1.Injectable()
    ], InternshipProcessRepository);
    return InternshipProcessRepository;
}());
exports.InternshipProcessRepository = InternshipProcessRepository;
