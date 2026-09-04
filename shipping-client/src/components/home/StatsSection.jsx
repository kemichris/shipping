import { FaTruckArrowRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const stats = [
    {
        years: '50',
        name: 'Years Experience'
    },
    {
        years: '2500+',
        name: 'Professional Workers'
    },
    {
        years: '80',
        name: 'Areas Covered'
    },
    {
        years: '205+',
        name: 'Countries Covered'
    },
    {
        years: '180+',
        name: 'Corporate Clients'
    },
    {
        years: '450+',
        name: 'Owned Vehicles'
    }
]

export function StatsSection() {
  return (
    <section className="bg-linear-to-r from-[#1E2D4C] to-primary-light py-12 px-8 flex flex-col md:flex-row md:items-center gap-8">
      <div className="bg-white/20 p-8 rounded-2xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex justify-center items-center w-16 h-16 px-4 rounded-xl text-white text-lg bg-white/30 ">
            <FaTruckArrowRight size={35} />
          </div>
          <div>
            <h2 className="text-white text-xl md:text-3xl font-semibold">Track Your Order</h2>
            <p className="text-gray-200 text-sm md:text-base">Enter your Tracking ID For Instant Search</p>
          </div>
        </div>
        <div>
          <form className="flex items-center">
            <input
              type="search"
              name=""
              id=""
              placeholder="Enter your tracking ID"
              className="h-12 min-h-12 bg-white rounded-l-lg flex-1  px-2 text-base"
            />
            <button
              type="submit"
              className="h-12 bg-linear-to-r from-primary-light to-primary-dark rounded-r-lg flex items-center gap-2 py-2 px-6 text-white transition-transform duration-300 ease-out hover:scale-105"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {stats.map(stat => (
            <div key={stat.years} className="bg-white/20 p-8 rounded-2xl">
                <p className="text-white text-4xl font-bold text-center">{stat.years}</p>
                <p className="text-white text-center">{stat.name}</p>
            </div>
        ))}
      </div>
    </section>
  );
}
