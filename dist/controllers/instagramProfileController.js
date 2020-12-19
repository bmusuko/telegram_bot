'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.instagramProfileController = void 0;
const CustomError_1 = require('../Model/CustomError');
const axios_1 = __importDefault(require('axios'));
const instagramProfileController = (bot, baseApi) => (msg, match) => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new CustomError_1.MatchError(chatId);
  }
  const username = match[1];
  const seed = Math.ceil(Math.random() * 100000);
  axios_1.default
    .get(`${baseApi}igp?username=${username}&seed=${seed}`)
    .then((result) => {
      bot.sendPhoto(chatId, result.data.src);
    })
    .catch(() => {
      bot.sendMessage(chatId, `can't find user`);
    });
};
exports.instagramProfileController = instagramProfileController;
//# sourceMappingURL=instagramProfileController.js.map
