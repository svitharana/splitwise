import Select from "react-select";
import { useTrackingStore } from "../store";
import { X } from "lucide-react";

interface Props {
  payerId: string;
  amount: number;
  onRemovePayer: (id: string) => void;
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
  return (
    <form className="flex flex-row gap-3 items-center px-2 py-2">
      <Select
        className="w-[50%] rounded-xl"
        isSearchable={false}
        placeholder="Payer..."
        value={{ label: getUser(payerId), value: payerId }}
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
      <div className="relative w-[50%]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2  font-medium text-base">
          Rs.
        </span>
        <input
          value={amount}
          className="w-full py-2 pl-11 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          onChange={(e) => onAmountUpdate(Number(e.target.value))}
          placeholder="Amount"
        ></input>
      </div>
      <X
        onClick={() => onRemovePayer(payerId)}
        size={20}
        className="text-gray-500"
      />
    </form>
  );
}
