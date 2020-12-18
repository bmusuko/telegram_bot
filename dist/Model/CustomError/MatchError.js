"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchError = void 0;
const CustomError_1 = require("./CustomError");
class MatchError extends CustomError_1.CustomError {
    constructor(chatId, m = 'Failed parsing regex') {
        super(chatId, m);
        Object.setPrototypeOf(this, MatchError.prototype);
    }
}
exports.MatchError = MatchError;
//# sourceMappingURL=MatchError.js.map