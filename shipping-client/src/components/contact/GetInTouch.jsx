import {
  FaBoxOpen,
  FaQuestionCircle,
  FaReceipt,
  FaHandshake,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { SectionHeader } from "../services/SectionHeader";
import { ContactCard } from "./ContactCard";
import { Cta } from "../home/Cta";

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

const contactDetails = [
  {
    icon: <FaLocationDot />,
    title: "Our Location",
    text: "250 Moonachie Rd, Moonachie, NJ 07074, United States",
    contact: "",
  },

  {
    icon: <FaPhone />,
    title: "Phone Number",
    text: "24/7 Customer Support",
    contact: "+12748891407",
  },

  {
    icon: <FaEnvelope />,
    title: "Email Address",
    text: "For general inquiries and support",
    contact: "support@shipment.com",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-4 mt-12">
        <div className="rounded-lg shadow-md bg-white p-4 border border-gray-200 flex flex-col gap-12 md:justify-between">
          <div>
            <h3 className="font-semibold text-xl mb-3">Direct Email support</h3>
            <p className="text-text-dark mb-5">
              To serve you better and ensure your request reaches the right
              department immediately, we accept all inquiries directly via
              email. Please write to us matching one of the topics below:
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
          </div>

          <a
            href="mailto:airdropchris1@gmail.com"
            className=" bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center justify-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105 font-semibold"
          >
            <FaEnvelope />
            Send Direct Email
          </a>
        </div>

        <div className="flex flex-col gap-8 items-center">
          {contactDetails.map((contact) => (
            <ContactCard
              key={contact.title}
              icon={contact.icon}
              title={contact.title}
              text={contact.text}
              contact={contact.contact}
            />
          ))}
        </div>
      </div>

      <div>
        <Cta />
      </div>
    </section>
  );
}
