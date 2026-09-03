import { Link } from "react-router-dom";
import { FaTruckArrowRight } from "react-icons/fa6";

import {Button} from '../common/Button'

export function MobileMenu({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen py-3 w-[70%] bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-24">
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="text-lg transition-all hover:text-primary-light"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={onClose}
                className="text-lg transition-all hover:text-primary-light"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                onClick={onClose}
                className="text-lg transition-all hover:text-primary-light"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={onClose}
                className="text-lg transition-all hover:text-primary-light"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-8">
             <Button  to="/tracking" icon={<FaTruckArrowRight size={20} />} text='Track Shipment'  />
          </div>
        </div>
      </div>
    </>
  );
}
