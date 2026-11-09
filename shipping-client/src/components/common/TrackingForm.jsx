import { FaSearchLocation } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const value = trackingNumber.trim();

    if (value) {
      navigate(`/tracking/${encodeURIComponent(value)}`);
    }
  }

  return (
    <div className="my-6 w-full max-w-2xl rounded-2xl border border-white/40 bg-white/15 p-4 shadow-xl backdrop-blur-xl sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <input
          type="search"
          name="trackingNumber"
          id="tracking-number"
          value={trackingNumber}
          onChange={(event) => setTrackingNumber(event.target.value)}
          required
          aria-label="Tracking number"
          placeholder="Enter your tracking ID"
          className="h-12 min-h-12 flex-1 rounded-lg bg-white px-4 text-base text-slate-900 outline-none ring-primary-light placeholder:text-slate-500 focus:ring-2"
        />
        <button
          type="submit"
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary-light to-primary-dark px-6 py-3 font-semibold text-white transition-colors hover:from-primary-dark hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark md:w-auto"
        >
          <FaSearchLocation />
          Track Now
        </button>
      </form>
      <p className="mt-3 text-left text-xs text-white/90">Portfolio demo number: <span className="font-semibold">39439309303</span></p>
    </div>
  );
}
