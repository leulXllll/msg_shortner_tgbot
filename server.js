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

  const day = now.getDate();           
  const month = now.getMonth() + 1;    
  const year = now.getFullYear(); 

  const hour = now.getHours();         
  const minute = now.getMinutes();     
  const second = now.getSeconds();  

  let firstline = text.substring(text.indexOf("from"),text.indexOf(";"));

  let package = firstline.substring(4,firstline.lastIndexOf("from"));

  let remaining = firstline.substring
  (firstline.indexOf("is")+2,firstline.lastIndexOf("with"));

  
  let packageYear = firstline.substring(firstline.indexOf(" on")+4,firstline.indexOf("-"));
  let packageMonth = zeroNumberRemover(firstline.substring(firstline.indexOf(packageYear)+5,firstline.lastIndexOf("-")));
  
  let packageDay = zeroNumberRemover(firstline.substring(firstline.indexOf(packageMonth)+2,firstline.indexOf(packageMonth)+5));
  
  let packageHour = zeroNumberRemover(firstline.substring(firstline.indexOf(" at ")+4,firstline.indexOf(":")));
  let packageMinute = zeroNumberRemover(firstline.substring(firstline.indexOf(":")+1,firstline.lastIndexOf(":")));
  let packageSecond = zeroNumberRemover(firstline.substring(firstline.lastIndexOf(":")+1,firstline.lastIndexOf(":")+3));
  

  let expiration = 0;

  if(compareDates(
    `${packageYear}/${packageMonth}/${packageDay}`,
    `${year}/${month}/${day}`
  )
 ){
    expiration = "Package Expired";
  }
  

  bot.sendMessage(chatId,`Package : ${package} \n Remaning : ${remaining} \n Expiration : ${expiration}`)
 

});

function zeroNumberRemover(num){
  let newNum = num
    if(num[0]=="0"){
      newNum = num[1]
    }
    return newNum
}

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    return true
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    return false
  } else {
    console.log(`Both dates are equal`);
    return false
  }
};
bot.on('polling_error',(err)=>{
    console.log('the error ois ',err)
})