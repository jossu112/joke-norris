import "./style.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader } from "./routes/root.js";
import ErrorPage from "./error-page.js";
import Jokes from "./routes/jokes.js";
import About from "./routes/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,

    children: [
      {
        path: "jokes",
        element: <Jokes />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="router-content">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
