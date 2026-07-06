import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import PayerForm from "./payerForm";
import { useNavigate, useParams } from "react-router-dom";
import { useTrackingStore, type PayerDetails } from "../store";
import ErrorForm from "./errorForm";
import Select from "react-select/creatable";
import { Textarea } from "@headlessui/react";

interface FormErrors {
  category: boolean;
  amount: boolean;
  payers: boolean;
  payerTotal: boolean;
}

export default function ExpenseForm() {
  const { addExpense, editExpense } = useTrackingStore();

  const expenses = useTrackingStore((state) => state.expenses);

  const [description, setDescription] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([
    "Ride",
    "Grocery",
    "Food",
    "Dinner",
  ]);

  const [payers, setPayers] = useState<PayerDetails[]>([]);

  const [errors, setErrors] = useState<FormErrors>({
    category: false,
    amount: false,
    payers: false,
    payerTotal: false,
  });

  const addPayer = () =>
    setPayers([
      ...payers,
      {
        userId: "",
        amountPaid: 0,
      },
    ]);
  const removePayer = (index: number) =>
    setPayers(payers.filter((_, i) => i != index));

  const onValidationCheck = () => {
    const formErrors: FormErrors = {
      category: category === "",
      amount: totalAmount < 0 || !totalAmount,
      payers: payers.length === 0,
      payerTotal:
        payers
          .flatMap((payer) => payer.amountPaid)
          .reduce((arr, curr) => arr + curr, 0) !== totalAmount,
    };

    setErrors(formErrors);
    return !Object.values(formErrors).includes(true);
  };

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

  const handleOnSubmit = () => {
    if (id) {
      editExpense({
        id: id,
        category: category,
        description: description,
        amount: totalAmount,
        payers: payers,
      });
    } else {
      addExpense({
        description: description,
        category: category,
        amount: totalAmount,
        payers: payers,
      });
    }
    navigate(-1);
  };
  return (
    <div className="flex flex-col bg-gray-50 ">
      <div className="border-b border-gray-200 py-4 px-4  flex justify-center items-center">
        <h1 className="font-medium text-lg">
          {id ? "Edit Expense" : "New Expense"}
        </h1>
      </div>

      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ">Category</label>
          <Select
            onBlur={onValidationCheck}
            isClearable
            className={`w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none ${
              errors.category
                ? "ring-2 ring-red-500 bg-red-50/30"
                : "focus:ring-2 focus:ring-blue-500"
            } focus:border-transparent transition-all text-base`}
            placeholder="e.g., Dinner, Grocery"
            value={category ? { label: category, value: category } : null}
            onCreateOption={(option) => setCategories([...categories, option])}
            options={categories.map((category) => ({
              value: category.toLowerCase(),
              label: category,
            }))}
            onChange={(category) => {
              setCategory(category?.label || "");
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                paddingTop: "2px",
                paddingBottom: "2px",
                borderColor: "#d1d5db",
              }),
            }}
          />
          {errors.category && <ErrorForm errorMsg="Please select a category" />}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Total Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2  font-medium text-base">
              Rs.
            </span>
            <input
              onBlur={onValidationCheck}
              type="number"
              inputMode="decimal"
              className={`w-full py-2.5 pl-11 pr-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none ${
                errors.amount
                  ? "ring-2 ring-red-500 bg-red-50/30"
                  : "focus:ring-2 focus:ring-blue-500"
              } focus:border-transparent transition-all text-base`}
              placeholder="0.00"
              value={totalAmount === 0 ? "" : totalAmount}
              onChange={(e) => {
                setTotalAmount(Number(e.target.value));
              }}
            />
          </div>
          {errors.amount && (
            <ErrorForm errorMsg="Please enter a valid amount" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ">Description</label>
          <Textarea
            onBlur={onValidationCheck}
            className="w-full py-2.5 px-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Additional Information"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={3}
          />
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
          {errors.payers && (
            <ErrorForm errorMsg="There should be atleast 1 payer" />
          )}
          {errors.payerTotal && !errors.payers && (
            <ErrorForm errorMsg="The total amount does not equal to the sum of individual payer amount" />
          )}

          <div className="flex flex-col gap-3">
            {payers?.map((payer, index) => (
              <div
                key={index}
                className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm"
              >
                <PayerForm
                  onRemovePayer={() => removePayer(index)}
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
            if (onValidationCheck()) {
              handleOnSubmit();
            }
          }}
        >
          {id ? "Update" : "Add Expense"}
        </button>
      </div>
    </div>
  );
}
