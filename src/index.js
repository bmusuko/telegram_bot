const TelegramBot = require("node-telegram-bot-api");
const appRoot = require("app-root-path");
const IgApiClient = require("instagram-private-api").IgApiClient;
const ig = new IgApiClient();

require("dotenv").config();

const token = process.env.Telegram_token;
const bot = new TelegramBot(token, { polling: true });
const fs = require("fs");
const txtomp3 = require("text-to-mp3");
const axios = require("axios");

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const help = [
    "- /echo [msg] - echo your message",
    "- /spam [msg] [count] - spam your message count times",
    "- /random - get random image",
    "- /quote [msg] - quote your message with picture",
    "- /covid [country] - get summary covid in that country",
    "- /jennie - get random jennie picture from pinterest",
    "- /speak [msg] [-XX] - send audio file with your message",
    "- /speaklist - send list of audio code country",
  ];
  bot.sendMessage(chatId, help.join("\n"));
});

bot.onText(/\/spam (.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];
  const lastIndex = input.lastIndexOf(" ");
  const text = input.substring(0, lastIndex);
  const rep = Math.min(input.substring(lastIndex + 1, input.length), 10);
  for (let i = 0; i < rep; i += 1) {
    bot.sendMessage(chatId, text);
  }
});

bot.onText(/\/echo (.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/random/, (msg) => {
  const chatId = msg.chat.id;
  const seed = Math.ceil(Math.random() * 100000);
  // axios.get('https://picsum.photos//500/500.jpg/?blur=3'){

  // }
  bot.sendPhoto(
    chatId,
    `https://picsum.photos//500/500.jpg/?blur=3&random_seed=${seed}`
  );
});

bot.onText(/\/jennie/, (msg) => {
  const chatId = msg.chat.id;
  const obj = JSON.parse(fs.readFileSync("j.json", "utf8"));
  const photo = obj.file[Math.floor(Math.random() * obj.file.length)];
  bot.sendPhoto(chatId, `${appRoot}/images/jennie/${photo}`);
});

bot.onText(/\/quote (.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  let resp = match[1];
  const whitespaces = [];
  for (let i = 0; i < resp.length; i += 1) {
    // console.log(i)
    if (resp.charAt(i) === " ") {
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
});

bot.onText(/\/covid (.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const country = match[1];
  const seed = Math.ceil(Math.random() * 100000);
  bot.sendPhoto(
    chatId,
    `https://covid19.mathdro.id/api/countries/${country}/og?random_seed=${seed}`
  );
});

bot.onText(/\/speak (.*)/, (msg, match) => {
  // argument -XX , check /speakList to get full list
  const chatId = msg.chat.id;
  let resp = match[1];

  let code = "id";

  const hypen = resp.lastIndexOf("-");
  if (hypen !== -1) {
    code = resp.substring(hypen + 1, hypen + 3);
    resp = resp.substring(0, hypen);
  }
  txtomp3.attributes.tl = code;

  const fileOptions = {
    // Explicitly specify the MIME type.
    contentType: "audio/mp3",
  };

  txtomp3.getMp3(resp).then((binaryStream) => {
    bot.sendVoice(chatId, binaryStream, {}, fileOptions);
  });
});

bot.onText(/\/speaklist/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "i can't give you full list, because is too long.\n go to https://www.labnol.org/code/19899-google-translate-languages#google-translate-languages to see full list"
  );
});

// bot.onText(/\/igp (.*)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const username = match[1];
//   const seed = Math.ceil(Math.random() * 100000);
//   console.log(username);
//   axios
//     .get(`https://www.instagram.com/${username}/?__a=1&seed=${seed}`)
//     .then((result) => {
//       console.log(result.data);
//       bot.sendPhoto(chatId, result.data.graphql.user.profile_pic_url_hd);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

bot.onText(/\/ig (.*)/, async (msg, match) => {
  console.log;
  const chatId = msg.chat.id;
  const username = match[1];
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.simulate.preLoginFlow();
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  // console.log(loggedInUser);
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());

  try {
    const id = await ig.user.getIdByUsername(username);

    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(id);
    const feed = await userFeed.items();
    const post = feed.random();
    const is_private = post["user"]["is_private"];

    if (is_private) {
      bot.sendMessage(chatId, "private account");
    } else {
      const caption = post["caption"]["text"] || "no caption";
      const media_type = post["media_type"]; // 1 photo, 2 video
      bot.sendMessage(chatId, caption);
      if (media_type === 1) {
        const photo_url = post["image_versions2"]["candidates"].random()["url"];
        bot.sendPhoto(chatId, photo_url);
      } else if (media_type === 2) {
        const video_url = post["video_versions"].random()["url"];
        bot.sendVideo(chatId, video_url);
      } else {
        bot.sendMessage(chatId, "unknown media type");
      }
    }
  } catch (e) {
    if (e.name === "IgPrivateUserError") {
      bot.sendMessage(chatId, "private account");
    } else {
      bot.sendMessage(chatId, e.message);
    }
  }
});
