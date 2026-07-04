import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

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
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 left-10 right-10">
        <div className="flex min-h-full items-center justify-center ">
          <DialogPanel className="w-full rounded-xl bg-white p-6 ">
            <DialogTitle as="h3" className="font-medium text-center">
              {title}
            </DialogTitle>
            <input
              required={true}
              value={value}
              placeholder="Name"
              className="w-full mt-3 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => onInputChange(e.target.value)}
            ></input>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="w-1/2 bg-blue-600 active:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-base"
                onClick={() => {
                  setIsOpen(false);
                  handleUser(value);
                  onInputChange("");
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
