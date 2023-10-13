import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { todoService } from "../services/TodoService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawMyTodos() {
    // let numberOfTodos = ''
    // numberOfTodos += AppState.myTodos.length
    const todos = AppState.myTodos
    let unCompletedTodos = ''
    let i = 0
    for (let i = 0; i < todos.length; i++) {
        let test = todos[i]
        console.log(test)
        unCompletedTodos += 1
        console.log(unCompletedTodos)
        return
    }
    console.log(unCompletedTodos)
    const todoElement = document.getElementById('numberOfTodos')
    // @ts-ignore
    // todoElement.innerText = numberOfTodos
}

function _drawTodos() {
    console.log('drawing todos')
    const todos = AppState.myTodos
    // console.log(todos)
    let content = ''
    todos.forEach(todo => content += ` 
    <p class="text-start">
    <span onclick="app.TodoController.completeTodo('${todo.id}')"class="">
      <label class="form-check" for="completed"></label>
      <input type="checkbox" class="form-check-input" id="completed" >
    </span>
    ${todo.description}
    <span class="">
      <button onclick="app.TodoController.deleteTodo('${todo.id}')" class="btn btn-danger">
        <i class="mdi mdi-delete"></i>
      </button>
    </span>
  </p>`)
    // console.log(content)
    setHTML('todoList', content)
    _drawMyTodos()
}

export class TodoController {
    constructor() {
        console.log('Todo controller is initialized.')
        AppState.on('account', this.getTodoList)
        // AppState.on('account', _drawTodos)
        AppState.on('myTodos', _drawTodos)
    }

    async getTodoList() {
        try {
            await todoService.getTodoList()

        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async createTodo(event) {
        try {
            event.preventDefault()
            console.log('TODO CONTROLLER: form submitted')
            const form = event.target
            const todoFormData = getFormData(form)
            console.log(todoFormData)
            await todoService.createTodo(todoFormData)
            form.reset()

        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async deleteTodo(todoId) {
        try {
            // console.log(todoId)
            const wantsToDelete = await Pop.confirm('Are you certain you want to delete this Todo?')
            if (!wantsToDelete) {
                return
            }
            await todoService.deleteTodo(todoId)
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async completeTodo(todoId) {
        try {
            // console.log('TODO CONTROLLER: trying to complete', todoId)
            await todoService.completeTodo(todoId)
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    // computeChecked() {
    //     const todos = AppState.myTodos
    //     if ()
    // }

}
