import React from "react";

import { useDispatch } from "react-redux";

function DeletedJokes({
  categoryOutputFilter,
  indexOfFirstPost,
  indexOfLastPost,
  factCount,
  setCategoryOutputFilter,
  jokesObjectRedux,
}) {
  const dispatch = useDispatch();

  function reactivateJoke(jokeId, joke) {
    dispatch({
      type: "jokes/saveAndDelete",
      idPayload: jokeId,
      textPayload: joke,
    });
    if (factCount <= 1) setCategoryOutputFilter("all");
  }

  return (
    <>
      <ul className="rendered-jokes">
        {jokesObjectRedux
          .map((joke) => (joke.deleted ? { ...joke } : null))
          .filter((result) => result !== null)
          .filter((result) =>
            categoryOutputFilter === "all"
              ? result
              : result?.category === categoryOutputFilter
          )

          .sort(
            (date1, date2) =>
              new Date(date2.fetchTime) - new Date(date1.fetchTime)
          )
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((joke) => (
            <li className="rendered-joke" key={joke.id}>
              <div>
                <p className="joke-description">{joke.text}</p>
              </div>
              <div className="actions">
                <button
                  className="btn"
                  onClick={() => reactivateJoke(joke.id, joke.text)}
                >
                  ACTIVATE
                </button>

                <span className="rendered-category deleted">
                  {joke.category ? joke.category : "RANDOM"}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default DeletedJokes;
