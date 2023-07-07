import { Outlet, Link } from "react-router-dom";
import SidebarDetails from "../components/sidebar/sidebarDetails";
import SidebarHidden from "../components/sidebar/sidebarHidden";

function Root() {
  return (
    <>
      <SidebarHidden />
      <SidebarDetails />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
export default Root;
