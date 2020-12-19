'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.randomImgController = void 0;
const randomImgController = (bot) => (msg) => {
  const chatId = msg.chat.id;
  const seed = Math.ceil(Math.random() * 100000);
  bot.sendPhoto(
    chatId,
    `https://picsum.photos//500/500.jpg/?blur=3&random_seed=${seed}`
  );
};
exports.randomImgController = randomImgController;
//# sourceMappingURL=randomImgController.js.map
