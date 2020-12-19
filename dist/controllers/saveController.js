'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.saveController = void 0;
const storage_1 = require('../utils/storage');
const uuid_1 = __importDefault(require('uuid'));
const saveController = (bot, storage) => (msg) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const chatId = msg.chat.id;
    const uuidv4 = uuid_1.default.v4;
    if (
      (msg.caption && msg.caption.toLowerCase().includes('save')) ||
      (msg.reply_to_message &&
        ((_a = msg.text) === null || _a === void 0
          ? void 0
          : _a.toLowerCase().includes('save')))
    ) {
      let file_id;
      let mime_type = '';
      if (msg.photo && msg.photo[0]) {
        file_id = msg.photo[msg.photo.length - 1].file_id;
      } else if (msg.document) {
        file_id = msg.document.file_id;
        mime_type = msg.document.mime_type;
      } else if (
        ((_b = msg.reply_to_message) === null || _b === void 0
          ? void 0
          : _b.photo) &&
        msg.reply_to_message.photo[0]
      ) {
        file_id =
          msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
            .file_id;
        mime_type = 'image/jpeg';
      } else if (
        (_c = msg.reply_to_message) === null || _c === void 0
          ? void 0
          : _c.document
      ) {
        file_id = msg.reply_to_message.document.file_id;
        mime_type = msg.reply_to_message.document.mime_type;
      } else if (
        (_d = msg.reply_to_message) === null || _d === void 0
          ? void 0
          : _d.video
      ) {
        file_id = msg.reply_to_message.video.file_id;
        mime_type = msg.reply_to_message.video.mime_type;
      } else if (msg.video) {
        file_id = msg.video.file_id;
        mime_type = msg.video.mime_type;
      } else {
        console.log(msg);
        return;
      }
      const link = yield bot.getFileLink(file_id);
      const ext = link.split('.').pop();
      if (!mime_type) {
        bot.sendMessage(chatId, `invalid type`);
        return;
      }
      const fileName = `${uuidv4()}.${ext}`;
      storage_1.uploadByLink(storage, link, fileName, mime_type, (res) => {
        if (res instanceof Error) {
          return;
        }
        bot.sendMessage(chatId, res);
      });
    }
  });
exports.saveController = saveController;
//# sourceMappingURL=saveController.js.map
