import { UserRoundPlus } from "lucide-react";
import { useTrackingStore } from "../store";
import UserDetails from "../components/userDetails";
import { useState } from "react";
import UserDialog from "../components/userDialog";

export default function Group() {
  const { users, addUser } = useTrackingStore();
  const [value, setValue] = useState<string>("");
  let [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mx-5">
      <div className="mt-5 ">
        <UserDialog
          title="Add User"
          value={value}
          onInputChange={setValue}
          handleUser={addUser}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <main className=" mt-10">
        {users.map((user) => (
          <UserDetails name={user.name} id={user.id} />
        ))}
      </main>
      <button
        className="fixed bottom-15 text-white bg-blue-500 rounded-full p-2 right-0  mr-5 mb-5 shadow-lg shadow-blue-200"
        onClick={() => setIsOpen(true)}
      >
        <UserRoundPlus className="pl-2 pb-2 pt-1 pr-1" size={48} />
      </button>
    </div>
  );
}
