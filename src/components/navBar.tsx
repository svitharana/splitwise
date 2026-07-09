import { ChartColumnDecreasingIcon, UsersRound, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `flex flex-col items-center p-2 text-xs ${isActive ? "text-blue-500 font-bold" : "text-gray-500"}`;
  };
  return (
    <nav className="bottom-0 fixed left-0 right-0 w-full flex justify-around bg-slate-500 rounded-t-2xl drop-shadow-2xl font-medium pb-2 text- tracking-wide">
      <NavLink className={linkStyles} to="/expenses">
        <Wallet size={20} />
        <span>Expenses</span>
      </NavLink>
      <NavLink className={linkStyles} to="/group">
        <UsersRound size={20} />
        <span>Group</span>
      </NavLink>
      <NavLink className={linkStyles} to="/report">
        <ChartColumnDecreasingIcon size={20} />
        <span>Report</span>
      </NavLink>
    </nav>
  );
}
