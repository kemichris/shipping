import { FaBox } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";

import { CtaCard } from "./CtaCard";

  const ctaDetails = [
    {
      title: "Are You A Sender?",
      text: "We have multiple lucrative packages for individual senders",
      icon: <FaBox />,
      to: "/tracking",
      btnText: "Check Packages",
      style: "bg-black/10 border border-black/15",
      hcolor: "text-text-dark"
    },
    {
      title: "Are You A Shipper?",
      text: "Lucrative incentives and facilities for large scale shipping consignments",
      icon: <FaHandshake />,
      to: "/contact",
      btnText: "Contact Us",
      style: "bg-[#273345]",
      hcolor: "text-white"
    },
  ];

export function Cta() {
    return (
        <div className="flex gap-6 flex-col items-center md:flex-row md:justify-center pt-28">
        {ctaDetails.map(detail => (
          <CtaCard key={detail.title} {...detail} />
        ))}
      </div>
    )
}