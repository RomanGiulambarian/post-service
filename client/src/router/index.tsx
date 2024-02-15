import Login from "../app/login";
import Main from "../app/main";
import MainLayout from "../components/main-layout";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Main />,
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
