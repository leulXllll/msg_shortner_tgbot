const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/,(msg)=>{
  bot.sendMessage(msg.chat.id,"Welcome this is Tele Message shortner Bot Copy and Paste your tele Response")
})

bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  const text = msg.text;

  let firstline = text.substring(text.indexOf("from"),text.indexOf(";"));
  let package = firstline.substring(4,firstline.lastIndexOf("from"));

  let remaining = firstline.substring
  (firstline.indexOf("is")+2,firstline.lastIndexOf("with"));

  // console.log('package' ,package )
  // console.log('remaining' ,remaining );

  // console.log('firs line is ',firstline)

  // console.log('chat id is ',chatId)
 

  bot.sendMessage(chatId,`Package : ${package} \n Remaning : ${remaining} `)
 

});

bot.on('polling_error',(err)=>{
    console.log('the error ois ',err)
})