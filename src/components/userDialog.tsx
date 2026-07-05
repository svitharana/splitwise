import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import React, { useState } from "react";

interface Props {
  title: string;
  value: string;
  onInputChange: (val: string) => void;
  handleUser: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}

export default function UserDialog({
  value,
  title,
  onInputChange,
  handleUser,
  isOpen,
  setIsOpen,
}: Props) {
  const [error, setError] = useState<boolean>(false);

  const onSubmit = () => {
    if (value === "") {
      setError(true);
    } else {
      setError(false);
      setIsOpen(false);
      handleUser(value);
      onInputChange("");
    }
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {
        setIsOpen(false);
        setError(false);
      }}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 left-10 right-10">
        <div className="flex min-h-full items-center justify-center ">
          <DialogPanel className="w-full rounded-xl bg-white p-6 ">
            <DialogTitle as="h3" className="font-medium text-center text-lg ">
              {title}
            </DialogTitle>
            <input
              required={true}
              value={value}
              placeholder="Name"
              className={`w-full mt-3 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none   focus:border-transparent transition-all ${
                error
                  ? "ring-2 ring-red-500 bg-red-50/30"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
              onChange={(e) => onInputChange(e.target.value)}
            ></input>
            {error && (
              <span className="text-xs font-medium text-red-500">
                Name cannot be empty
              </span>
            )}

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 active:bg-blue-700 text-white py-3 rounded-xl font-medium "
                onClick={() => {
                  onSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
