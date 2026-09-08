import { FaPrint } from "react-icons/fa";
import {ProgressBar} from "./ProgressBar";

export function ShipmentProgress() {
  return (
    <section className="mt-20 pb-4">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-8">
        <p>Payment Status</p>
        <p>
          Shipment Tracking: <span className="font-semibold">39439309303</span>
        </p>
        <button className="bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105 font-semibold">
          <FaPrint /> Print Shipment
        </button>
      </div>

      
        <ProgressBar />
    </section>
  );
}
