import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  Navigate,
  redirect,
} from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import UsersView from "./UsersView";
import TasksView from "./TasksView";
import LoginView from "./LoginView";
import http from "./http";
import ChangeStatusView from "./ChangeStatusView";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/tasks"),
  },
  {
    path: "/users",
    loader: async () => {
      const { data } = await http.get("users");
      return data;
    },
    element: <App element={UsersView} />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/tasks",
    loader: async () => {
      const { data } = await http.get("tasks");
      return data;
    },
    element: <App element={TasksView} />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/tasks/:id",
    loader: async ({ params: {id} }) => {
      const { data } = await http.get("tasks/" + id);
      return data;
    },
    element: <App element={ChangeStatusView} />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <App element={LoginView} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

function ErrorBoundary() {
  let error = useRouteError();
  const isAuthError = error.response?.status === 401
  console.info(error)
  return <Navigate to={isAuthError? '/login' : -1} replace={true} />;
}
