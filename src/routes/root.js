import { Outlet, Link } from "react-router-dom";

export default function Root() {
  const date = new Date();

  return (
    <>
      <div id="sidebar">
        <div>
          {/* <img src="../img/logo.png" /> */}
          <img src="logo.png" height="90" width="140" alt={"logo"} />
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/jokes`}>Jokes page</Link>
            </li>
            <li>
              <Link to={`/about`}>About page</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
