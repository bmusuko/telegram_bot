'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.echoController = void 0;
const CustomError_1 = require('../Model/CustomError');
const echoController = (bot) => (msg, match) => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new CustomError_1.MatchError(chatId);
  }
  const resp = match[1];
  bot.sendMessage(chatId, resp);
};
exports.echoController = echoController;
//# sourceMappingURL=echoController.js.map
