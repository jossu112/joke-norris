import React from "react";

function SidebarHidden() {
  function showSidebar() {
    document.getElementById("sidebar").style.display = "inline-block";
    document.querySelector(".sidebar-btn-hide").style.display = "inline-block";

    document.getElementById("sidebar").style.width = "90vh";
  }
  return (
    <button className="sidebar-btn btn" onClick={() => showSidebar()}>
      Show
    </button>
  );
}

export default SidebarHidden;
