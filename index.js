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


bot.onText(/\/jennie/, (msg, match) => {
	let chatId = msg.chat.id;
	console.log(msg);
	// axios.get('https://picsum.photos//500/500.jpg/?blur=3'){
		
	// }
	bot.sendPhoto(chatId,`./images/jennie/f01b6074d3b3abb74e5d8e549b92d1bb.jpg`); 

});

bot.onText(/\/quote (.*)/, (msg, match) => {
	console.log("hit")
	let chatId = msg.chat.id;
	let resp = match[1];
	// axios.get('https://picsum.photos//500/500.jpg/?blur=3'){
		
	// }
	let whitespaces = []
	// console.log(resp)
	for (i=0;i<resp.length;i++){
		// console.log(i)
		if (resp.charAt(i) == " "){
			whitespaces.push(i);
		}
	}

	const letter_inline = 20 
	let offset = 1;
	console.log(whitespaces)
	for (i=0;i<whitespaces.length;i++){
		if(whitespaces[i] > offset*letter_inline){
			resp = resp.substring(0, whitespaces[i]+offset-1) + '\\n' + resp.substring(offset+whitespaces[i]);
			offset += 1
		}
	}
	let seed = Math.ceil(Math.random()*100000)

	bot.sendPhoto(chatId,`https://i.pickadummy.com/500x500?text=${encodeURI(resp)}&f=Random&random_seed=${seed}&shadow=ffffff&color=000000`);

});

bot.onText(/\/covid (.*)/, (msg, match) => {
	let chatId = msg.chat.id;
	let country = match[1];
	bot.sendPhoto(chatId,`https://covid19.mathdro.id/api/countries/${country}/og`);

});

bot.on("polling_error", (err) => console.log(err));