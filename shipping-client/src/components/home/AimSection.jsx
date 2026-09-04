import { FaClipboardList, FaBox, FaWarehouse } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

const services = [
  {
    number: "01",
    title: "Cost Optimization",
    icon: <FaClipboardList />,
  },
  {
    number: "02",
    title: "Reduce Transit Timing",
    icon: <FaBox />,
  },
  {
    number: "03",
    title: "Warehouse Operation",
    icon: <FaWarehouse />,
  },
];

import aimImg1 from "../../assets/aimImg1.png";
export function AimSection() {
  return (
    <section className="bg-linear-to-r from-[#1E2D4C] to-primary-light py-12 px-8 flex flex-col md:flex-row md:items-center gap-8">
      <img
        src={aimImg1}
        alt=""
        className="w-full md:w-[30%] h-auto animate-bounce-slightly"
      />
      <div>
        <p className="font-semibold text-lg text-orange-500 mb-2">
          Our Dedication
        </p>
        <h2 className="font-bold text-3xl md:text-4xl text-white mb-6">
          We only aim to contribute well to your businesses
        </h2>

        <div className="grid  grid-cols-1 gap-6 md:grid-cols-3 pb-8">
          {services.map((service) => (
            <div
              key={service.number}
              className="relative overflow-hidden   rounded-2xl border border-white/15 bg-white/10"
            >
              <div className="flex justify-between items-start pr-4">
                <div className="flex h-14 w-18 items-center justify-center rounded-br-3xl rounded-tr-3xl bg-orange-500 text-white text-xl">
                  {service.icon}
                </div>

                <span className="  text-xl font-bold  text-white/10">
                  {service.number}
                </span>
              </div>

              {/* Content */}
              <div className="items-center px-4 mt-4 mb-4">
                <h3 className="max-w-xs text-lg font-semibold text-center text-white">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className=" pt-6 border-t border-gray-500 flex items-center gap-4 ">
          <ImUsers size={35} className="text-orange-500" />
          <p class="text-sm text-gray-300">
            Trusted by <strong class="text-white font-semibold">89,000+</strong>{" "}
            businesses. Moving your parcel across the world.
          </p>
        </div>
      </div>
    </section>
  );
}
