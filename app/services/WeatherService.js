import { AppState } from "../AppState.js"
import { Weather } from "../models/Weather.js"
import { api } from "./AxiosService.js"

class WeatherService {
    async getWeather() {
        const res = await api.get('api/weather')
        // console.log(res.data)
        // @ts-ignore
        AppState.myWeather = new Weather(res.data)
        // @ts-ignore
        const weatherValue = AppState.myWeather.main.feels_like
        const fahrenheit = (((weatherValue - 273.15) * 1.8) + 32).toFixed(1)
        // console.log('this is our number in f', fahrenheit)
        const celcius = (weatherValue - 273.15).toFixed(1)
        // console.log('Celcius:', celcius)
        AppState.celcius.push(celcius)
        AppState.fahrenheit.push(fahrenheit)
        console.log('These are coming from our AppState:', AppState.fahrenheit[0], AppState.celcius[0])
    }

    // async temperatureConverter(weatherValue) {
    //     const fahrenheit = ((weatherValue - 273.15) * 1.8) + 32;
    //     console.log('this is our number in f', fahrenheit)
    //     const celcius = weatherValue - 273.15
    //     console.log('Celcius:', celcius)
    //     AppState.celcius.push(celcius)
    //     AppState.fahrenheit.push(fahrenheit)
    //     console.log('These are coming from our AppState:', AppState.fahrenheit[0], AppState.celcius[0])
    // }

}

export const weatherService = new WeatherService
