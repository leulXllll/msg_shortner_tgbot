const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});

// const expiredOn = /^expired on .*\.$/
let expiredOn = /expired on (.*?)\./;

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  const text = msg.text;

  console.log('chat id is ',chatId)

  bot.sendMessage(chatId,"Hello there ")
  // let datee = text.match(expiredOn);

  // console.log('datee is',datee[1]);

//   console.log('text is ',text);

//   bot.sendMessage(chatId, `date is ${datee}`);

});

bot.on('polling_error',(err)=>{
    console.log('the error ois ',err)
})