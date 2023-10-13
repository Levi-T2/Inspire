import { generateId } from "../utils/GenerateId.js";

export class Todo {
    constructor(data) {
        this.id = data.id
        this.completed = data.completed
        this.creatorId = data.creatorId
        this.description = data.description
    }


}