import TelegramBot from 'node-telegram-bot-api';
// import appRoot from "app-root-path";
// import path from "path";
import dotenv from 'dotenv';
dotenv.config();

// import amqp from "amqplib/callback_api";
// import express from "express";
// import moment from "moment";

// import uuid from "uuid";
// import fs from "fs";
// import axios from "axios";
// import txtomp3 from "text-to-mp3";
// import { Storage } from "@google-cloud/storage";
// import request from "request";
import { Controller } from './controllers';

const token = process.env.Telegram_token as string;
const bot = new TelegramBot(token, { polling: true });
// const baseApi = process.env.API_URL;

// const storage = new Storage({
//   keyFilename: path.join(__dirname, "../cred.json"),
//   projectId: "celtic-vent-271705",
// });


// const port = 8088;
// const app = express();
// const uuidv4 = uuid.v4;

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

// Array.prototype.random = function() {
//   return this[Math.floor(Math.random() * this.length)];
// };

bot.onText(/\/help/, Controller.help(bot));

// bot.onText(/\/spam (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const input = match[1];
//   const lastIndex = input.lastIndexOf(" ");
//   const text = input.substring(0, lastIndex);
//   const rep = Math.min(parseInt(input.substring(lastIndex + 1, input.length)), 10);
//   for (let i = 0; i < rep; i += 1) {
//     bot.sendMessage(chatId, text);
//   }
// });

bot.onText(/\/echo (.*)/, Controller.echo(bot));

// bot.onText(/\/random/, (msg) => {
//   const chatId = msg.chat.id;
//   const seed = Math.ceil(Math.random() * 100000);
//   // axios.get('https://picsum.photos//500/500.jpg/?blur=3'){

//   // }
//   bot.sendPhoto(
//     chatId,
//     `https://picsum.photos//500/500.jpg/?blur=3&random_seed=${seed}`
//   );
// });

// bot.onText(/\/jennie/, (msg) => {
//   const chatId = msg.chat.id;
//   const obj = JSON.parse(fs.readFileSync("j.json", "utf8"));
//   const photo = obj.file[Math.floor(Math.random() * obj.file.length)];
//   bot.sendPhoto(chatId, `${appRoot}/images/jennie/${photo}`);
// });

// bot.onText(/\/quote (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   let resp = match[1];
//   const whitespaces = [];
//   for (let i = 0; i < resp.length; i += 1) {
//     if (resp.charAt(i) === " ") {
//       whitespaces.push(i);
//     }
//   }

//   const letterInline = 20;
//   let offset = 1;
//   for (let i = 0; i < whitespaces.length; i += 1) {
//     if (whitespaces[i] > offset * letterInline) {
//       resp = `${resp.substring(
//         0,
//         whitespaces[i] + offset - 1
//       )}\\n${resp.substring(offset + whitespaces[i])}`;
//       offset += 1;
//     }
//   }
//   const seed = Math.ceil(Math.random() * 100000);

//   bot.sendPhoto(
//     chatId,
//     `https://i.pickadummy.com/500x500?text=${encodeURI(
//       resp
//     )}&f=Random&random_seed=${seed}&shadow=ffffff&color=000000`
//   );
// });

// bot.onText(/\/covid (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const country = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   bot.sendPhoto(
//     chatId,
//     `https://covid19.mathdro.id/api/countries/${country}/og?random_seed=${seed}`
//   );
// });

// bot.onText(/\/speak (.*)/, (msg, match) => {
//   // argument -XX , check /speakList to get full list
//   const chatId = msg.chat.id;
//   let resp = match[1];

//   let code = "id";

//   const hypen = resp.lastIndexOf("-");
//   if (hypen !== -1) {
//     code = resp.substring(hypen + 1, hypen + 3);
//     resp = resp.substring(0, hypen);
//   }
//   txtomp3.attributes.tl = code;

//   const fileOptions = {
//     // Explicitly specify the MIME type.
//     contentType: "audio/mp3",
//   };

//   txtomp3.getMp3(resp).then((binaryStream) => {
//     bot.sendVoice(chatId, binaryStream, {}, fileOptions);
//   });
// });

// bot.onText(/\/speaklist/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(
//     chatId,
//     "i can't give you full list, because is too long.\n go to https://www.labnol.org/code/19899-google-translate-languages#google-translate-languages to see full list"
//   );
// });

// bot.onText(/\/igp (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const username = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   axios
//     .get(`${baseApi}igp?username=${username}&seed=${seed}`)
//     .then((result) => {
//       bot.sendPhoto(chatId, result.data.src);
//     })
//     .catch((err) => {
//       bot.sendMessage(chatId, `can't find user`);
//     });
// });

