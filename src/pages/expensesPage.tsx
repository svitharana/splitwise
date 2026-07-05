import { Plus } from "lucide-react";
import ExpenseDetails from "../components/expenseDetails";
import { useTrackingStore } from "../store";
import { useNavigate } from "react-router-dom";

export default function Expenses() {
  const { expenses, getTotalExpenses } = useTrackingStore();
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="flex flex-col items-center my-6 mx-6 p-6 shadow-lg rounded-3xl border-3 border-blue-500">
        <span className="text-sm font-medium tracking-widest text-slate-700 uppercase">
          Total Group Spending
        </span>
        <span className="mt-1 text-3xl font-black ">
          Rs. {getTotalExpenses().toLocaleString()}
        </span>
      </div>
      <span className="font-medium">Expense History</span>
      <div>
        {expenses.map((expense) => (
          <ExpenseDetails {...expense} />
        ))}
      </div>
      <button
        className="fixed bottom-15 text-white bg-blue-500 rounded-full p-2 right-0  mr-5 mb-5 shadow-lg shadow-blue-200"
        onClick={() => navigate("/expenses/new")}
      >
        <Plus size={48} />
      </button>
    </div>
  );
}
