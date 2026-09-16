import { useEffect, useState } from "react";
import { RecentShipment } from "../../components/dashboard/RecentShipment";
import { Stats } from "../../components/dashboard/Stats";
import { PageLoader } from "../../components/common/PageLoader";

import { getDashboard } from "../../services/dashboard.service";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboard();
        console.log(res.data);
        setDashboardData(res.data);
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

   if (loading) {
    return <PageLoader />;
  }

  if (!dashboardData) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-text-muted">Unable to load dashboard data.</p>
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Shipments",
      stat: dashboardData.totalShipments,
      timeline: "All time",
      style: "border-blue-500",
    },
    {
      title: "Pending",
      stat: dashboardData.pending,
      timeline: "Pending confirmation",
      style: "border-red-500",
    },
    {
      title: "In Transit",
      stat: dashboardData.inTransit,
      timeline: "Active",
      style: "border-yellow-500",
    },
    {
      title: "Delivered",
      stat: dashboardData.delivered,
      timeline: "Completed",
      style: "border-green-500",
    },
  ];

  return (
    <>
      <Stats statDatas={statsData} />
      <RecentShipment recentShipments={dashboardData.recentShipments} />
    </>
  );
}
