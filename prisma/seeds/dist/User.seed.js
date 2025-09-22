"use strict";
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
exports.seedUsers = void 0;
var bcrypt = require("bcrypt");
function seedUsers(prismaTransaction, institutionId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    _b = (_a = prismaTransaction.user).createMany;
                    _c = {};
                    _d = {
                        name: 'Rafael',
                        cpf: '12354476876',
                        rg: '804669',
                        academicRegistrationCode: '20190796543',
                        birthDate: new Date('2001-04-18'),
                        email: 'rafael@gmail.com',
                        telephone: '3278163183618736',
                        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS'
                    };
                    _f = (_e = bcrypt).hash;
                    _g = ['#Rafael01'];
                    return [4 /*yield*/, bcrypt.genSalt()];
                case 1: return [4 /*yield*/, _f.apply(_e, _g.concat([_s.sent()]))];
                case 2:
                    _h = [
                        (_d.password = _s.sent(),
                            _d.role = 'STUDENT',
                            _d.id_institution = institutionId,
                            _d.UF = 'PA',
                            _d.city = 'Ananindeua',
                            _d.district = 'Paar',
                            _d.address = 'tv.castanhal qd77 n04',
                            _d.postalCode = '67145855',
                            _d)
                    ];
                    _j = {
                        name: 'Diego',
                        cpf: '45676654213',
                        rg: '804669',
                        academicRegistrationCode: '20190796755',
                        birthDate: new Date('2001-04-18'),
                        email: 'diego@gmail.com',
                        telephone: '3278163183618736',
                        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS'
                    };
                    _l = (_k = bcrypt).hash;
                    _m = ['#Rafael01'];
                    return [4 /*yield*/, bcrypt.genSalt()];
                case 3: return [4 /*yield*/, _l.apply(_k, _m.concat([_s.sent()]))];
                case 4:
                    _h = _h.concat([
                        (_j.password = _s.sent(),
                            _j.role = 'ADMINISTRATOR',
                            _j.id_institution = institutionId,
                            _j.UF = 'PA',
                            _j.city = 'Ananindeua',
                            _j.district = 'Paar',
                            _j.address = 'tv.castanhal qd77 n04',
                            _j.postalCode = '67145855',
                            _j)
                    ]);
                    _o = {
                        name: 'Fulano',
                        cpf: '45676654215',
                        rg: '804669',
                        academicRegistrationCode: '20190796756',
                        birthDate: new Date('2001-04-18'),
                        email: 'fulano@gmail.com',
                        telephone: '3278163183618736',
                        courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS'
                    };
                    _q = (_p = bcrypt).hash;
                    _r = ['#Rafael01'];
                    return [4 /*yield*/, bcrypt.genSalt()];
                case 5: return [4 /*yield*/, _q.apply(_p, _r.concat([_s.sent()]))];
                case 6: return [4 /*yield*/, _b.apply(_a, [(_c.data = _h.concat([
                            (_o.password = _s.sent(),
                                _o.role = 'ADMINISTRATOR',
                                _o.id_institution = institutionId,
                                _o.UF = 'PA',
                                _o.city = 'Ananindeua',
                                _o.district = 'Paar',
                                _o.address = 'tv.castanhal qd77 n04',
                                _o.postalCode = '67145855',
                                _o)
                        ]),
                            _c)])];
                case 7:
                    _s.sent();
                    console.log('Dados de usuários inseridos com sucesso!');
                    return [2 /*return*/];
            }
        });
    });
}
exports.seedUsers = seedUsers;
