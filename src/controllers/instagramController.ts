import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';
import axios from 'axios';

const instagramController = (bot: TelegramBot, baseApi: string) => (
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
    .get(`${baseApi}ig?username=${username}&seed=${seed}`)
    .then((result) => {
      bot.sendMessage(chatId, result.data.caption);
      let ret_json = result.data.result;
      let send: any = [];
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

export { instagramController };
