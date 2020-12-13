import TelegramBot, { Message } from 'node-telegram-bot-api';
import { MatchError } from '../Model/CustomError';

const spamController = (bot: TelegramBot) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  if (match == null) {
    throw new MatchError(chatId);
  }
  const input = match[1];
  const lastIndex = input.lastIndexOf(' ');
  const text = input.substring(0, lastIndex);
  const rep = Math.min(
    parseInt(input.substring(lastIndex + 1, input.length)),
    10
  );
  for (let i = 0; i < rep; i += 1) {
    bot.sendMessage(chatId, text);
  }
};

export { spamController };
