import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { logout } from "../../services/auth.service";

const titles = [["/admin/shipments/", "Shipment details"], ["/admin/shipments", "Shipment management"], ["/admin/new-shipment", "Create shipment"], ["/admin", "Dashboard"]];

export function Header({ sidebarOpen, setSidebarOpen, username }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const title = titles.find(([path]) => location.pathname.startsWith(path))?.[1] || "Dashboard";
  const handleLogout = () => { logout(); setProfileOpen(false); navigate("/login", { replace: true }); };
  return <header className="fixed right-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-cyan-100 px-4 py-4 sm:px-6">
    <button type="button" aria-label={sidebarOpen ? "Close navigation" : "Open navigation"} aria-expanded={sidebarOpen} className="rounded-md p-2 text-slate-700 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <HiOutlineXMark size={24}/> : <HiOutlineBars3 size={24}/>}</button>
    <div className="ml-1 sm:ml-3"><h1 className="text-xl font-bold text-primary-light sm:text-2xl">{title}</h1><p className="text-xs text-text-dark sm:text-sm">SwiftShip operations</p></div>
    <div className="relative"><button type="button" aria-label="Open admin account menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-2 rounded-lg p-2 hover:bg-white/60"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white"><FaUser className="text-text-dark"/></span><span className="hidden max-w-36 truncate text-sm font-semibold sm:block">{username || "Admin"}</span></button>
      {profileOpen && <div className="absolute right-0 top-12 z-60 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"><div className="border-b p-4"><p className="truncate font-semibold text-slate-900">{username || "Admin"}</p><p className="text-xs text-slate-500">Administrator</p></div><button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-rose-700 hover:bg-rose-50"><HiOutlineArrowRightOnRectangle size={19}/>Sign out</button></div>}
    </div>
  </header>;
}
