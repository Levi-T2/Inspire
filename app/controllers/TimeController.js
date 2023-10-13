import { setHTML } from "../utils/Writer.js"


function _drawTime() {
    let content = ''
    let time = new Date().toLocaleTimeString()
    content += time
    // console.log(content.toLocaleString())

    setHTML('clock', time)
}

export class TimeController {
    constructor() {
        console.log('Time Controller is initialized.')
        setInterval(_drawTime, 500)
    }


}