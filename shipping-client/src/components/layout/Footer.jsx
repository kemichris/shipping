import { FaTruckArrowRight } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className=" pt-16 pb-12 px-8 border-t border-gray-200">
      <div>
        <div>
          {/* <img src={Logo} alt="Logo" className="logo" /> */}
          <FaTruckArrowRight size={25} />
          <p>Shipment is a global supplier transport and logistic solutions.</p>
          <p>+144494844</p>
          <p>support@shipment.com</p>
        </div>
      </div>
    </footer>
  );
}
