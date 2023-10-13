import { AppState } from "../AppState.js"
import { Image } from "../models/Image.js"
import { api } from "./AxiosService.js"

class ImageService {
    async getImage() {
        const res = await api.get('api/images')
        // console.log('GOT IMAGE?', res.data)
        AppState.myImage = res.data
        // console.log('This is in our appstate', AppState.myImage)
    }
}

export const imageService = new ImageService()
