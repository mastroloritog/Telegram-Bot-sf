// init

const { Telegraf } = require("telegraf")
const utils = require("./utils")
const { join } = require("path")
const OpenAI = require("openai")
require("dotenv").config({ 
    path: join(__dirname, "../.env") 
})
const {
    BOT_TOKEN,
    ALLOWED_CHAT_IDS,
    ADMIN_CHAT_ID,
    OPENAI_API_KEY
} = process.env
if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN must be provided!")
}
if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY must be provided!")
}
const openai = new OpenAI(OPENAI_API_KEY)
const bot = new Telegraf(BOT_TOKEN)

// commands ------------------------------------------------------------

const showCommands = async(ctx, lang) => {
    try {
        var text0 = await utils.getTextWithLanguage('Bene 🤓, ecco qui i comandi:\n/showCommands -> ⌨️ Mostra elenco comandi.\n/trivia -> ❓ Incomincia un quiz su argomento.', lang)
        ctx.reply(text0)
    }
    catch(e) {
        //throw new Error(e)
        ctx.reply(e)
    }
}

const trivia = async(ctx, lang) => {
    try {
        const triviaImgUrl = "https://images.crazygames.com/trivia-crack/20230313103519/trivia-crack-cover?auto=format%2Ccompress&q=65&cs=strip&ch=DPR&fit=crop"
        const choiceMess = await utils.getTextWithLanguage('Ok, scegli uno dei seguenti argomenti:', lang)
        bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl, {
            caption: choiceMess,
            reply_markup: {
                inline_keyboard: [
                    [   //First line
                        { text: "🏺Storia", callback_data: 'History' },
                        { text: "🌍Geografia", callback_data: 'Geography' },
                        { text: "🎨Arte", callback_data: 'Art' },
                        
                    ],
                    [   //Second line
                        { text: "🎬Cinema", callback_data: 'Movies' },
                        { text: "🏋🏽‍♀️Sport", callback_data: 'Sport' },
                        { text: "🧬Scienze", callback_data: 'Science' },
                        
                    ],
                ]
            }
          })
            .then(() => {
              console.log('Messaggio con immagine e testo inviato con successo.');
            })
            .catch((error) => {
              console.error('Si è verificato un errore durante l\'invio del messaggio con immagine e testo:', error);
            });
    } 
    catch(e) {

    }
}

////////////////////////

module.exports = {
    showCommands,
    trivia
}