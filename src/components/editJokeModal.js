import "../style.css";
import { useState } from "react";

import { useDispatch } from "react-redux";

function EditJokeModal({ setShowModal, editJokeId, jokesObjectRedux }) {
  const dispatch = useDispatch();

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

export default EditJokeModal;
