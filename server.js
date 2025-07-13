const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/,(msg)=>{
  bot.sendMessage(msg.chat.id,"Welcome this is Tele Message shortner Bot Copy and Paste your tele Response")
})

bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  const text = msg.text;//user text

  const now = new Date();


  let firstline = text.substring(text.indexOf("from"),text.indexOf(";"));

  let package = firstline.substring(4,firstline.lastIndexOf("from"));

  let remaining = firstline.substring
  (firstline.indexOf("is")+2,firstline.lastIndexOf("with"));
  
  let packageYear = firstline.substring(firstline.indexOf(" on")+4,firstline.indexOf("-"));
  let packageMonth = firstline.substring(firstline.indexOf(packageYear)+5,firstline.lastIndexOf("-"));
  
  let packageDay = firstline.substring(firstline.indexOf(packageMonth)+3,firstline.indexOf(packageMonth)+5);
  
  let packageHour = firstline.substring(firstline.indexOf(" at ")+4,firstline.indexOf(":"));
  let packageMinute = firstline.substring(firstline.indexOf(":")+1,firstline.lastIndexOf(":"));
  let packageSecond = firstline.substring(firstline.lastIndexOf(":")+1,firstline.lastIndexOf(":")+3);
  

  let packageDate = `${packageYear}-${packageMonth}-${packageDay}T${packageHour}:${packageMinute}:${packageSecond}`;
  let expiration = getTimeLeftUntil(packageDate);


  bot.sendMessage(chatId,`Package : ${package} \n Remaning : ${remaining} \n Expiration : ${expiration}`)
 

});


function getTimeLeftUntil(targetDateStr) {
    const now = new Date();
    const targetDate = new Date(targetDateStr);

    const diffMs = targetDate - now;

    if (diffMs <= 0) {
        return "Package Expired";
    }

    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const hours = Math.floor((diffMs / 1000 / 60 / 60) % 24);
    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;
}

// Example: time left until July 27, 2025
console.log(getTimeLeftUntil("2025-07-27T04:03:30"));

bot.on('polling_error',(err)=>{
    console.log('the error ois ',err)
})