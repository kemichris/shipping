import { NavLink } from "react-router-dom";
import { useState } from "react";

import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { FaTruckArrowRight } from "react-icons/fa6";

import { Button } from "../common/Button";

import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary-dark font-semibold" : "text-black hover:text-primary-light";

  return (
    <>
      <nav className="fixed top-0 w-full bg-white flex items-center justify-between px-8 py-4 shadow-md z-50">
        {/* <img src={Logo} alt="Logo" className="logo" /> */}
        <FaTruckArrowRight size={25} />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 md:items-center ">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>

          <Button  to="/tracking" icon={<FaTruckArrowRight size={20} />} text='Track Shipment'  />
        </ul>

        {/* Desktop Right */}

        {/* Mobile Menu Button */}
        <button className="rounded-md p-2 text-text lg:hidden md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
