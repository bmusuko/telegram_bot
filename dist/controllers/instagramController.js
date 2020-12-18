'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.instagramController = void 0;
const CustomError_1 = require('../Model/CustomError');
const axios_1 = __importDefault(require('axios'));
const instagramController = (bot, baseApi) => (msg, match) => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new CustomError_1.MatchError(chatId);
  }
  const username = match[1];
  const seed = Math.ceil(Math.random() * 100000);
  axios_1.default
    .get(`${baseApi}ig?username=${username}&seed=${seed}`)
    .then((result) => {
      bot.sendMessage(chatId, result.data.caption);
      let ret_json = result.data.result;
      let send = [];
      ret_json.map((res) => {
        send.push({
          type: res.video ? 'video' : 'photo',
          media: res.src,
        });
      });
      bot.sendMediaGroup(chatId, send);
    })
    .catch(() => {
      bot.sendMessage(chatId, `can't find user or private`);
    });
};
exports.instagramController = instagramController;
//# sourceMappingURL=instagramController.js.map
