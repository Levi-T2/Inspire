import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { todoService } from "../services/TodoService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawMyTodos() {
    const todos = AppState.myTodos

    console.log(todos)
    let unCompletedTodos = 0
    todos.forEach(todo => {
        if (!todo.completed)
            unCompletedTodos += 1
        console.log(unCompletedTodos)
    }
    )

    const todoElement = document.getElementById('numberOfTodos')
    // @ts-ignore
    todoElement.innerText = unCompletedTodos
}


function _drawTodos() {
    const todos = AppState.myTodos
    let content = ''

    // NOTE old code, add in if bottom breaks
    //     todos.forEach(todos => content += ` 
    //     <p class="text-start" id="compute">
    //     <span onclick="app.TodoController.completeTodo('${todos.id}')">
    //       <label class="form-check" for="completed"></label>
    //       <input type="checkbox" class="form-check-input" id="completed">
    //     </span>
    //     ${todos.description}
    //     <span class="">
    //       <button onclick="app.TodoController.deleteTodo('${todos.id}')" class="btn btn-danger">
    //         <i class="mdi mdi-delete"></i>
    //       </button>
    //     </span>
    //   </p>`)
    // console.log(content)
    // setHTML('todoList', content)

    todos.forEach(todos => {
        if (todos.completed) {
            content += `   <span onclick="app.TodoController.completeTodo('${todos.id}')">
        <label class="form-check" for="completed"></label>
        <input type="checkbox" checked class="form-check-input" id="completed">
      </span>
      ${todos.description}
      <span class="">
        <button onclick="app.TodoController.deleteTodo('${todos.id}')" class="btn btn-danger">
          <i class="mdi mdi-delete"></i>
        </button>
      </span>`
            setHTML('todoList', content)
        } else {
            content += `   <span onclick="app.TodoController.completeTodo('${todos.id}')">
        <label class="form-check" for="completed"></label>
        <input type="checkbox" class="form-check-input" id="completed">
      </span>
      ${todos.description}
      <span class="">
        <button onclick="app.TodoController.deleteTodo('${todos.id}')" class="btn btn-danger">
          <i class="mdi mdi-delete"></i>
        </button>
      </span>`
            setHTML('todoList', content)
        }
    }
    )
}




export class TodoController {
    constructor() {
        console.log('Todo controller is initialized.')
        AppState.on('account', this.getTodoList)
        // AppState.on('account', _drawTodos)
        AppState.on('myTodos', _drawTodos)
        AppState.on('myTodos', _drawMyTodos)
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

}
