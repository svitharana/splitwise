import Select from "react-select";
import { useTrackingStore } from "../store";
import { X } from "lucide-react";
import { useState } from "react";
import ErrorForm from "./errorForm";

interface PayerErrors {
  payerEmpty: boolean;
  amountInvalid: boolean;
}

interface Props {
  payerId: string;
  amount: number;
  onRemovePayer: () => void;
  onUserUpdate: (val: string) => void;
  onAmountUpdate: (val: number) => void;
}

export default function PayerForm({
  onUserUpdate,
  onAmountUpdate,
  onRemovePayer,
  payerId,
  amount,
}: Props) {
  const { users, getUser } = useTrackingStore();

  const [errors, setErrors] = useState<PayerErrors>({
    payerEmpty: false,
    amountInvalid: false,
  });

  const onValidationCheck = () => {
    const payerErrors: PayerErrors = {
      payerEmpty: payerId === "",
      amountInvalid: amount < 0 || !amount,
    };
    setErrors(payerErrors);
  };
  return (
    <div className="flex flex-col">
      <form className="flex flex-row gap-3 items-center px-2 py-2">
        <div className="w-[50%]">
          <Select
            onBlur={onValidationCheck}
            className="rounded-xl"
            placeholder="Payee"
            isSearchable={false}
            value={payerId ? { label: getUser(payerId), value: payerId } : null}
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            onChange={(payer) => onUserUpdate(payer?.value || "")}
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
          {/* {errors.payerEmpty && <ErrorForm errorMsg="Please select an user" />} */}
        </div>
        <div className=" w-[50%]">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2  font-medium text-base">
              Rs.
            </span>
            <input
              onBlur={onValidationCheck}
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={amount === 0 ? "" : amount}
              className="w-full py-2 pl-11 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => onAmountUpdate(Number(e.target.value))}
            ></input>
          </div>
          {/* {errors.amountInvalid && (
          <ErrorForm errorMsg="Please enter a valid amount" />
        )} */}
        </div>
        <X onClick={onRemovePayer} size={20} className="text-gray-500" />
      </form>
      <div className="flex row pl-4 pr-4">
        <div className="w-1/2">
          {errors.payerEmpty && <ErrorForm errorMsg="Please select an user" />}
        </div>
        <div className="w-1/2">
          {errors.amountInvalid && (
            <ErrorForm errorMsg="Please enter a valid amount" />
          )}
        </div>
      </div>
    </div>
  );
}
