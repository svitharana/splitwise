import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import PayerForm from "./payerForm";
import { useNavigate } from "react-router-dom";
import { useTrackingStore, type PayerDetails } from "../store";

export default function ExpenseForm() {
  const addExpense = useTrackingStore((state) => state.addExpense);

  const [description, setDescription] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [payers, setPayers] = useState<PayerDetails[]>([]);
  const addPayer = () => setPayers([...payers, { userId: "", amountPaid: 0 }]);

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
    <div className="">
      <div className="flex flex-col px-2">
        <span className="font-medium self-center">Expense form</span>
        <form className="flex flex-col p-2">
          <span>Description</span>
          <input
            className="py-1 mt-2 px-2 border rounded-md"
            placeholder="Descrption"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </form>
        <form className="flex flex-col  p-2">
          <span>Amount</span>
          <input
            className="py-1 mt-2 px-2 border rounded-md"
            placeholder="Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
          ></input>
        </form>
      </div>
      <div className="mt-5 px-2 ">
        <div className="flex flex-row justify-between ">
          <span className="font-medium">Payee Details</span>
          <button>
            <UserRoundPlus size={24} onClick={addPayer} />
          </button>
        </div>
        <div className="flex flex-col">
          {payers?.map((_, index) => (
            <PayerForm
              onUserUpdate={(userId) =>
                handlePayerUpdate(index, "userId", userId)
              }
              onAmountUpdate={(amount) =>
                handlePayerUpdate(index, "amountPaid", amount)
              }
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 w-full px-2 flex justify-between gap-2 py-3 font-medium text-white text-lg">
        <button
          className="w-1/2 bg-gray-400 py-3 rounded-xl"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="whitespace-nowrap px-2 w-1/2 bg-red-600 py-3 rounded-xl"
          onClick={() => {
            navigate(-1);
            addExpense({
              description: description,
              amount: totalAmount,
              payers: payers,
            });
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
