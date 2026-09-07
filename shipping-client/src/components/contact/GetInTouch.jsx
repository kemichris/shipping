import {
  FaBoxOpen,
  FaQuestionCircle,
  FaReceipt,
  FaHandshake,
  FaEnvelope,
} from "react-icons/fa";

import { SectionHeader } from "../services/SectionHeader";

const emailEnquiries = [
  {
    icon: <FaBoxOpen />,
    title: "Parcel Delivery & Tracking",
    text: "Questions about active shipments, custom delivery routes, or scheduled pickups.",
  },
  {
    icon: <FaQuestionCircle />,
    title: "General Enquiries",
    text: "Information on office locations, opening hours, or general support questions.",
  },
  {
    icon: <FaReceipt />,
    title: "Quotes & Invoicing",
    text: "Request custom shipping estimates for bulky freight, cargo plane hires, or maritime charters.",
  },
  {
    icon: <FaHandshake />,
    title: "Partnership & Careers",
    text: "Interested in becoming a logistics partner, agent, or joining our global operations team.",
  },
];

export function GetInTouch() {
  return (
    <section className="py-12 px-8">
      <SectionHeader
        blackText="Get In"
        blueText="Touch"
        description="Have questions or need assistance? We're here to help! Reach out to our team for any inquiries about our services, shipping solutions, or partnership opportunities."
      />
      <div>
        <div>
          <h3 className="font-semibold text-xl mb-3">Direct Email support</h3>
          <p className="text-text-dark mb-5">
            To serve you better and ensure your request reaches the right
            department immediately, we accept all inquiries directly via email.
            Please write to us matching one of the topics below:
          </p>

          <div className="flex flex-col gap-6 mt-8">
            {emailEnquiries.map((enquiries) => (
              <div key={enquiries.title} className="flex items-start gap-4">
                <div className="flex justify-center items-center w-12 h-12 px-4 rounded-xl text-primary-light text-lg bg-sky-200 ">
                  {enquiries.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">
                    {enquiries.title}
                  </h3>
                  <p className="text-text-dark text-sm">{enquiries.text}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="mailto:"
            className="mt-20 bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center justify-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105 font-semibold"
          >
            <FaEnvelope />
            Send Direct Email
          </a>
        </div>
      </div>
    </section>
  );
}
