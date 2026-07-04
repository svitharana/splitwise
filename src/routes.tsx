import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Group from "./pages/groupPage";
import Expenses from "./pages/expensesPage";
import Report from "./pages/reportPage";
import ExpenseForm from "./components/expenseForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/group" />,
      },
      {
        path: "/group",
        element: <Group />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/expenses/new",
        element: <ExpenseForm />,
      },
      {
        path: "/expenses/edit/:id",
        element: <ExpenseForm />,
      },
    ],
  },
]);
