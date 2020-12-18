import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';
import axios from 'axios';

const instagramProfileController = (bot: TelegramBot, baseApi: string) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new MatchError(chatId);
  }
  const username = match[1];
  const seed = Math.ceil(Math.random() * 100000);
  axios
    .get(`${baseApi}igp?username=${username}&seed=${seed}`)
    .then((result) => {
      bot.sendPhoto(chatId, result.data.src);
    })
    .catch(() => {
      bot.sendMessage(chatId, `can't find user`);
    });
};

export { instagramProfileController };
