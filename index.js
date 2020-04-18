const TelegramBot = require('node-telegram-bot-api');
const token = process.env.Telegram_token;
const bot = new TelegramBot(token, {polling: true});
const axios = require('axios');
const fs = require('fs');
const txtomp3 = require("text-to-mp3");
const randomstring = require("randomstring");

require('dotenv').config();

bot.onText(/\/help/, (msg, match) => {
	const chatId = msg.chat.id;
	const help= [
		'- /echo [msg] - echo your message',
		'- /spam [msg] [count] - spam your message count times',
		'- /random - get random image',
		'- /quote [msg] - quote your message with picture',	
		'- /covid [country] - get summary covid in that country',
		'- /jennie - get random jennie picture from pinterest'
	]
	bot.sendMessage(chatId,help.join('\n')); 
});


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
	let seed = Math.ceil(Math.random()*100000)
	console.log(msg);
	// axios.get('https://picsum.photos//500/500.jpg/?blur=3'){
		
	// }
	bot.sendPhoto(chatId,`https://picsum.photos//500/500.jpg/?blur=3&random_seed=${seed}`); 
});


bot.onText(/\/jennie/, (msg, match) => {
	let chatId = msg.chat.id;
	let obj = JSON.parse(fs.readFileSync('j.json', 'utf8'));
	let photo = obj['file'][Math.floor((Math.random()*obj['file'].length))]
	bot.sendPhoto(chatId,`./images/jennie/${photo}`); 

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
	let seed = Math.ceil(Math.random()*100000)
	bot.sendPhoto(chatId,`https://covid19.mathdro.id/api/countries/${country}/og?random_seed=${seed}`);
});

bot.onText(/\/speak (.*)/, (msg, match) => {
	let chatId = msg.chat.id;
	let resp = match[1];
	let filename = './assets/' + randomstring.generate({
		length: 5,
		charset: 'alphanumeric'
	}) + '.mp3';
	const options = {
		//the property tl of the object provided must be a string and follow the 2 digit iso short code used by the Google Translate API
		tl: 'id'
	}
	const fileOptions = {
		// Explicitly specify the MIME type.
		contentType: 'audio/mp3',
	  };

	txtomp3.getMp3(resp).then(function(binaryStream){
		bot.sendVoice(chatId,binaryStream,{},fileOptions);

	})
});

bot.on("polling_error", (err) => console.log(err));