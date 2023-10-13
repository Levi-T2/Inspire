import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { api } from "./AxiosService.js"

class TodoService {
    async getTodoList() {
        const res = await api.get('api/todos')
        console.log('TODO SERVICE: getting res data', res.data)
        AppState.myTodos = res.data
        console.log(AppState.myTodos)
    }

    async createTodo(todoFormData) {
        const res = await api.post('api/todos', todoFormData)
        console.log('TODO SERVICE: creating todo', res.data)
        const newTodo = new Todo(res.data)
        AppState.myTodos.push(newTodo)
        AppState.emit('myTodos')
    }

    async deleteTodo(todoId) {
        const res = await api.delete(`api/todos/${todoId}`)
        console.log('TODO SERVICE: deleted todo', res.data)
        const todoIndex = AppState.myTodos.findIndex(todo => todo.id == todoId)
        if (todoIndex == -1) {
            return
        }
        AppState.myTodos.splice(todoIndex, 1)
        AppState.emit('myTodos')
    }
}

export const todoService = new TodoService()