import TelegramBot, {
  InlineQuery,
  InlineQueryResult,
} from 'node-telegram-bot-api';
import axios from 'axios';

const myAnimeListController = (bot: TelegramBot) => async (
  msg: InlineQuery
): Promise<void> => {
  if (msg.query.trim().length > 2) {
    const query = encodeURIComponent(msg.query.trim());

    const url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1&limit=5`;
    const response = await axios.get(url);
    let resp_arr = response.data.results;
    let send: InlineQueryResult[] = [];
    resp_arr.map((res: any) => {
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
};

export { myAnimeListController };
