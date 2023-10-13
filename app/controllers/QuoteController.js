import { AppState } from "../AppState.js"
import { quoteService } from "../services/QuoteService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawQuote() {
    let content = ''
    // @ts-ignore
    content += AppState.myQuote.content
    let content2 = ''
    // @ts-ignore
    content2 += AppState.myQuote.author

    setHTML('quoteText', content)
    setHTML('quoteAuthor', content2)

}

export class QuoteController {
    constructor() {
        console.log('Quote Controller is initialized.')

        AppState.on('account', this.getQuotes)
    }

    async getQuotes() {
        try {
            await quoteService.getQuotes()
            _drawQuote()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
}
