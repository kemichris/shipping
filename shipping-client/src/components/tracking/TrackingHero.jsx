import { TrackingForm } from "../common/TrackingForm";
import { WhyUs } from "./WhyUs";

export function TrackingHero() {
  return (
    <section className="bg-secondary-dark flex flex-col items-center justify-center w-full h-[50vh] mt-10">
      

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-white">
          Track Your <span className="text-primary-light">Shipment</span>
        </h1>

        <p className="text-gray-200 text-base md:text-lg text-center">
          Real-time tracking and premium delivery experience
        </p>

        <TrackingForm />

        <WhyUs />
      </div>
    </section>
  );
}
