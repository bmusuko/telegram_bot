"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function receiveMessage() {
    try {
        callback_api_1.default.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`, (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                const queue = 'delay_notification';
                channel.assertQueue(queue, {
                    durable: true,
                });
                console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
                channel.consume(queue, function (msg) {
                    if (msg !== null) {
                        console.log(' [x] messages Received %s', queue, msg.content.toString());
                        const payload = JSON.parse(msg.content.toString());
                        const message = payload.message;
                        const chatId = payload.chat_id;
                        const messageId = payload.message_id;
                        sendScheduledMessage(chatId, message, messageId);
                        console.log('Message Received with delay', message, chatId);
                    }
                }, {
                    noAck: true,
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
function sendScheduledMessage(chatId, message, messageId) {
    const url = 'http://localhost:8088/callback';
    axios_1.default.post(url, {
        chat_id: chatId,
        message: message,
        message_id: messageId,
    });
}
receiveMessage();
//# sourceMappingURL=worker.js.map