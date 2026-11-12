import { FaPlus, FaBoxesStacked } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

export const sidebarData = [{
  title: "Control Panel",
  links: [
    { name: "Dashboard", icon: RxDashboard, path: "/admin" },
    { name: "Shipments", icon: FaBoxesStacked, path: "/admin/shipments" },
    { name: "New Shipment", icon: FaPlus, path: "/admin/new-shipment" },
  ],
}];
