'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.speakListController = void 0;
const speakListController = (bot) => (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "i can't give you full list, because is too long.\n go to https://www.labnol.org/code/19899-google-translate-languages#google-translate-languages to see full list"
  );
};
exports.speakListController = speakListController;
//# sourceMappingURL=speakListController.js.map
