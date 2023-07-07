import React from "react";
import { Link } from "react-router-dom";

function SidebarDetails() {
  function hideSidebar() {
    document.getElementById("sidebar").style.display = "none";
  }

  return (
    <div id="sidebar">
      <div>
        <button onClick={() => hideSidebar()} className="sidebar-btn-hide btn">
          Hide
        </button>

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
  );
}
export default SidebarDetails;
