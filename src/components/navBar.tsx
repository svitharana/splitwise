import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `flex flex-col items-center p-2 ${isActive ? "text-blue-500 font-bold border-b-2" : "text-gray-500"}`;
  };
  return (
    <nav className="bottom-0 fixed left-0 w-full flex justify-around border pb-2 text-xl tracking-wide">
      <NavLink className={linkStyles} to="/expenses">
        <span>Expenses</span>
      </NavLink>
      <NavLink className={linkStyles} to="/group">
        <span>Group</span>
      </NavLink>
      <NavLink className={linkStyles} to="/report">
        <span>Report</span>
      </NavLink>
    </nav>
  );
}
