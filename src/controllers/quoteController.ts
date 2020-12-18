import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';

const quoteController = (bot: TelegramBot) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new MatchError(chatId);
  }
  let resp = match[1];
  const whitespaces: number[] = [];
  for (let i = 0; i < resp.length; i += 1) {
    if (resp.charAt(i) === ' ') {
      whitespaces.push(i);
    }
  }

  const letterInline = 20;
  let offset = 1;
  for (let i = 0; i < whitespaces.length; i += 1) {
    if (whitespaces[i] > offset * letterInline) {
      resp = `${resp.substring(
        0,
        whitespaces[i] + offset - 1
      )}\\n${resp.substring(offset + whitespaces[i])}`;
      offset += 1;
    }
  }
  const seed = Math.ceil(Math.random() * 100000);

  bot.sendPhoto(
    chatId,
    `https://i.pickadummy.com/500x500?text=${encodeURI(
      resp
    )}&f=Random&random_seed=${seed}&shadow=ffffff&color=000000`
  );
};

export { quoteController };
