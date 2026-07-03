import Select from "react-select";
import { useTrackingStore } from "../store";
import { X } from "lucide-react";

interface Props {
  onUserUpdate: (val: string) => void;
  onAmountUpdate: (val: number) => void;
}

export default function PayerForm({ onUserUpdate, onAmountUpdate }: Props) {
  const users = useTrackingStore((state) => state.users);
  return (
    <form className="flex flex-row mt-3 justify-between gap-3 border items-center px-2 py-2">
      <Select
        className="w-50"
        isSearchable={false}
        placeholder="Payer..."
        options={users.map((user) => ({
          value: user.id,
          label: user.name,
        }))}
        onChange={(payer) => onUserUpdate(payer?.value || "")}
      />
      <input
        className="border py-2"
        onChange={(e) => onAmountUpdate(Number(e.target.value))}
        placeholder="Amount"
      ></input>
      <X />
    </form>
  );
}
