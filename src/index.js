import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

import CreateQuizPage from "./pages/CreateQuizPage";
import DoQuizPage from "./pages/DoQuizPage";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateQuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/do_quiz",
    element: <DoQuizPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
