import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';
import axios from 'axios';

const dimgController = (bot: TelegramBot, baseApi: string) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new MatchError(chatId);
  }
  const search = match[1];
  const seed = Math.ceil(Math.random() * 100000);
  axios
    .get(`${baseApi}ddg?search=${search}&seed=${seed}`)
    .then((result) => {
      bot.sendMessage(chatId, result.data.title);
      bot.sendPhoto(chatId, result.data.src);
    })
    .catch(() => {
      bot.sendMessage(chatId, `Can't find your request`);
    });
};

export { dimgController };
