// import TelegramBot, { Message } from 'node-telegram-bot-api';
// import { MatchError } from '../Model/CustomError';
// import txtomp3 from 'text-to-mp3';
// import { Storage } from '@google-cloud/storage';
// import { uploadByBuffer } from '../utils/storage';
// import uuid from 'uuid';

// const uuidv4 = uuid.v4;

// const speakController = (bot: TelegramBot, storage: Storage) => (
//   msg: Message,
//   match: RegExpExecArray | null
// ): void => {
//   // argument -XX , check /speakList to get full list
//   const chatId = msg.chat.id;
//   if (match == null) {
//     throw new MatchError(chatId);
//   }
//   let resp = match[1];
//   let code = 'id';

//   const hypen = resp.lastIndexOf('-');
//   if (hypen !== -1) {
//     code = resp.substring(hypen + 1, resp.length);
//     resp = resp.substring(0, hypen);
//   }
//   txtomp3.attributes.tl = code;

//   const fileOption = { contentType: 'audio/mp3' };

//   txtomp3.getMp3(resp).then((binaryStream: Buffer) => {
//     uploadByBuffer(storage, binaryStream, `${uuidv4()}.mp3`, (link: string) => {
//       bot.sendVoice(chatId, link, {}, fileOption);
//     });
//   });
// };

// export { speakController };
