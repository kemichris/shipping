import { FaPlane, FaTruckLoading, FaShip } from "react-icons/fa"
import { FaTruckFast, FaLocationDot } from "react-icons/fa6";
import { MdOutlineStorage } from "react-icons/md";



import { SectionHeader } from "./SectionHeader";
import { ServicesCard } from "./ServicesCard";

export function OurServices() {
    const services = [
        {
            icon: <FaPlane/>,
            title: 'Air Freight',
            text: 'Air freight is a shipping method that involves the transportation of goods by air, typically through cargo planes or commercial airlines. It is a fast and efficient way to transport goods over long distances and across international borders.',
            featuresTags: ['Express Delivery', 'Same Day', 'Charter Flights' ]
        },
        {
            icon: <FaShip/>,
            title: 'Sea Freight',
            text: 'Sea freight is a shipping method that involves transporting goods by sea, typically through cargo ships or freighters. It is a cost-effective and reliable way to transport large quantities of goods over long distances.',
            featuresTags: ['Container Shipping', 'Bulk Cargo', 'FCL/LCL' ]
        },
        {
            icon: <FaTruckFast/>,
            title: 'Fast Freight',
            text: 'Fast freight is a type of shipping service that offers expedited delivery for time-sensitive shipments. It is typically used for urgent shipments that require fast and reliable transportation, such as perishable goods and medical supplies.',
            featuresTags: ['Expedited', 'Time-sensitive', 'Guaranteed Delivery']
        },
        {
            icon: <FaTruckLoading />,
            title: 'Courier Services',
            text: 'Courier services are a type of delivery service that offers fast and reliable transportation of packages, documents, and other items from one location to another. These services are typically used for time-sensitive deliveries.',
            featuresTags: ['Same Day', 'Door to Door', 'Real-time Tracking']
        },
        {
            icon: <MdOutlineStorage />,
            title: 'Storage Services',
            text: 'Storage services are a type of service that offers temporary or long-term storage solutions for businesses and individuals. These services are typically used to store excess inventory, equipment, or personal belongings in a safe and secure location.',
            featuresTags: ['Climate Control', '24/7 Security', 'Inventory Management']
        },
        {
            icon: <FaLocationDot/>,
            title: 'Cargo Tracking',
            text: 'Tracking your cargo is a crucial aspect of shipping that allows you to monitor the progress of your shipment from origin to destination. Cargo tracking provides real-time information on the status and location of your cargo.',
            featuresTags: ['Real-time Updates',' GPS Tracking', 'Alerts & Notifications']
        },
    ]
  return (
    <section className='py-12 px-8 flex flex-col items-center'>
      <SectionHeader
        blackText="Our Premium"
        blueText="Service"
        description="We offer a wide range of logistics services designed to meet the unique needs of businesses and individuals worldwide."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8">
        {services.map(service => (
            <ServicesCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
