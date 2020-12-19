'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const node_telegram_bot_api_1 = __importDefault(
  require('node-telegram-bot-api')
);
const path_1 = __importDefault(require('path'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const storage_1 = require('@google-cloud/storage');
const controllers_1 = require('./controllers');
const CustomError_1 = require('./Model/CustomError/');
const token = process.env.Telegram_token;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const baseApi = process.env.API_URL;
const storage = new storage_1.Storage({
  keyFilename: path_1.default.join(__dirname, '../cred.json'),
  projectId: 'celtic-vent-271705',
});
bot.onText(/\/echo (.*)/, controllers_1.Controller.echo(bot));
bot.onText(/\/help/, controllers_1.Controller.help(bot));
bot.onText(/\/quote (.*)/, controllers_1.Controller.quote(bot));
bot.onText(/\/random/, controllers_1.Controller.randomImg(bot));
bot.onText(/\/spam (.*)/, controllers_1.Controller.spam(bot));
bot.onText(/\/speak (.*)/, controllers_1.Controller.speak(bot, storage));
bot.onText(/\/speaklist/, controllers_1.Controller.speakList(bot));
bot.onText(/\/ig (.*)/, controllers_1.Controller.instagram(bot, baseApi));
bot.onText(
  /\/igp (.*)/,
  controllers_1.Controller.instagramProfile(bot, baseApi)
);
bot.onText(/\/dimg (.*)/, controllers_1.Controller.dimg(bot, baseApi));
bot.on('inline_query', controllers_1.Controller.myAnimeList(bot));
bot.on('message', controllers_1.Controller.save(bot, storage));
bot.on('polling_error', (error) => {
  if (error instanceof CustomError_1.CustomError) {
    bot.sendMessage(error.chatId, error.message);
  } else {
    console.log('unknown error');
    console.log(error);
  }
});
//# sourceMappingURL=index.js.map
