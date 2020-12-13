import TelegramBot, { Message } from 'node-telegram-bot-api';

const randomImgController = (bot: TelegramBot) => (msg: Message) => {
  const chatId = msg.chat.id;
  const seed = Math.ceil(Math.random() * 100000);
  bot.sendPhoto(
    chatId,
    `https://picsum.photos//500/500.jpg/?blur=3&random_seed=${seed}`
  );
};

export { randomImgController };
