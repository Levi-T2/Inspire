import { AppState } from "../AppState.js"
import { Weather } from "../models/Weather.js"
import { api } from "./AxiosService.js"

class WeatherService {
    async getWeather() {
        const res = await api.get('api/weather')
        // console.log(res.data)
        // @ts-ignore
        AppState.myWeather = new Weather(res.data)
        // console.log(AppState.myWeather)
    }

}

export const weatherService = new WeatherService
