import { CAT_NOT_SET } from "../conf.js";
const initialState = [];

function nextJokeId(jokes) {
  const maxId = jokes.reduce((maxId, joke) => Math.max(joke.id, maxId), -1);
  return maxId + 1;
}
function fetchTime() {
  // const maxId = jokes.reduce((maxId, joke) => Math.max(joke.id, maxId), -1);
  return new Date();
}

// function editJoke(joke) {}

export default function jokesReducer(state = initialState, action) {
  switch (action.type) {
    case "jokes/jokesAdded": {
      // Can return just the new jokes array - no extra object around it

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
        if (joke.id !== action.payload) {
          return joke;
        }
        return {
          ...joke,
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

    case "todos/colorSelected": {
      const { color, todoId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          color,
        };
      });
    }
    case "jokes/jokeDeleted": {
      return state.filter((joke) => joke.id !== action.payload);
    }
    case "todos/allCompleted": {
      return state.map((todo) => {
        return { ...todo, completed: true };
      });
    }
    case "todos/completedCleared": {
      return state.filter((todo) => !todo.completed);
    }
    default:
      return state;
  }
}
