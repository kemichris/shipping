import { AdminLayout } from "../pages/layout/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { NewShipment } from "../pages/admin/NewShipment";
import { Shipments } from "../pages/admin/Shipments";
import { ShipmentDetails } from "../pages/admin/ShipmentDetails";

export const adminRoutes = [{
  element: <AdminLayout />,
  children: [
    { path: "/admin", element: <Dashboard /> },
    { path: "/admin/shipments", element: <Shipments /> },
    { path: "/admin/shipments/:id", element: <ShipmentDetails /> },
    { path: "/admin/new-shipment", element: <NewShipment /> },
  ],
}];
