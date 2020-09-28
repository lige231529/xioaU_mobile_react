import { combineReducers } from "redux"

import app from "./app"
import car from "./car"

let reducer = combineReducers({
    app,car
})

export default reducer;