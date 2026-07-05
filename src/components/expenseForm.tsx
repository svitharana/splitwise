import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import PayerForm from "./payerForm";
import { useNavigate, useParams } from "react-router-dom";
import { useTrackingStore, type PayerDetails } from "../store";

export default function ExpenseForm() {
  const { addExpense, editExpense } = useTrackingStore();

  const expenses = useTrackingStore((state) => state.expenses);

  const [description, setDescription] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [payers, setPayers] = useState<PayerDetails[]>([]);
  const addPayer = () => setPayers([...payers, { userId: "", amountPaid: 0 }]);
  const removePayer = (id: string) =>
    setPayers(payers.filter((payer) => payer.userId !== id));

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const currentExpense = expenses.find((exp) => exp.id === id);
      setDescription(currentExpense?.description || "");
      setTotalAmount(currentExpense?.amount || 0);
      setPayers(currentExpense?.payers || []);
    } else {
      setDescription("");
      setTotalAmount(0);
      setPayers([]);
    }
  }, [id]);

  let navigate = useNavigate();

  const handlePayerUpdate = (
    index: number,
    key: keyof PayerDetails,
    value: string | number,
  ) => {
    const updatedPayers = payers.map((payer, i) => {
      if (i === index) {
        return { ...payer, [key]: value };
      }
      return payer;
    });
    setPayers(updatedPayers);
  };

  return (
    <div className="flex flex-col bg-gray-50 ">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-4  flex justify-center items-center">
        <h1 className="font-medium text-lg">
          {id ? "Edit Expense" : "New Expense"}
        </h1>
      </div>

      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ">Description</label>
          <input
            type="text"
            className="w-full py-2.5 px-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Dinner, Grocery"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Total Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2  font-medium text-base">
              Rs.
            </span>
            <input
              type="number"
              inputMode="decimal"
              className="w-full py-2.5 pl-11 pr-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              placeholder="0.00"
              value={totalAmount === 0 ? "" : totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-gray-100 pb-2">
            <h2 className="font-semibold text-base">Payee Details</h2>
            <button
              type="button"
              onClick={addPayer}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 active:text-blue-800 bg-blue-50 active:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <UserRoundPlus size={18} />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {payers?.map((payer, index) => (
              <div
                key={index}
                className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm"
              >
                <PayerForm
                  onRemovePayer={removePayer}
                  payerId={payer.userId}
                  amount={payer.amountPaid}
                  onUserUpdate={(userId) =>
                    handlePayerUpdate(index, "userId", userId)
                  }
                  onAmountUpdate={(amount) =>
                    handlePayerUpdate(index, "amountPaid", amount)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-4 flex justify-between gap-3">
        <button
          type="button"
          className="w-1/2 bg-gray-100 py-3 rounded-xl font-semibold text-base"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-1/2 bg-blue-600 active:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-base"
          onClick={() => {
            if (id) {
              editExpense({
                id: id,
                description: description,
                amount: totalAmount,
                payers: payers,
              });
            } else {
              addExpense({
                description: description,
                amount: totalAmount,
                payers: payers,
              });
            }
            navigate(-1);
          }}
        >
          {id ? "Update" : "Add Expense"}
        </button>
      </div>
    </div>
  );
}
