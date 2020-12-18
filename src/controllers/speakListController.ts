import TelegramBot, { Message } from 'node-telegram-bot-api';

const speakListController = (bot: TelegramBot) => (msg: Message) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "i can't give you full list, because is too long.\n go to https://www.labnol.org/code/19899-google-translate-languages#google-translate-languages to see full list"
  );
};

export { speakListController };
