import { combineReducers } from "redux";

import jokesReducer from "./features/jokesReducer";
import { jokesGetter } from "./features/jokesReducer";
// import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `jokes`, handled by `jokesReducer`
  jokes: jokesReducer,
  // getter: jokesGetter,
});

export default rootReducer;
