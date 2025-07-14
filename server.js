const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/,(msg)=>{
  bot.sendMessage(msg.chat.id,"Welcome this is Tele Message shortner Bot Copy and Paste your tele Response")
})

bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  let text = msg.text;//user text

  const now = new Date();

  let information = [];
  

  let expiration;

  while(text.includes('from')){
  let line = text.substring(text.indexOf("from"),text.indexOf(";"));
      
  console.log(` line list  ${line} \n`);
      
  let package = line.substring(4,line.lastIndexOf("from"));

  let remaining = line.substring
  (line.indexOf("is")+2,line.lastIndexOf("with"));
  
  let packageYear = line.substring(line.indexOf(" on")+4,line.indexOf("-"));
  let packageMonth = line.substring(line.indexOf(packageYear)+5,line.lastIndexOf("-"));
  
  let packageDay = line.substring(line.indexOf(packageMonth)+3,line.indexOf(packageMonth)+5);
  
  let packageHour = line.substring(line.indexOf(" at ")+4,line.indexOf(":"));
  let packageMinute = line.substring(line.indexOf(":")+1,line.lastIndexOf(":"));
  let packageSecond = line.substring(line.lastIndexOf(":")+1,line.lastIndexOf(":")+3);
  

  let packageDate = `${packageYear}-${packageMonth}-${packageDay}T${packageHour}:${packageMinute}:${packageSecond}`;
   expiration = getTimeLeftUntil(packageDate);
   

    let info = {"Package":package,"Remaining":remaining,"Expiraion":expiration};
    information.push(info);
  
    text = text.substring(text.indexOf(";")+1)
  }
  
  // console.log(JSON.stringify(information));
  
  let shortner ='';
  for(let i =0;i<information.length;i++){
    shortner+=`Package:${information[i].Package} \n Remaining: ${information[i].Remaining} \n Expiration : ${information[i].Expiraion} \n`
  }
  console.log('shorterr is' , shortner)

  // console.log(`Package : ${package} \n Remaning : ${remaining} \n Expiration : ${expiration}`)
  
  bot.sendMessage(chatId,shortner)

 
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