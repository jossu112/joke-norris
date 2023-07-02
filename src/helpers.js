import { useSelector } from "react-redux";

export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) throw new Error(`"${data.path}" is not a valid path`());

    return data;
  } catch (err) {
    console.error(`There is a problem with the API: ${err}`);
  }
};

export const JokesObjectRedux = () => {
  return useSelector((state) => state.jokes.map((joke) => joke));
};
