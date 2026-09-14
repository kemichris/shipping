
import { sidebarData } from "./sidebardata";
import { SidebarItem } from "./SidebarItem";

import Logo from "../../assets/shiplogo.png";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
    return (
        <aside
            className={`
                w-60 
              bg-bg-white 
                fixed 
                left-0 
                top-20
                h-screen 
                overflow-y-auto
                px-4
                py-8
                pb-20
                z-20
                scrollbar-thumb-sky-700
                border-r
                border-gray-200
                transition-transform 
                duration-300
                ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
                lg:translate-x-0
            `}
        >


            <div className="h-10 flex items-center px-6 border-b mb-6 border-gray-200">
                <img src={Logo} alt="" className="w-10 h-auto" />
            </div>
            {sidebarData.map((section) => (
                <div key={section.title} className="mb-8">
                    <p className="text-xs text-primary-dark mb-4">{section.title}</p>

                    {section.links.map((link) => (
                        <SidebarItem key={link.path} link={link} setSidebarOpen={setSidebarOpen} />
                    ))}
                </div>
            ))}

        </aside>
    );
}
