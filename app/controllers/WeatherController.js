import { AppState } from "../AppState.js"
import { weatherService } from "../services/WeatherService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawWeather() {
    let content = ''
    // @ts-ignore
    content += AppState.myWeather.main.feels_like


    // console.log(AppState.myWeather.main.feels_like)

    setHTML('weather', content)
}

export class WeatherController {
    constructor() {
        console.log('Weather Controller is initialized.')

        AppState.on('account', this.getWeather)
    }

    async getWeather() {
        try {
            await weatherService.getWeather()
            _drawWeather()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
}
