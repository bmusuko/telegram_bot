'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.speakController = void 0;
const CustomError_1 = require('../Model/CustomError');
const text_to_mp3_1 = __importDefault(require('text-to-mp3'));
const storage_1 = require('../utils/storage');
const uuid_1 = __importDefault(require('uuid'));
const uuidv4 = uuid_1.default.v4;
const speakController = (bot, storage) => (msg, match) => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new CustomError_1.MatchError(chatId);
  }
  let resp = match[1];
  let code = 'id';
  const hypen = resp.lastIndexOf('-');
  if (hypen !== -1) {
    code = resp.substring(hypen + 1, resp.length);
    resp = resp.substring(0, hypen);
  }
  text_to_mp3_1.default.attributes.tl = code;
  const fileOption = { contentType: 'audio/mp3' };
  text_to_mp3_1.default.getMp3(resp).then((binaryStream) => {
    storage_1.uploadByBuffer(
      storage,
      binaryStream,
      `${uuidv4()}.mp3`,
      (link) => {
        bot.sendVoice(chatId, link, {}, fileOption);
      }
    );
  });
};
exports.speakController = speakController;
//# sourceMappingURL=speakController.js.map