// bot.onText(/\/dimg (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const search = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   axios
//     .get(`${baseApi}ddg?search=${search}&seed=${seed}`)
//     .then((result) => {
//       bot.sendMessage(chatId, result.data.title);
//       bot.sendPhoto(chatId, result.data.src);
//     })
//     .catch((err) => {
//       bot.sendMessage(chatId, `Can't find your request`);
//     });
// });

// bot.onText(/\/ig (.*)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const username = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   axios
//     .get(`${baseApi}ig?username=${username}&seed=${seed}`)
//     .then((result) => {
//       bot.sendMessage(chatId, result.data.caption);
//       let ret_json = result.data.result;
//       let send: any = []
//       ret_json.map((res) => {
//         send.push({
//           type: res.video ? 'video' : 'photo',
//           media: res.src
//         });
//       });
//       bot.sendMediaGroup(chatId,send)
//     })
//     .catch((err) => {
//       bot.sendMessage(chatId, `can't find user or private`);
//     });
// });

// bot.on("inline_query", async (msg) => {
//   if (msg.query.trim().length > 2) {
//     const query = encodeURIComponent(msg.query.trim());

//     const url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&limit=5`;
//     const response = await axios.get(url);
//     let resp_arr = response.data.results;
//     let send = [];
//     resp_arr.map((res) => {
//       send.push({
//         type: "article",
//         id: res.mal_id,
//         photo_file_id: res.mal_id,
//         description: res.synopsis,
//         thumb_url: res.image_url,
//         title: res.title,
//         input_message_content: {
//           message_text: `<b>${res.title} (${res.start_date.substring(
//             0,
//             4
//           )}) • ${res.type}</b>\n⭐️ ${res.score}\n\nEpisode(s) : <b>${
//             res.episodes
//           }</b>\n\nSynosis:\n${res.synopsis}\n\n<a href="${
//             res.image_url
//           }">&#8204;</a>`,
//           parse_mode: "HTML",
//         },
//       });
//     });
//     console.log(resp_arr);
//     bot.answerInlineQuery(msg.id, send);
//   }
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

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   if (
//     (msg.caption && msg.caption.toLowerCase().includes("save")) ||
//     (msg.reply_to_message && msg.text.toLowerCase().includes("save"))
//   ) {
//     console.log(msg.reply_to_message);

//     let file_id;
//     let mime_type;
//     if (msg.photo && msg.photo[0]) {
//       file_id = msg.photo[msg.photo.length - 1].file_id;
//     } else if (msg.document) {
//       file_id = msg.document.file_id;
//       mime_type = msg.document.mime_type;
//     } else if (msg.reply_to_message.photo && msg.reply_to_message.photo[0]) {
//       file_id =
//         msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
//           .file_id;
//     } else if (msg.reply_to_message.document) {
//       file_id = msg.reply_to_message.document.file_id;
//       mime_type = msg.reply_to_message.document.mime_type;
//     } else if (msg.reply_to_message.video) {
//       file_id = msg.reply_to_message.video.file_id;
//       mime_type = msg.reply_to_message.video.mime_type;
//     } else if (msg.video) {
//       file_id = msg.video.file_id;
//       mime_type = msg.video.mime_type;
//     }
//     else {
//       return;
//     }
//     const link = await bot.getFileLink(file_id);
//     const ext = link.split(".").pop();
//     if (ext === "png") {
//       mime_type = "image/png";
//     } else if (ext === "jpg" || ext === "jpeg") {
//       mime_type = "image/jpeg";
//     } else if (ext === "mp3") {
//       mime_type = "audio/mpeg";
//     } else if (ext === "gif") {
//       mime_type = "image/gif";
//     }
//     if (!mime_type) {
//       bot.sendMessage(chatId, `invalid type`);
//       return;
//     }
//     const fileName = `${uuidv4()}.${ext}`;
//     const file = storage.bucket("tyur-bot").file(`file/${fileName}`);

//     request
//       .get(link)
//       .pipe(
//         file.createWriteStream({
//           metadata: {
//             contentType: mime_type,
//           },
//         })
//       )
//       .on("error", (err) => {
//         console.error(`error occurred`);
//       })
//       .on("finish", () => {
//         bot.sendMessage(
//           chatId,
//           `https://storage.googleapis.com/tyur-bot/file/${fileName}`
//         );
//         console.info(`success`);
//       });
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

// async function downloadFile(url: string, filename: string): Promise<string> {
//   const location = path.join(__dirname, "file", filename);
//   const writer = fs.createWriteStream(location);

//   const response = await axios({
//     url,
//     method: "GET",
//     responseType: "stream",
//   });

//   await response.data.pipe(writer);
//   return location;
// }