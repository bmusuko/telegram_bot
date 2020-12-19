import TelegramBot from 'node-telegram-bot-api';
// import appRoot from "app-root-path";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// import amqp from "amqplib/callback_api";
// import express from "express";
// import moment from "moment";

import { Storage } from '@google-cloud/storage';
import { Controller } from './controllers';
import { CustomError } from './Model/CustomError/';

const token = process.env.Telegram_token as string;
const bot = new TelegramBot(token, { polling: true });
const baseApi = process.env.API_URL as string;

const storage = new Storage({
  keyFilename: path.join(__dirname, '../cred.json'),
  projectId: 'celtic-vent-271705',
});

// const port = 8088;
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.post("/callback", (req, res) => {
//   const { chat_id, message, message_id } = req.body;
//   console.log(chat_id, message, message_id);
//   // const opt = {
//   //   reply_to_message_id: message_id,
//   // };
//   // if (message_id) {
//   //   bot.sendMessage(chat_id, message, opt);
//   // } else {
//   bot.sendMessage(chat_id, message);
//   // }
//   res.send("OK");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

bot.onText(/\/echo (.*)/, Controller.echo(bot));
bot.onText(/\/help/, Controller.help(bot));
bot.onText(/\/quote (.*)/, Controller.quote(bot));
bot.onText(/\/random/, Controller.randomImg(bot));
bot.onText(/\/spam (.*)/, Controller.spam(bot));
bot.onText(/\/speak (.*)/, Controller.speak(bot, storage));
bot.onText(/\/speaklist/, Controller.speakList(bot));
bot.onText(/\/ig (.*)/, Controller.instagram(bot, baseApi));
bot.onText(/\/igp (.*)/, Controller.instagramProfile(bot, baseApi));
bot.onText(/\/dimg (.*)/, Controller.dimg(bot, baseApi));

bot.on('inline_query', Controller.myAnimeList(bot));

bot.on('message', Controller.save(bot, storage));

bot.on('polling_error', (error) => {
  if (error instanceof CustomError) {
    bot.sendMessage(error.chatId, error.message);
  } else {
    console.log('unknown error');
    console.log(error);
  }
});

// bot.onText(/\/covid (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const country = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   bot.sendPhoto(
//     chatId,
//     `https://covid19.mathdro.id/api/countries/${country}/og?random_seed=${seed}`
//   );
// });

// bot.onText(/\/fake/, (msg) => {
//   const chatId = msg.chat.id;
//   const seed = Math.ceil(Math.random() * 100000);

//   // }
//   bot.sendPhoto(
//     chatId,
//     `https://thispersondoesnotexist.com/image?random_seed=${seed}`
//   );
// });

//   } else if (msg.sticker) {
//     // if (
//     //   msg.sticker.set_name === "NickWallowPig" &&
//     //   msg.sticker.emoji === "👍"
//     // ) {
//     //   const opt = {
//     //     reply_to_message_id: msg.message_id,
//     //   };
//     //   const subreddit = "ladybonersgw";
//     //   const resp = await axios.get(
//     //     `https://www.reddit.com/r/${subreddit}/hot.json`
//     //   );
//     //   const child = resp.data.data.children;
//     //   child.shift();
//     //   const selected = child.random();
//     //   bot.sendPhoto(chatId, selected.data.url, opt);
//     // }
//   }
// });

// bot.onText(/\/remind (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const input = match[1];
//   const lastIndex = input.lastIndexOf(" ");
//   const text = input.substring(0, lastIndex);
//   let rep = input.substring(lastIndex + 1, input.length - 1);
//   const mark = input.substring(input.length - 1).toUpperCase();
//   let time = 0;

//   if (isNumeric(rep)) {
//     rep = parseInt(rep);
//   } else {
//     bot.sendMessage(chatId, "wrong format\nexample:/remind hello boi 8m");
//     return;
//   }

//   if (mark === "M") {
//     time = 1000 * 60 * rep;
//   } else if (mark === "S") {
//     time = 1000 * rep;
//   } else if (mark === "H") {
//     time = 1000 * 60 * 60 * rep;
//   } else if (mark === "D") {
//     time = 1000 * 60 * 60 * 24 * rep;
//   } else {
//     bot.sendMessage(chatId, "wrong format\nvalid time S,M,H,D");
//     return;
//   }

//   if (!(time > 0 && time <= 1000 * 60 * 60 * 24 * 30)) {
//     bot.sendMessage(chatId, "Invalid time\nMaximum 30 Day");
//     return;
//   }

//   scheduleMessage(
//     "send_with_delay_new",
//     "delay_notification",
//     JSON.stringify({
//       message: text,
//       chat_id: chatId,
//       message_id: msg.message_id,
//     }),
//     time
//   );

//   const responseDate = moment()
//     .add(parseInt(time / 1000), "seconds")
//     .format("MMMM Do YYYY, h:mm:ss a");
//   let response = `I will remind you "${text}" on ${responseDate}`;

//   bot.sendMessage(chatId, response);
// });

// function isNumeric(value: string) : boolean {
//   return /^-?\d+$/.test(value);
// }

// function scheduleMessage(exchange, queue, params, delayInMilliSeconds) {
//   try {
//     amqp.connect(
//       `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
//       function(error0, connection) {
//         if (error0) {
//           throw error0;
//         }
//         connection.createChannel(function(error1, channel) {
//           if (error1) {
//             throw error1;
//           }

//           channel.assertExchange(exchange, "x-delayed-message", {
//             durable: true,
//             arguments: {
//               "x-delayed-type": "direct",
//             },
//           });

//           channel.bindQueue(queue, exchange, queue);

//           channel.publish(exchange, queue, new Buffer.from(params), {
//             headers: {
//               "x-delay": delayInMilliSeconds,
//             },
//           });

//           console.log(" [x] Sent %s", params);
//         });
//         setTimeout(function() {
//           connection.close();
//         }, 500);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
