import "../style.css";
import { useState, useEffect } from "react";

import { API_URL, CAT_NOT_SET } from "../conf.js";
import { getJSON } from "../helpers";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

function Jokes() {
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [categoryOutputFilter, setCategoryOutputFilter] = useState("");

  useEffect(() => {
    getJSON(`${API_URL}categories`).then((res) => {
      setCategory(res);
    });
  }, []);

  return (
    <div className="jokes">
      <aside className="category-list">
        <ul>
          <li>
            <button
              className="btn btn-random"
              onClick={() => setCategoryFilter("")}
            >
              Random fact
            </button>
          </li>
          {category.map((cat) => (
            <li key={cat}>
              <button
                className="btn btn-category"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div>
        <ul className="new-joke">
          <RenderJoke
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </ul>
      </div>
      <div>
        <CategoryOutputFilter
          setCategoryOutputFilter={setCategoryOutputFilter}
          categoryOutputFilter={categoryOutputFilter}
        />
      </div>
      <div>
        <JokeListItem categoryOutputFilter={categoryOutputFilter} />
      </div>
    </div>
  );
}

// functions

const JokesObjectRedux = () => {
  return useSelector((state) => state.jokes.map((joke) => joke));
};

// Render new joke
function RenderJoke({ categoryFilter, setCategoryFilter }) {
  let saveButton = "SAVE";

  const jokesObjectRedux = JokesObjectRedux();

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

  const saveJoke = (id) => {
    dispatch({ type: "jokes/saveAndDelete", payload: id });
  };

  return (
    <li key={jokesObjectRedux.length - 1} className="new-joke-el">
      <p className="joke-description-new">{joke}</p>

      {joke === initText ? (
        <button className="btn rendered-joke-btn hidden"></button>
      ) : (
        <button
          className="btn rendered-joke-btn"
          onClick={() => saveJoke(lastJokeId)}
        >
          {disableButton(lastJokeId)}
          {saveButton}
        </button>
      )}
    </li>
  );
}

// CATEGORY FILTER

function CategoryOutputFilter({
  categoryOutputFilter,
  setCategoryOutputFilter,
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="filter-selector">
      <div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="category-filter-btn btn"
        >
          FILTER
        </button>
      </div>
      {showFilter ? (
        <FilterContent
          setCategoryOutputFilter={setCategoryOutputFilter}
          categoryOutputFilter={categoryOutputFilter}
        />
      ) : null}
    </div>
  );
}

function FilterContent({ categoryOutputFilter, setCategoryOutputFilter }) {
  const jokesObjectRedux = JokesObjectRedux();
  const [placeholder, setPlaceholder] = useState(categoryOutputFilter);

  return (
    <div className="filter-content">
      <select
        className="filter-content-options"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      >
        <option value="">ALL</option>
        {jokesObjectRedux
          .map((joke) => (joke.saved ? { ...joke } : null))
          .filter((result) => result !== null)
          .map((joke) => joke.category)
          .filter((value, index, array) => array.indexOf(value) === index)

          .map((cat) => (
            <option key={cat} value={cat}>
              {cat ? cat.toUpperCase() : CAT_NOT_SET.toLocaleUpperCase()}
            </option>
          ))}
      </select>
      <button
        onClick={() => setCategoryOutputFilter(placeholder)}
        className="category-filter-btn-apply btn"
      >
        APPLY FILTER
      </button>
    </div>
  );
}

// Render saved jokes
const JokeListItem = ({ categoryOutputFilter }) => {
  const [editJokeId, setEditJokeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const jokesObjectRedux = JokesObjectRedux();

  if (jokesObjectRedux.length === 0) return;

  function deleteJoke(jokeId) {
    dispatch({ type: "jokes/saveAndDelete", payload: jokeId });
  }

  return (
    <ul className="rendered-jokes">
      {jokesObjectRedux
        .map((joke) => (joke.saved ? { ...joke } : null))
        .filter((result) => result !== null)
        .filter((result) =>
          categoryOutputFilter === ""
            ? result
            : result.category === categoryOutputFilter
        )
        .sort(
          (date1, date2) =>
            new Date(date2.fetchTime) - new Date(date1.fetchTime)
        )

        .map((joke) => (
          <li className="rendered-joke" key={joke.id}>
            <div>
              <p className="joke-description">{joke.text}</p>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => deleteJoke(joke.id)}>
                DELETE
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowModal(true);
                  setEditJokeId(joke.id);
                }}
              >
                EDIT
              </button>
              <span className="rendered-category">
                {joke.category ? joke.category : "RANDOM"}
              </span>
            </div>
          </li>
        ))}

      {showModal ? (
        <div className="modal-window">
          <EditJokeModal setShowModal={setShowModal} editJokeId={editJokeId} />
        </div>
      ) : null}
    </ul>
  );
};

function EditJokeModal({ setShowModal, editJokeId }) {
  const dispatch = useDispatch();
  const jokesObjectRedux = JokesObjectRedux();

  const editableJoke = jokesObjectRedux
    .filter((joke) => joke.id === editJokeId)
    .map((joke) => joke.text);

  const [textEdit, setTextEdit] = useState(editableJoke);

  function editJoke(jokeId, joke) {
    dispatch({ type: "jokes/edit", idPayload: jokeId, jokePayload: joke });
  }

  return (
    <div className="modal-content">
      <div>
        <p id="modal-modal-title">Edit joke</p>

        {editableJoke.map(() => (
          <textarea
            value={textEdit}
            className="modal-modal-description"
            key={editJokeId}
            onChange={(e) => {
              setTextEdit(e.target.value);
            }}
          ></textarea>
        ))}

        <button
          className="btn-save-joke-edit btn"
          onClick={() => {
            editJoke(editJokeId, textEdit);
            setShowModal(false);
          }}
        >
          SAVE
        </button>
        <button
          className="btn-cancel-joke-edit btn"
          onClick={() => {
            setShowModal(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default Jokes;
