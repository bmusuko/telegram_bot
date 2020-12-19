import TelegramBot, { Message } from 'node-telegram-bot-api';
import { uploadByLink } from '../utils/storage';
import uuid from 'uuid';
import { Storage } from '@google-cloud/storage';

const saveController = (bot: TelegramBot, storage: Storage) => async (
  msg: Message
): Promise<void> => {
  const chatId = msg.chat.id;
  const uuidv4 = uuid.v4;
  if (
    (msg.caption && msg.caption.toLowerCase().includes('save')) ||
    (msg.reply_to_message && msg.text?.toLowerCase().includes('save'))
  ) {
    let file_id;
    let mime_type: string | undefined = '';
    if (msg.photo && msg.photo[0]) {
      file_id = msg.photo[msg.photo.length - 1].file_id;
    } else if (msg.document) {
      file_id = msg.document.file_id;
      mime_type = msg.document.mime_type;
    } else if (msg.reply_to_message?.photo && msg.reply_to_message.photo[0]) {
      file_id =
        msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
          .file_id;
      mime_type = 'image/jpeg';
    } else if (msg.reply_to_message?.document) {
      file_id = msg.reply_to_message.document.file_id;
      mime_type = msg.reply_to_message.document.mime_type;
    } else if (msg.reply_to_message?.video) {
      file_id = msg.reply_to_message.video.file_id;
      mime_type = msg.reply_to_message.video.mime_type;
    } else if (msg.video) {
      file_id = msg.video.file_id;
      mime_type = msg.video.mime_type;
    } else {
      console.log(msg);
      return;
    }
    const link = await bot.getFileLink(file_id);
    const ext = link.split('.').pop();
    if (!mime_type) {
      bot.sendMessage(chatId, `invalid type`);
      return;
    }
    const fileName = `${uuidv4()}.${ext}`;
    uploadByLink(storage, link, fileName, mime_type, (res) => {
      if (res instanceof Error) {
        return;
      }
      bot.sendMessage(chatId, res);
    });
  }
};

export { saveController };
