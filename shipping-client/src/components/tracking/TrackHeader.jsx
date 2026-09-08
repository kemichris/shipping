import { Link } from "react-router-dom";
export function TrackHeader() {
  return (
    <section className='flex flex-col gap-6 items-center shadow-md py-8 px-8 mt-20 '>
      <h1 className="text-2xl font-semibold text-center">Welcome to shipment Tracking</h1>
      <p className="text-text-dark text-center">
        A consignment has been sent to you through <span className="font-semibold">shipment</span>. We recommend
        tracking your freight regularly using our real-time system. If you need
        assistance, please contact us via email on our
        <Link to="/contact" className="text-primary-light"> Contact Page.</Link>
      </p>
      <p className="uppercase p-2 rounded text-xs bg-bg-white border border-gray-200 font-medium ">Consignment Details are as stated below</p>
    </section>
  );
}
