import { AboutController } from "./controllers/AboutController.js";
import { ImageController } from "./controllers/ImageController.js";
import { QuoteController } from "./controllers/QuoteController.js";
import { TimeController } from "./controllers/TimeController.js";
import { TodoController } from "./controllers/TodoController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { WeatherController } from "./controllers/WeatherController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: [TodoController, ImageController, QuoteController, WeatherController, TimeController],
    view: null
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */