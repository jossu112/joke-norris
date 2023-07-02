import { CAT_NOT_SET } from "../conf.js";
const initialState = [];

function fetchTime() {
  return new Date();
}

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
          fetchTime: fetchTime(),
          saved: false,
          edited: false,
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
