const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! This is the Tele Message Shortener Bot. Please copy and paste your telebirr package message.");
});

bot.on('message', (msg) => {
    // Ignore the /start command in this listener
    if (msg.text.toString().toLowerCase().indexOf("/start") === 0) {
        return;
    }

    const chatId = msg.chat.id;
    const text = msg.text;

    const information = [];
    
    // This regex reliably captures the package name, remaining amount, date, and time.
    const regex = /from\s+(.*?)\s+is\s+(.*?)\s+with expiry date on\s+(\d{4}-\d{2}-\d{2})\s+at\s+(\d{2}:\d{2}:\d{2})/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
        // match[1] is the package name
        // match[2] is the remaining amount
        // match[3] is the date (YYYY-MM-DD)
        // match[4] is the time (HH:MM:SS)
        
        const packageDate = `${match[3]}T${match[4]}`;
        const expiration = getTimeLeftUntil(packageDate);

        const info = {
            Package: match[1].trim(),
            Remaining: match[2].trim(),
            Expiration: expiration, // Corrected typo from "Expiraion"
        };
        information.push(info);
    }

    if (information.length === 0) {
        bot.sendMessage(chatId, "Sorry, I couldn't find any valid package information in your message. Please make sure it's the correct format.");
        return;
    }

    let shortner = '';
    for (const info of information) {
        shortner += `📦 **Package:** ${info.Package}\n`;
        shortner += `📊 **Remaining:** ${info.Remaining}\n`;
        shortner += `⏳ **Expires in:** ${info.Expiration}\n\n`; // Add extra newline for spacing
    }

    bot.sendMessage(chatId, shortner, { parse_mode: 'Markdown' });
});


function getTimeLeftUntil(targetDateStr) {
    const now = new Date();
    const targetDate = new Date(targetDateStr);

    const diffMs = targetDate - now;

    if (diffMs <= 0) {
        return "Package Expired";
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;

    return result.trim() + " remaining";
}


bot.on('polling_error', (err) => {
    console.error('Polling error:', err.code, '-', err.message);
});

console.log('Bot is running...');