
// init lib and keys ------------------------------------------------------------------------------

const { Telegraf } = require("telegraf")
const { join } = require("path")
const utils = require("./utils")
const commands = require("./commands")

require("dotenv").config({ 
    path: join(__dirname, "../.env") 
})

const {
    BOT_TOKEN,
    ALLOWED_CHAT_IDS,
    ADMIN_CHAT_ID,
} = process.env

// check keys -------------------------------------------------------------------

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN must be provided!")
}

// init bot -----------------------------------------------------------------------

const bot = new Telegraf(BOT_TOKEN)

const notifyAdmin = (message) => {
    if (ADMIN_CHAT_ID) { 
        bot.telegram.sendMessage(ADMIN_CHAT_ID, message)
    }
}

bot.use((ctx, next) => {
    // Apply security on messages check if ALLOWED_CHAT_IDS is provided
    if (ctx.updateType === "message" && ALLOWED_CHAT_IDS) {
        const allowedChatIds = ALLOWED_CHAT_IDS.split(",")

        if (!allowedChatIds.includes(ctx.message.chat.id.toString())) {
            notifyAdmin(`Unauthorized access from chat id ${ctx.message.chat.id}`)
            ctx.reply("You are not authorized to use this bot!")
            return
        }
    }

    // Continue to next middleware
    next()
})




/////////////////////////////////////////////////////////////////////////////////////

var language = "Italian"
var isChangeLangCommand = false

bot.start(async(ctx) => {
    
//     const choiceMess = `
//     Hi. I am Trivie, a bot for Trivia Quizzes.
// First, choose a language:
//     `
//     bot.telegram.sendMessage(ctx.chat.id, choiceMess, {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     { text: "Italian🇮🇹", callback_data: 'Italian' },
//                     { text: "English🇬🇧", callback_data: 'English' },
//                 ],
//             ]
//         }
//     });

    try {
        var text0 = await utils.getTextWithLanguage('Bene 🤓, ecco qui i comandi:\n/showCommands -> ⌨️ Mostra elenco comandi.\n/trivia -> ❓ Incomincia un quiz su argomento.', 'Italian')
        ctx.reply(text0)
    }
    catch(e) {
        //throw new Error(e)
        ctx.reply(e)
    }
})

// bot.action(['Italian', 'English'], async(ctx) => {
    
//     ctx.deleteMessage()
    
//     const selectedLanguage = ctx.match[0]
//     language = selectedLanguage

//     console.log("Selected language: " + selectedLanguage)

//     if(isChangeLangCommand) {
//         var text = await utils.getTextWithLanguage('Lingua cambiata con successo 😁', language)
//         ctx.reply(text)
//         isChangeLangCommand = true
//     }
//     else {
//         try {
//             var text0 = await utils.getTextWithLanguage('Bene 🤓, ecco qui i comandi:\n/showCommands -> ⌨️ Mostra elenco comandi.\n/guide -> 📜 Guida sui quiz.\n/docs -> 📚 Documenti di ripasso per i quiz.\n/trivia -> ❓ Incomincia un quiz su argomento.\n/changeLang -> 🏳️ Cambia la lingua.', selectedLanguage)
//             ctx.reply(text0)
//         }
//         catch(e) {
//             //throw new Error(e)
//             ctx.reply(e)
//         }
//     }
    
// });

// bot.command("changeLang", async(ctx) => {
//     isChangeLangCommand = true
//     const choiceMess = await utils.getTextWithLanguage('Ok, scegli una lingua:', language)
//     bot.telegram.sendMessage(ctx.chat.id, choiceMess, {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     { text: "Italian🇮🇹", callback_data: 'Italian' },
//                     { text: "English🇬🇧", callback_data: 'English' },
//                 ],
//             ]
//         }
//     });
// })

var nQuestions = 1
async function startTrivia(ctx, topic) {
    ctx.reply("Domanda " + nQuestions + ":\n")
    switch(topic) {
        case 'History': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su storia")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
        case 'History': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su geografia")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
        case 'Art': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su arte")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
        case 'Movies': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su cinema")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
        case 'Sport': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su sport")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
        case 'Science': {
            const question = await utils.getQuestion(ctx, "Fammi una domanda generale su scienze")
            //ctx.reply(question)

            const questionArr = question.split('\n');
            const quest = questionArr[0]; // La prima riga è la domanda
            const AnswerA = questionArr[1]; // La seconda riga è la risposta A
            const AnswerB = questionArr[2]; // La terza riga è la risposta B
            const AnswerC = questionArr[3]; // La quarta riga è la risposta C
            const AnswerD = questionArr[4]; // La quinta riga è la risposta D

            ctx.reply(quest)

            break
        }
    }
    
}

bot.command("showCommands", (ctx) => {commands.showCommands(ctx, language)})
bot.command("trivia", (ctx) => {commands.trivia(ctx, language)})
bot.action(["History", "Geography", "Art", "Movies", "Sport", "Science"], async(ctx) => {
    const selectedTopic = ctx.match[0]
    
    try {
        switch(selectedTopic) {
            case 'History':
                const triviaImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1db64216598909.562ae92010638.png"
                const choiceMess = await utils.getTextWithLanguage('Argomento scelto: storia', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl, {
                    caption: choiceMess
                })
                startTrivia(ctx, "History")
                break
            case 'Geography':
                const triviaImgUrl2 = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/98fa6016598909.562ae8d49aa75.png"
                const choiceMess2 = await utils.getTextWithLanguage('Argomento scelto: geografia', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl2, {
                    caption: choiceMess2
                })
                break
            case 'Art':
                const triviaImgUrl3 = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fc272e16598909.562ae88215c30.png"
                const choiceMess3 = await utils.getTextWithLanguage('Argomento scelto: arte', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl3, {
                    caption: choiceMess3
                })
                break
            case 'Movies':
                const triviaImgUrl4 = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/275e8016598909.562ae88283168.png"
                const choiceMess4 = await utils.getTextWithLanguage('Argomento scelto: cinema', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl4, {
                    caption: choiceMess4
                })
                break
            case 'Sport':
                const triviaImgUrl5 = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/871aea16598909.562ae883097dd.png"
                const choiceMess5 = await utils.getTextWithLanguage('Argomento scelto: sport', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl5, {
                    caption: choiceMess5
                })
                break
            case 'Science':
                const triviaImgUrl6 = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4363716598909.562ae9494d313.png"
                const choiceMess6 = await utils.getTextWithLanguage('Argomento scelto: scienze', language)
                bot.telegram.sendPhoto(ctx.chat.id, triviaImgUrl6, {
                    caption: choiceMess6
                })
                break
            default:
                ctx.reply("error")
        }
    }
    catch(e) {
        console.log(e)
        ctx.reply("error")
    }
})

/////////////////////////////////////////////////////////////////////////////////////

bot.launch({
    dropPendingUpdates: true
})

console.log("Bot started!")