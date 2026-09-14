import { AdminLayout } from "../pages/layout/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";

export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
     
    ],
  },
];
