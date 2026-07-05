import { UserRoundPlus } from "lucide-react";
import { useTrackingStore, type User } from "../store";
import UserDetails from "../components/userDetails";
import { useState } from "react";
import UserDialog from "../components/userDialog";

export default function Group() {
  const { users, addUser, updateUser } = useTrackingStore();
  const [userName, setUserName] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUserDialog = (isEdit: boolean, user?: User) => {
    setIsOpen(true);
    setUserName(isEdit ? user?.name || "" : "");
    setIsEditMode(isEdit);
    setSelectedUser(user || null);
  };

  return (
    <div className="mx-5">
      <div className="mt-5 "></div>
      <main className=" mt-10">
        {users.map((user) => (
          <UserDetails
            onTriggerEdit={handleUserDialog}
            name={user.name}
            id={user.id}
          />
        ))}
      </main>
      <UserDialog
        title="Add User"
        value={userName}
        onInputChange={setUserName}
        handleUser={(name) => {
          if (!isEditMode) {
            addUser(name);
          } else {
            updateUser({ id: selectedUser?.id || "", name: name });
          }
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      ;
      <button
        className="fixed bottom-15 text-white bg-blue-500 rounded-full p-2 right-0  mr-5 mb-5 shadow-lg shadow-blue-200"
        onClick={() => handleUserDialog(false)}
      >
        <UserRoundPlus className="pl-2 pb-2 pt-1 pr-1" size={48} />
      </button>
    </div>
  );
}
