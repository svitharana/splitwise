import { Plus } from "lucide-react";
import ExpenseDetails from "../components/expenseDetails";
import { useTrackingStore } from "../store";
import { useNavigate } from "react-router-dom";

export default function Expenses() {
  const expenses = useTrackingStore((state) => state.expenses);
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="flex flex-col items-center my-5 border mx-6 rounded-lg py-5">
        <span className="uppercase text-sm ">Total Group Spending</span>
        <span className="font-extrabold text-3xl">Rs.123,000</span>
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
