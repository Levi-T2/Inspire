import { AppState } from "../AppState.js"
import { Quote } from "../models/Quote.js"
import { api } from "./AxiosService.js"

class QuoteService {
    async getQuotes() {
        const res = await api.get('api/quotes')
        // console.log('QUOTE SERVICE:', res.data)
        const myQuote = new Quote(res.data)
        // @ts-ignore
        AppState.myQuote = myQuote
        console.log(AppState.myQuote)
    }


}

export const quoteService = new QuoteService()
