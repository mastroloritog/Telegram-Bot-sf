
// init
const { Telegraf } = require("telegraf")
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
if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY must be provided!")
}
const openai = new OpenAI(OPENAI_API_KEY)


// functions ------------------------------------------------------------


// use gpt to translate texts
const getTextWithLanguage = async(text, lang) => {
    // languages keys: Italian, English

    // try {
    //     switch(lang) {
    //         case 'English':
    //             var textToTranslate = "Mi traduci in inglese mandandomi solo il testo tradotto: " + text
    
    //             const completion = await openai.chat.completions.create({
    //                 messages: [{
    //                     role: "user", 
    //                     content: textToTranslate
    //                 }],
    //                 model: 'gpt-3.5-turbo'
    //             })
    
    //             return completion.choices[0].message.content
    //         default:
    //             return text
    //     }
    // }
    // catch(e) {
    //     throw new Error(e)
    // }

    return text
}


const history = {}

const getQuestion = async(ctx, tipText) => {

    const message = tipText
    const id = 'TriviaQuestion'
    if (history[id] === undefined) {
        history[id] = [{ 
            role: "system", 
            content: "Quando ti chiedo di farmi una domanda elenca sotto anche 4 risposte: 3 false e una vera e segna quella vera con uno '/'" 
        }]
    }

    try {

        history[id].push({
            role: "user", 
            content: message
        })

        const completion = await openai.chat.completions.create({
            messages: history[id],
            model: 'gpt-3.5-turbo'
        })

        const response = completion.choices[0].message
        history[id].push(response)

        return response.content
    }
    catch(e) {
        throw new Error(e)
    }
}


////////////////////////

module.exports = {
    getTextWithLanguage,
    getQuestion
}