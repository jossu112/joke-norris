import { CAT_NOT_SET } from "../conf.js";
import { getDate } from "../helpers.js";
const initialState = [];

export default function jokesReducer(state = initialState, action) {
  switch (action.type) {
    case "jokes/jokesAdded": {
      if (!action.category) action.category = CAT_NOT_SET;
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          category: action.category,
          fetchTime: getDate(),
          saved: false,
          edited: false,
          deleted: false,
        },
      ];
    }
    case "jokes/saveAndDelete": {
      return state.map((joke) => {
        if (joke.id !== action.idPayload) {
          return joke;
        }

        return {
          ...joke,
          text: action.textPayload,
          saved: !joke.saved,
          deleted: action.deletedPayload,
        };
      });
    }
    case "jokes/edit": {
      return state.map((joke) => {
        if (joke.id !== action.idPayload) {
          return joke;
        }

        return {
          ...joke,
          edited: !joke.edited,
          text: action.jokePayload,
        };
      });
    }

    default:
      return state;
  }
}
