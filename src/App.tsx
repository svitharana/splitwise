import { matchPath, Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navBar";
import TopHeader from "./components/topHeader";

function App() {
  const paths = ["/expenses/new", "/expenses/edit/:id"];
  const location = useLocation();
  const hideNavBar = paths.some((path) => matchPath(path, location.pathname));
  return (
    <div>
      <TopHeader />
      <Outlet />
      {!hideNavBar && <NavBar />}
    </div>
  );
}

export default App;
