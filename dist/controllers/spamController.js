'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.spamController = void 0;
const CustomError_1 = require('../Model/CustomError');
const spamController = (bot) => (msg, match) => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new CustomError_1.MatchError(chatId);
  }
  const input = match[1];
  const lastIndex = input.lastIndexOf(' ');
  const text = input.substring(0, lastIndex);
  const rep = Math.min(
    parseInt(input.substring(lastIndex + 1, input.length)),
    10
  );
  for (let i = 0; i < rep; i += 1) {
    bot.sendMessage(chatId, text);
  }
};
exports.spamController = spamController;
//# sourceMappingURL=spamController.js.map
