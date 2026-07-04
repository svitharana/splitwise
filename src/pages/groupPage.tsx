import { Plus } from "lucide-react";
import { useTrackingStore } from "../store";
import UserDetails from "../components/userDetails";
import { useState } from "react";

export default function Group() {
  const { users, addUser } = useTrackingStore();
  const [value, setValue] = useState<string>("");
  let [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mx-5">
      <div className="mt-5 ">
        <input
          required
          value={value}
          placeholder="Name"
          className=" w-full mb-4 text-2xl py-2 px-1"
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button
          onClick={() => {
            addUser(value);
            setValue("");
          }}
          className="flex w-full items-center justify-center gap-2 bg-blue-700 rounded-2xl text-xl text-white font-medium py-2"
        >
          <Plus size={32} strokeWidth={3} className="text-xl" />
          <span>Add User</span>
        </button>
      </div>
      <main className=" mt-10">
        {users.map((user) => (
          <UserDetails name={user.name} id={user.id} />
        ))}
      </main>
    </div>
  );
}
