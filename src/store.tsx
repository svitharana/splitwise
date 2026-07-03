import { create } from "zustand";
import User from "./components/userDetails";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
}

export interface PayerDetails {
  userId: string;
  amountPaid: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  payers: PayerDetails[];
}

interface TrackingStore {
  users: User[];
  expenses: Expense[];
  addUser: (name: string) => void;
  removeUser: (id: string) => void;
  getUser: (id: string) => string;
  addExpense: (expense: Omit<Expense, "id">) => void;
}
export const useTrackingStore = create<TrackingStore>()(
  persist(
    (set, get) => ({
      users: [],
      expenses: [],
      addUser: (name) =>
        set((state) => ({
          users: [...state.users, { id: crypto.randomUUID(), name: name }],
        })),
      removeUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id != id),
        })),
      getUser: (id) => {
        const { users } = get();
        return users.find((user) => user.id === id)?.name || "";
      },
      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            { ...expense, id: crypto.randomUUID() },
          ],
        })),
    }),
    { name: "budget-tracking-storage" },
  ),
);
