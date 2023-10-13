import { AppState } from "../AppState.js"
import { imageService } from "../services/ImageService.js"
import { Pop } from "../utils/Pop.js"

function _drawImage() {
    const myImage = AppState.myImage

    console.log('This is from my controller:', myImage)
    document.body.style.backgroundImage = `url(${myImage?.largeImgUrl})`
}

export class ImageController {
    constructor() {
        console.log('Image Controller is initialized')

        AppState.on('account', this.getImage)
        AppState.on('myImage', _drawImage)
    }

    async getImage() {
        try {
            await imageService.getImage()
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
}