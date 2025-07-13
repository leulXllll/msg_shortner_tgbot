const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});

// const expiredOn = /^expired on .*\.$/
let expiredOn = /expired on (.*?)\./;


// "Dear Customer, your remaining amount  from Gift Monthly Internet Package 50GB from telebirr to be expired after 30 days is 35039.141 MB with expiry date on 2025-07-27 at 13:33:56;  from Monthly SIM Starter_115Min Voice Package Plus 1GB data Bonus Prorated with Three Month_20 ETB is 115 minute and 0 second with expiry date on 2025-07-16 at 13:00:06;    Enjoy 10% additional rewards by downloading telebirr SuperApp http://onelink.to/fpgu4m. Thank you! Ethio telecom."

// "Dear Customer, your remaining amount from Daily voice 14 Minutes and 3 SMS with 14 Minutes night package bonus to be expired after 24 hours is 14 minute and 0 second with expiry date on 2025-02-22 at 17:00:51;     from Daily voice 14 Minutes and 3 SMS with 14 Minutes night package bonus to be expired after 24 hours is 3 SMS with expiry date on 2025-02-22 at 17:00:51; from Daily voice 14 Minutes and 3 SMS with 14 Minutes night package bonus to be expired after 24 hours is 13 minute and 56 second with expiry date on 2025-02-22 at 17:00:51;    Enjoy 10% additional rewards by downloading telebirr SuperApp http://onelink.to/fpgu4m.Thank you!Ethio telecom."



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