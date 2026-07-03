import { UserRoundPen, X } from "lucide-react";
import { useTrackingStore, type User } from "../store";

export default function UserDetails({ name, id }: User) {
  const removeUser = useTrackingStore((state) => state.removeUser);
  return (
    <div className="w-full max-w-md px-5 py-4 flex justify-between items-center border border-gray-200 rounded-lg shadow-sm my-3">
      <div className="flex flex-col  w-full px-2 ml-2 ">
        <span>{name}</span>
        <span>+ Rs.1000</span>
      </div>
      <div className="flex gap-4">
        <UserRoundPen size={24} />
        <X
          size={24}
          onClick={() => {
            removeUser(id);
          }}
        />
      </div>
    </div>
  );
}
