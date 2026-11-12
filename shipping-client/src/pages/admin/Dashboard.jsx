import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RecentShipment } from "../../components/dashboard/RecentShipment";
import { Stats } from "../../components/dashboard/Stats";
import { getDashboard } from "../../services/dashboard.service";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadDashboard = useCallback(async () => {
    setLoading(true); setError("");
    try { const response = await getDashboard(); setDashboardData(response.data); }
    catch (requestError) { const message = requestError.response?.data?.message || "Could not load dashboard data."; setError(message); toast.error(message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const timer = setTimeout(loadDashboard, 0); window.addEventListener("shipment:changed", loadDashboard); return () => { clearTimeout(timer); window.removeEventListener("shipment:changed", loadDashboard); }; }, [loadDashboard]);

  if (loading && !dashboardData) return <div className="grid animate-pulse gap-4 md:grid-cols-2 xl:grid-cols-4">{Array.from({length:4},(_,index)=><div key={index} className="h-28 rounded-xl bg-slate-100"/>)}<div className="h-72 rounded-xl bg-slate-100 md:col-span-2 xl:col-span-4"/></div>;
  if (error && !dashboardData) return <div className="rounded-xl border border-rose-200 bg-white p-8 text-center"><p className="font-semibold text-rose-700">{error}</p><button type="button" onClick={loadDashboard} className="mt-3 font-semibold text-primary-light">Try again</button></div>;

  const statsData = [
    { title: "Total Shipments", stat: dashboardData?.totalShipments ?? 0, timeline: "All time", style: "border-blue-500" },
    { title: "Pending", stat: dashboardData?.pending ?? 0, timeline: "Awaiting pickup or payment", style: "border-amber-500" },
    { title: "In Transit", stat: dashboardData?.inTransit ?? 0, timeline: "Active deliveries", style: "border-sky-500" },
    { title: "Delivered", stat: dashboardData?.delivered ?? 0, timeline: "Completed", style: "border-emerald-500" },
  ];
  return <><title>SwiftShip | Admin Dashboard</title><div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-bold text-slate-900">Operations overview</h2><p className="mt-1 text-sm text-slate-500">Live shipment totals from the database.</p></div><button type="button" disabled={loading} onClick={loadDashboard} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">{loading?"Refreshing…":"Refresh"}</button></div><Stats statDatas={statsData}/><RecentShipment recentShipments={dashboardData?.recentShipments || []}/></>;
}
