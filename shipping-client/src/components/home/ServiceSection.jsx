
import { ServiceCard } from "./ServiceCard";

import img1 from '../../assets/service-1.jpg'
import img2 from '../../assets/service-2.jpg'
import img3 from '../../assets/service-3.jpg'

export function ServiceSection() {
    const serviceDetails = [
        {
            image: img1,
            title: 'Air Freight',
            description: 'Fast and secure air cargo services for time-sensitive shipments across the globe.'
        },
        {
            image: img2,
            title: 'Sea Freight',
            description: 'Cost-effective ocean freight solutions with container shipping for bulk cargo.'
        },
        {
            image: img3,
            title: 'Road Freight',
            description: 'Nationwide road transportation with a large fleet of trucks and experienced drivers.'
        }
    ]
  return (
    <section className="py-12 px-8">
      <h2 className="font-bold text-3xl md:text-4xl text-black mb-6 text-center">
        Our Awesome <span className="text-primary-light">Services</span>
      </h2>
      <div className=" flex flex-col md:flex-row gap-6 mt-14">
        {
            serviceDetails.map(details => (
                <ServiceCard key={details.title} {...details} />
            ))
        }
      </div>
    </section>
  );
}
