import { useEffect, useState } from "react";
import { RecentShipment } from "../../components/dashboard/RecentShipment";
import { Stats } from "../../components/dashboard/Stats";

import { getDashboard } from "../../services/dashboard.service";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboard();
        console.log(res.data);
        setDashboardData(res.data);
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };

    loadDashboard();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-text-muted">Unable to load dashboard data.</p>
      </div>
    );
  }

  return (
    <>
      <Stats />
      <RecentShipment />
    </>
  );
}
