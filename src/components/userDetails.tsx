import { UserRound, UserRoundPen, X } from "lucide-react";
import { useTrackingStore, type User } from "../store";

interface DialogProps {
  onTriggerEdit: (isEdit: boolean, user: User) => void;
}

type Props = User & DialogProps;

export default function UserDetails({ name, id, onTriggerEdit }: Props) {
  const removeUser = useTrackingStore((state) => state.removeUser);

  return (
    <div className="w-full max-w-md px-3 py-4 flex justify-between items-center border border-l-3 border-l-blue-500 border-gray-200 rounded-xl shadow-sm my-3">
      <div className="flex w-full gap-2 ml-2 items-center ">
        <UserRound
          className="text-blue-800 bg-blue-100 p-2 rounded-lg"
          size={36}
        />
        <span className="font-medium  text-lg w-full">{name}</span>
      </div>
      <div className="flex gap-4 ">
        <UserRoundPen
          onClick={() => onTriggerEdit(true, { id: id, name: name })}
          className="text-green-800 bg-green-100 p-2 rounded-lg"
          size={36}
        />
        <X
          className="text-red-800 bg-red-100 p-2 rounded-lg"
          size={36}
          onClick={() => {
            removeUser(id);
          }}
        />
      </div>
    </div>
  );
}
