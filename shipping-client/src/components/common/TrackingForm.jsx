import { FaSearchLocation } from "react-icons/fa";

export function TrackingForm() {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/20 p-6 backdrop-blur-xl shadow-xl w-full my-6">
    <form className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      <input
        type="search"
        name=""
        id=""
        placeholder="Enter your tracking ID"
        className="h-12 min-h-12 bg-white rounded flex-1 px-2 text-base"
      />
      <button
        type="submit"
        className="shrink-0 w-full md:w-auto justify-center bg-linear-to-r from-primary-light to-primary-dark rounded-lg flex items-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105"
      >
        <FaSearchLocation />
        Track Now
      </button>
    </form>
  </div>
  )
}
