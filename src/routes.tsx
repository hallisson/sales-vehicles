// @ts-nocheck
import AuthLayout from "./layouts/Auth";
import AuthGuard from "./components/guards/AuthGuard";
import DashboardLayout from "./layouts/Dashboard";
import Login from "./pages/auth/login";
import List from "./pages/motorcycle/list";
import Perfil from "./pages/perfil"
// import Page404 from "./pages/auth/Page404";

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: `/`,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <List />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
    ]
  },
];

export default routes;
