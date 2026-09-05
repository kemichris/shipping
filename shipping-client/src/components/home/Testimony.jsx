import { FaBox } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";

import { CtaCard } from "./CtaCard";
const testimonies = [
  {
    review:
      "I've been using this shipping company for a while now, and I must say, they never disappoint. Their staff are always friendly, and they take great care of my packages. I would recommend them to anyone looking for a reliable shipping service.",
    name: "- kristen Hans",
  },
  {
    review:
      "I've been using this shipping company for a while now, and I must say, they never disappoint. Their staff are always friendly, and they take great care of my packages. I would recommend them to anyone looking for a reliable shipping service.",
    name: "- kristen Hans",
  },
  {
    review:
      "I've been using this shipping company for a while now, and I must say, they never disappoint. Their staff are always friendly, and they take great care of my packages. I would recommend them to anyone looking for a reliable shipping service.",
    name: "- kristen Hans",
  },
];

export function Testimony() {
  const ctaDetails = [
    {
      title: "Are You A Sender?",
      text: "We have multiple lucrative packages for individual senders",
      icon: <FaBox />,
      to: "/tracking",
      btnText: "Check Packages",
      style: "bg-black/10 border border-black/15",
    },
    {
      title: "Are You A Shipper?",
      text: "Lucrative incentives and facilities for large scale shipping consignments",
      icon: <FaHandshake />,
      to: "/contact",
      btnText: "Contact Us",
      style: "bg-[#273345]",
    },
  ];
  return (
    <section className=" flex flex-col items-center pt-12 pb-20 px-8 bg-bg-white">
      <h2 className="font-bold text-3xl md:text-4xl text-black mb-8 text-center">
        Client <span className="text-primary-light">Testimonials</span>
      </h2>
      <div className="grid grid-col-1 md:grid-cols-3 gap-8">
        {testimonies.map((testimony) => (
          <div
            key={testimony.name}
            className="rounded-lg shadow-lg bg-white p-6"
          >
            <blockquote className="text-center text-gray-500 italic mb-4">
              "{testimony.review}"
            </blockquote>
            <small className=" text-center">{testimony.name}</small>
          </div>
        ))}
      </div>

      <div className="flex gap-6 flex-col md:flex-row pt-28">
        {ctaDetails.map(detail => (
          <CtaCard key={detail.title} {...detail} />
        ))}
      </div>
    </section>
  );
}
