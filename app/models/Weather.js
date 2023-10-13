
export class Weather {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.main = data.main
        this.weather = data.weather
    }
}
