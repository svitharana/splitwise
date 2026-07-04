import { ChartColumnDecreasingIcon, UsersRound, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `flex flex-col items-center p-2 ${isActive ? "text-blue-500 font-bold" : "text-gray-500"}`;
  };
  return (
    <nav className="bottom-0 fixed left-0 right-0 w-full flex justify-around  font-medium pb-2 text- tracking-wide">
      <NavLink className={linkStyles} to="/expenses">
        <Wallet />
        <span>Expenses</span>
      </NavLink>
      <NavLink className={linkStyles} to="/group">
        <UsersRound />
        <span>Group</span>
      </NavLink>
      <NavLink className={linkStyles} to="/report">
        <ChartColumnDecreasingIcon />
        <span>Report</span>
      </NavLink>
    </nav>
  );
}
