import { FaShield, FaClock, FaGlobe } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

import { SectionHeader } from "./SectionHeader";

export function WhyChooseUs() {
  const whys = [
    {
      icon: <FaShield />,
      title: "Secure Handling",
      text: "Advanced security measures for all your shipments",
    },
    {
      icon: <FaClock />,
      title: "On-time Delivery",
      text: "99% on-time delivery rate with real-time tracking",
    },
    {
      icon: <BiSupport />,
      title: "24/7 Support",
      text: "Round-the-clock customer support for all your needs",
    },
    {
      icon: <FaGlobe />,
      title: "Global Network",
      text: "Services available in 207+ countries worldwide",
    },
  ];

  return (
    <section className="py-16 px-8 bg-bg-white">
      <SectionHeader
        blackText="Why Choose Our"
        blueText="Service"
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