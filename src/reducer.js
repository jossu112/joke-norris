import { combineReducers } from "redux";

import jokesReducer from "./features/jokesReducer";
// import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `jokes`, handled by `jokesReducer`
  jokes: jokesReducer,
  // filters: filtersReducer,
});

export default rootReducer;
