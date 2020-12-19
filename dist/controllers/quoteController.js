"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteController = void 0;
const CustomError_1 = require("../Model/CustomError");
const quoteController = (bot) => (msg, match) => {
    const chatId = msg.chat.id;
    if (match == null) {
        throw new CustomError_1.MatchError(chatId);
    }
    let resp = match[1];
    const whitespaces = [];
    for (let i = 0; i < resp.length; i += 1) {
        if (resp.charAt(i) === ' ') {
            whitespaces.push(i);
        }
    }
    const letterInline = 20;
    let offset = 1;
    for (let i = 0; i < whitespaces.length; i += 1) {
        if (whitespaces[i] > offset * letterInline) {
            resp = `${resp.substring(0, whitespaces[i] + offset - 1)}\\n${resp.substring(offset + whitespaces[i])}`;
            offset += 1;
        }
    }
    const seed = Math.ceil(Math.random() * 100000);
    bot.sendPhoto(chatId, `https://i.pickadummy.com/500x500?text=${encodeURI(resp)}&f=Random&random_seed=${seed}&shadow=ffffff&color=000000`);
};
exports.quoteController = quoteController;
//# sourceMappingURL=quoteController.js.map