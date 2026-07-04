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
  removeExpense: (id: string) => void;
  editExpense: (expense: Expense) => void;
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
          users: state.users.filter((user) => user.id !== id),
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
      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),
      editExpense: (updatedExpense) => {
        set((state) => ({
          expenses: state.expenses.map((expense) => {
            if (expense.id === updatedExpense.id) {
              return updatedExpense;
            }
            return expense;
          }),
        }));
      },
    }),
    { name: "budget-tracking-storage" },
  ),
);
