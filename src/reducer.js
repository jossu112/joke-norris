import { combineReducers } from "redux";

import jokesReducer from "./features/jokesReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `jokes`, handled by `jokesReducer`
  jokes: jokesReducer,
});

export default rootReducer;
