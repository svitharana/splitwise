import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <Routes>
        <Route element={<>Hellooo</>} path="/hello"></Route>
      </Routes>
    </BrowserRouter> */}
  </StrictMode>,
);
