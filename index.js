const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.Telegram_token;
const bot = new TelegramBot(token, {polling: true});
const axios = require('axios');


bot.onText(/\/spam (.*)/, (msg, match) => {
	console.log('hit')
	const chatId = msg.chat.id;
	const input = match[1];
	var lastIndex = input.lastIndexOf(" ");
	const text = input.substring(0,lastIndex);
	const rep = Math.min(input.substring(lastIndex+1,input.length),10);
	console.log(input);
	console.log(lastIndex);
	console.log(text);
	console.log(rep);
	for(i=0;i<rep;i++){
		bot.sendMessage(chatId, text);
	}
});

bot.onText(/\/echo (.*)/, (msg, match) => {
	console.log('hit')
    console.log(msg);
    console.log(match);
	let chatId = msg.chat.id;
	let resp = match[1];

	console.log(`someone said to me ${resp}`);

	bot.sendMessage(chatId, resp);
});

bot.onText(/\/random/, (msg, match) => {
	console.log('hit')
	let chatId = msg.chat.id;
	console.log(msg);
	// axios.get('https://picsum.photos//500/500.jpg/?blur=3'){
		
	// }
	bot.sendPhoto(chatId,`https://picsum.photos//500/500.jpg/?blur=3`); 

});

