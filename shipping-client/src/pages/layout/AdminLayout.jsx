import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Header } from "../../components/dashboard/Header";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem("username");
  return <div className="min-h-screen bg-slate-50">
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    {sidebarOpen && <button type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-10 bg-slate-950/35 lg:hidden"/>}
    <Header username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    <main className="min-h-screen bg-slate-50 px-4 pb-8 pt-24 sm:px-6 lg:ml-60 lg:px-8"> <Outlet/> </main>
  </div>;
}
