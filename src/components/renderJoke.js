import "../style.css";
import { useState, useEffect } from "react";

import { API_URL } from "../conf.js";
import { getJSON } from "../helpers";

import { useDispatch } from "react-redux";

// Render new joke
function RenderJoke({ categoryFilter, setCategoryFilter, jokesObjectRedux }) {
  let saveButton = "SAVE";

  const initText =
    "Nothing to show yet, start rendering jokes by choosing the category";
  const [joke, setJoke] = useState(initText);
  const [lastJokeId, setLastJokeId] = useState("");

  const dispatch = useDispatch();

  const disableButton = function (currentJokeId) {
    const saveBtn = document.querySelector(".rendered-joke-btn");
    saveBtn.removeAttribute("disabled", "");
    if (jokesObjectRedux.length !== 0) {
      const id = jokesObjectRedux
        .map((jokes) => (jokes.saved ? jokes.id : null))
        .filter((result) => result !== null);

      for (const value of id) {
        if (value === currentJokeId) {
          saveButton = "SAVED";
          saveBtn.setAttribute("disabled", "");
        }
      }
    }
  };

  useEffect(() => {
    if (categoryFilter === false) return;

    getJSON(
      categoryFilter
        ? `${API_URL}random?category=${categoryFilter}`
        : `${API_URL}random`
    ).then((res) => {
      setJoke(res.value);
      setLastJokeId(res.id);

      if (jokesObjectRedux.find((arrEl) => arrEl.id === res.id)) return;

      dispatch({
        type: "jokes/jokesAdded",
        id: res.id,
        text: res.value,
        category: res.categories[0],
      });
    });

    setCategoryFilter(false);
  }, [categoryFilter]);

  const saveJoke = (id, joke) => {
    dispatch({
      type: "jokes/saveAndDelete",
      idPayload: id,
      textPayload: joke,
      deletedPayload: false,
    });
  };

  return (
    <li key={jokesObjectRedux.length - 1} className="new-joke-el">
      <p className="joke-description-new">{joke}</p>

      {joke === initText ? (
        <button className="btn rendered-joke-btn hidden"></button>
      ) : (
        <button
          className="btn rendered-joke-btn"
          onClick={() => saveJoke(lastJokeId, joke)}
        >
          {disableButton(lastJokeId)}
          {saveButton}
        </button>
      )}
    </li>
  );
}

export default RenderJoke;
