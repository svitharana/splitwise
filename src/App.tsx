import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navBar";
import TopHeader from "./components/topHeader";

function App() {
  const location = useLocation();
  const hideNavBar = "/expenses/new" === location.pathname;
  return (
    <div>
      <TopHeader />
      <Outlet />
      {!hideNavBar && <NavBar />}
    </div>
  );
}

export default App;
