import TelegramBot, { Message } from 'node-telegram-bot-api';

const echoController = (bot: TelegramBot) => (
  msg: Message,
  match: RegExpExecArray | null
): void => {
  const chatId = msg.chat.id;
  // to be function
  if (match == null) {
    bot.sendMessage(chatId, 'message is empty');
    return;
  }
  const resp = match[1];
  bot.sendMessage(chatId, resp);
};

export { echoController };
