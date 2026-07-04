import { UserRound, UserRoundPen, X } from "lucide-react";
import { useTrackingStore, type User } from "../store";
import { useState } from "react";
import UserDialog from "./userDialog";

export default function UserDetails({ name, id }: User) {
  const removeUser = useTrackingStore((state) => state.removeUser);
  const [value, setValue] = useState<string>("");
  let [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-md px-3 py-4 flex justify-between items-center border border-gray-200 rounded-lg shadow-sm my-3">
      <div className="flex w-full gap-2 ml-2 items-center ">
        <UserRound
          className="text-blue-800 bg-blue-100 p-2 rounded-lg"
          size={36}
        />
        <span className="font-medium  text-lg w-full">{name}</span>
      </div>
      <div className="flex gap-4 ">
        <UserRoundPen
          onClick={() => setIsOpen(true)}
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
      <UserDialog
        title="Update User"
        value={value}
        onInputChange={setValue}
        handleUser={updateUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
