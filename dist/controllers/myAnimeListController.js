'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.myAnimeListController = void 0;
const axios_1 = __importDefault(require('axios'));
const myAnimeListController = (bot) => (msg) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (msg.query.trim().length > 2) {
      const query = encodeURIComponent(msg.query.trim());
      const url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&limit=5`;
      const response = yield axios_1.default.get(url);
      let resp_arr = response.data.results;
      let send = [];
      resp_arr.map((res) => {
        send.push({
          type: 'article',
          id: res.mal_id,
          description: res.synopsis,
          thumb_url: res.image_url,
          title: res.title,
          input_message_content: {
            message_text: `<b>${res.title} (${
              res.start_date ? res.start_date.substring(0, 4) : '-'
            }) • ${res.type}</b>\n⭐️ ${res.score}\n\nEpisode(s) : <b>${
              res.episodes
            }</b>\n\nSynosis:\n${res.synopsis}\n\n<a href="${
              res.image_url
            }">&#8204;</a>`,
            parse_mode: 'HTML',
          },
        });
      });
      bot.answerInlineQuery(msg.id, send);
    }
  });
exports.myAnimeListController = myAnimeListController;
//# sourceMappingURL=myAnimeListController.js.map
