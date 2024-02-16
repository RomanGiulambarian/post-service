import Login from "../app/login";
import Main from "../app/main";
import MainLayout from "../components/main-layout";
import RequireAuth from "./RequireAuth";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <Main />
          </RequireAuth>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <h1>Нет страницы</h1>,
      },
    ],
  },
];
