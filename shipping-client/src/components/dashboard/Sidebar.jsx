import { sidebarData } from "./sidebarData";
import { SidebarItem } from "./SidebarItem";
import Logo from "../../assets/shipping_logo.png";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside
      className={`fixed left-0 top-20 z-20 h-[calc(100vh-5rem)] w-60 overflow-y-auto border-r border-gray-200 bg-cyan-50 px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="mb-6 flex h-12 items-center border-b border-gray-200 px-5 pb-5">
        <img
          src={Logo}
          alt="SwiftShip"
          className="h-10 w-auto object-contain"
        />
      </div>
      {sidebarData.map((section) => (
        <div key={section.title} className="mb-8">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wide text-primary-dark">
            {section.title}
          </p>
          {section.links.map((link) => (
            <SidebarItem
              key={link.path}
              link={link}
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </div>
      ))}
    </aside>
  );
}
