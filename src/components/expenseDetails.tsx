import { Pencil, Trash2 } from "lucide-react";
import { useTrackingStore, type Expense } from "../store";
import { Link } from "react-router-dom";

export default function ExpenseDetails(expense: Expense) {
  const getPayer = useTrackingStore((state) => state.getUser);
  const removeExpense = useTrackingStore((state) => state.removeExpense);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl my-2 p-4 flex items-center justify-between">
      <div className="flex flex-col gap-2 pr-2 max-w-[65%]">
        <span className="uppercase font-bold tracking-wider text-md wrap-break-words">
          {expense.description}
        </span>
        <span className="text-gray-500 text-sm font-medium italic">
          Paid by:{" "}
          <span className="text-gray-700">
            {expense.payers.map((payer) => getPayer(payer.userId)).join(", ")}
          </span>
        </span>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <span className="font-bold text-lg">
          Rs. {expense.amount.toLocaleString()}
        </span>
        <div className="flex flex-row gap-2">
          <Link to={`/expenses/edit/${expense.id}`}>
            <Pencil
              size={36}
              className="text-green-800 bg-green-100 p-2 rounded-lg"
            />
          </Link>
          <Trash2
            onClick={() => removeExpense(expense.id)}
            size={36}
            className="text-red-800 bg-red-100 p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
