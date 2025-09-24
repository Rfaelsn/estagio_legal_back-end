"use strict";
var _a;
exports.__esModule = true;
exports.FileTypeToFileName = exports.FileType = exports.FileEntity = void 0;
var FileEntity = /** @class */ (function () {
    function FileEntity() {
    }
    return FileEntity;
}());
exports.FileEntity = FileEntity;
var FileType;
(function (FileType) {
    FileType["TERM_COMMITMENT"] = "TERM_COMMITMENT";
    FileType["STUDENT_SELF_EVALUATION"] = "STUDENT_SELF_EVALUATION";
    FileType["INTERNSHIP_GRANTOR_EVALUATION"] = "INTERNSHIP_GRANTOR_EVALUATION";
    FileType["SUPERVISOR_EVALUATION"] = "SUPERVISOR_EVALUATION";
    FileType["RENEWAL_DOCUMENT"] = "RENEWAL_DOCUMENT";
    FileType["INTERNSHIP_CERTIFICATE"] = "INTERNSHIP_CERTIFICATE";
})(FileType = exports.FileType || (exports.FileType = {}));
exports.FileTypeToFileName = (_a = {},
    _a[FileType.TERM_COMMITMENT] = 'TermoCompromisso',
    _a[FileType.STUDENT_SELF_EVALUATION] = 'AutoAvaliacaoEstudante',
    _a[FileType.INTERNSHIP_GRANTOR_EVALUATION] = 'AvaliacaoConcedente',
    _a[FileType.SUPERVISOR_EVALUATION] = 'AvaliacaoSupervisor',
    _a[FileType.RENEWAL_DOCUMENT] = 'DocumentoRenovacao',
    _a[FileType.INTERNSHIP_CERTIFICATE] = 'CertificadoEstagio',
    _a);
