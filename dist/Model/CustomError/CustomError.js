"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(chatId, m) {
        super(m);
        this.chatId = chatId;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map