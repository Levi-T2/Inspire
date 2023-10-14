import { AppState } from "../AppState.js"
import { weatherService } from "../services/WeatherService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawWeather() {
    let content = ''
    let temperature = ''
    let fahrenheit = AppState.fahrenheit
    let celcius = AppState.celcius
    // @ts-ignore
    temperature += AppState.myWeather.main.feels_like

    content += `<p onclick="app.WeatherController.changeTemperatureCelcius()" role="button">${fahrenheit} Fahrenheit</p>`



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

    changeTemperatureCelcius() {
        let content = ''
        let celcius = AppState.celcius
        content += `<p onclick="app.WeatherController.changeTemperatureFahrenheit()" role="button">${celcius} Celcius</p>`
        setHTML('weather', content)
    }

    changeTemperatureFahrenheit() {
        let content = ''
        let fahrenheit = AppState.fahrenheit
        content += `<p onclick="app.WeatherController.changeTemperatureCelcius()" role="button">${fahrenheit} Fahrenheit</p>`
        setHTML('weather', content)
    }

    // async temperatureConverter(weatherValue) {
    //     try {

    //         await weatherService.temperatureConverter()
    //     } catch (error) {
    //         console.error(error)
    //         Pop.error(error)
    //     }
    // }
}
