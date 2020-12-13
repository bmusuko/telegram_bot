import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';

const echoController = (bot: TelegramBot) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new MatchError(chatId);
  }
  const resp = match[1];
  bot.sendMessage(chatId, resp);
};

export { echoController };
