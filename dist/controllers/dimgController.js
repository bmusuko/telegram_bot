"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dimgController = void 0;
const CustomError_1 = require("../Model/CustomError");
const axios_1 = __importDefault(require("axios"));
const dimgController = (bot, baseApi) => (msg, match) => {
    const chatId = msg.chat.id;
    if (match == null) {
        throw new CustomError_1.MatchError(chatId);
    }
    const search = match[1];
    const seed = Math.ceil(Math.random() * 100000);
    axios_1.default
        .get(`${baseApi}ddg?search=${search}&seed=${seed}`)
        .then((result) => {
        bot.sendMessage(chatId, result.data.title);
        bot.sendPhoto(chatId, result.data.src);
    })
        .catch(() => {
        bot.sendMessage(chatId, `Can't find your request`);
    });
};
exports.dimgController = dimgController;
//# sourceMappingURL=dimgController.js.map