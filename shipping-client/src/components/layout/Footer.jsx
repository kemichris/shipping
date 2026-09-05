import { Link } from "react-router-dom";
import { FaTruckArrowRight, FaLocationDot, FaClock } from "react-icons/fa6";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

export function Footer() {
  const className = 'flex items-center gap-2 text-gray-500'
  const linkClass = 'text-gray-500 hover:text-primary-light'
  return (
    <footer className=" pt-16 pb-12 px-8 border-t border-gray-200">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between pb-12 border-b border-gray-200">
        <div className="grid gap-3">
          {/* <img src={Logo} alt="Logo" className="logo" /> */}
          <FaTruckArrowRight size={25} />
          <p >Shipment is a global supplier transport and logistic solutions.</p>
          <p className={`${className}`}>
            <FaPhone /> +144494844
          </p>
          <p className={`${className}`}>
            <FaEnvelope /> support@shipment.com
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
          <ul className="grid gap-2">
            <li className={`${linkClass}`}>
              <Link to="/about">About</Link>
            </li>
            <li className={`${linkClass}`}>
              <Link to="/services">Services</Link>
            </li>
            <li className={`${linkClass}`}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={`${linkClass}`}>
              <Link to="/tracking">Track shipment</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">Contact Info</h3>
          <div className="grid gap-2">
            <p className={`${className}`}>
            <FaLocationDot /> 250 Moonachie Rd, Moonachie, NJ 07074, United
            States
          </p>
          <p className={`${className}`}>
            <FaClock /> Mon - Fri: 8:00 AM - 8:00 PM
          </p>
          <p className={`${className}`}>
            <MdOutlineSupportAgent /> 24/7 Customer Support
          </p>
          </div>
          
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">Shipment © {new Date().getFullYear()} | All Rights Reserved</p>
    </footer>
  );
}
