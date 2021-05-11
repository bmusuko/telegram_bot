'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.helpController = void 0;
const helpController = (bot) => (msg) => {
  const chatId = msg.chat.id;
  const help = [
    '- /echo [msg] - echo your message',
    '- /spam [msg] [count] - spam your message count times',
    '- /random - get random image',
    '- /quote [msg] - quote your message with picture',
    '- /covid [country] - get summary covid in that country',
    '- /jennie - get random jennie picture from pinterest',
    '- /speak [msg] [-XX] - send audio file with your message',
    '- /speaklist - send list of audio code country',
    '- /igp - [username] see instagram profile',
    '- /ig - [username] see instagram post',
    '- /dimg - [search] get duckduckgo image',
    '- /fake - get fake person generated by nvidia',
    '- /remind [msg] [number][s|m|h|d] - remind you a message',
    '- @tyurr_bot [search] - search anime from myanimelist',
  ];
  bot.sendMessage(chatId, help.join('\n'));
};
exports.helpController = helpController;
//# sourceMappingURL=helpController.js.map