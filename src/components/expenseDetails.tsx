import { useTrackingStore, type Expense } from "../store";

export default function ExpenseDetails(expense: Expense) {
  const getPayer = useTrackingStore((state) => state.getUser);
  return (
    <div className="bg-gray-100 border-b-2 border-gray-300 shadow-lg rounded-xl my-2 px-3 py-3 flex flex-row justify-between items-center">
      <div className="flex flex-col  gap-1  ">
        <span className="uppercase font-medium tracking-wide">
          {expense.description}
        </span>
        <span className="tracking-wide text-gray-500 text-md italic">
          Paid by:{" "}
          {expense.payers.map((payer) => getPayer(payer.userId)).join(", ")}
        </span>
      </div>
      <span className="flex font-medium tracking-wide text-xl">
        Rs. {expense.amount}
      </span>
    </div>
  );
}
