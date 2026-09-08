import {
  FaLocationDot,
  FaCalendarDays,
  FaClock,
  FaCommentDots,
} from "react-icons/fa6";
import { MdOutlineSignpost } from "react-icons/md";

import { TrackSubHeader } from "./TrackSubHeader";

export function SenderRecipient() {
  return (
    <section className="mt-6 pb-6">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 sm:p-5" >
        <TrackSubHeader text="Sender" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
         
          <div className="border-b border-gray-300 pb-4 md:border-r md:pr-9 md:pb-4">
            <div className="flex items-start gap-4">
              <FaLocationDot className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">Country</p>

                <p className="mt-2  font-semibold text-slate-700">Syria</p>
              </div>
            </div>
          </div>

          {/* Origin City */}
          <div className="border-b border-gray-300 py-4 md:pl-9 md:py-0">
            <div className="flex items-start gap-4">
              <FaLocationDot className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">City Collection</p>

                <p className="mt-2  font-semibold text-slate-700">Al Atārib</p>
              </div>
            </div>
          </div>

          {/* Date of Shipment */}
          <div className="border-b border-gray-300 py-4 md:border-r md:pr-9">
            <div className="flex items-start gap-4">
              <FaCalendarDays className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">Date of shipment</p>

                <p className="mt-2  font-semibold text-slate-700">2026-06-10</p>
              </div>
            </div>
          </div>

          {/* Shipping Time */}
          <div className="border-b border-gray-300 py-4 md:pl-9">
            <div className="flex items-start gap-4">
              <FaClock className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-semibold text-gray-500">Shipping time</p>

                <p className="mt-2  font-semibold text-slate-700">8-12</p>
              </div>
            </div>
          </div>

          {/* Contact Name */}
          <div className="border-b border-gray-300 py-4 md:border-r md:pr-9">
            <div>
              <p className=" font-medium text-gray-500">Contact Name</p>

              <p className="mt-2  font-semibold text-slate-700">
                Alissa Talia usama
              </p>
            </div>
          </div>

          {/* Contact Address */}
          <div className="border-b border-gray-300 py-4 md:pl-9">
            <div className="flex items-start gap-4">
              <MdOutlineSignpost className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className="  text-gray-500">Contact Address</p>

                <p className="mt-2  font-semibold text-slate-700">Syria Damascus</p>
              </div>
            </div>
          </div>

          {/* Shipping Quantity */}
          <div className="border-b border-gray-300 py-4 md:border-r md:pr-9">
            <p className=" font-medium text-gray-500">Shipping quantity</p>

            <p className="mt-2  font-semibold text-slate-700">1</p>
          </div>

          {/* Total Weight */}
          <div className="border-b border-gray-300 py-4 md:pl-9">
            <p className=" font-semibold text-gray-500">Total weight</p>

            <p className="mt-2  font-semibold text-slate-700">20</p>
          </div>

          {/* Description */}
          <div className="py-4 md:col-span-2">
            <div className="flex items-start gap-4">
              <FaCommentDots className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-semibold text-gray-500">Description</p>

                <p className="mt-2  font-semibold text-slate-700">luggage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 sm:p-5 mt-4" >
        <TrackSubHeader text="Recipient" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
         
          <div className="border-b border-gray-300 pb-4 md:border-r md:pr-9 md:pb-4">
            <div className="flex items-start gap-4">
              <FaLocationDot className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">Delivery Country</p>

                <p className="mt-2  font-semibold text-slate-700">Syria</p>
              </div>
            </div>
          </div>

          {/* Origin City */}
          <div className="border-b border-gray-300 py-4 md:pl-9 md:py-0">
            <div className="flex items-start gap-4">
              <FaLocationDot className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">Delivery City</p>

                <p className="mt-2  font-semibold text-slate-700">Al Atārib</p>
              </div>
            </div>
          </div>

          {/* Date of Shipment */}
          <div className="border-b border-gray-300 py-4 md:border-r md:pr-9">
            <div className="flex items-start gap-4">
              <FaCalendarDays className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-medium text-gray-500">Shipping time</p>

                <p className="mt-2  font-semibold text-slate-700">8-12</p>
              </div>
            </div>
          </div>

          {/* Shipping Time */}
          <div className="border-b border-gray-300 py-4 md:pl-9">
            <div className="flex items-start gap-4">
              <FaClock className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className=" font-semibold text-gray-500">Estimated delivery date</p>

                <p className="mt-2  font-semibold text-slate-700">2026-06-10 07:00:18</p>
              </div>
            </div>
          </div>

          {/* Contact Name */}
          <div className="border-b border-gray-300 py-4 md:border-r md:pr-9">
            <div>
              <p className=" font-medium text-gray-500">Contact Name</p>

              <p className="mt-2  font-semibold text-slate-700">
                Alissa Talia usama
              </p>
            </div>
          </div>

          {/* Contact Address */}
          <div className="border-b border-gray-300 py-4 md:pl-9">
            <div className="flex items-start gap-4">
              <MdOutlineSignpost className="mt-0.5 shrink-0 text-3xl text-gray-300" />

              <div className="min-w-0 flex-1">
                <p className="  text-gray-500">Contact Address</p>

                <p className="mt-2  font-semibold text-slate-700">Syria Damascus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
