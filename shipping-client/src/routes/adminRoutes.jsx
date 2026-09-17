import { AdminLayout } from "../pages/layout/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { NewShipment } from "../pages/admin/NewShipment";

export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/new-shipment",
        element: <NewShipment />,
      },
     
    ],
  },
];
