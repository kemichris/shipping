import { FaMapMarkedAlt, FaBell } from "react-icons/fa6";
import { RiTimeZoneFill } from "react-icons/ri";

import { SectionHeader } from "../services/SectionHeader";

export function WhyUs() {
  const whys = [
    {
      icon: <RiTimeZoneFill />,
      title: "Real-Time Updates",
      text: "Get instant updates on the location and status of your shipment at every step of its journey.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Route Map Visualization",
      text: "Visualize the transit path of your package on an interactive map, including departure and delivery locations.",
    },
    {
      icon: <FaBell />,
      title: "Instant Notification",
      text: "Stay informed with automatic status updates from our logistics network to make sure you never miss a package.",
    }
  ];

  return (
    <section className="py-16 px-8 bg-bg-white">
      <SectionHeader
        blackText="Why Use Our"
        blueText="Tracking System"
      />

      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-4">
        {whys.map((why, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-xl text-primary-light">
              {why.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">{why.title}</h3>
            <p className="text-sm text-text-dark text-center">{why.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}