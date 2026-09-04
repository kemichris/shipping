import { FaPlane, FaTruck, FaShip, FaTrain } from "react-icons/fa"
import { FeaturedCard } from "./FeaturedCard"

export function FeaturedServices() {
    const featureDetails = [
        {
            icon: <FaPlane />,
            title: 'Book Your Air Freight',
            text: 'Fast and reliable air cargo solution world wide'
        },
        {
            icon: <FaTruck />,
            title: 'Book Your Road Freight',
            text: 'Nation wide ground transportation service'
        },
        {
            icon: <FaShip />,
            title: 'Book Your Sea Freight',
            text: 'Cost effective ocean freight and container shipping'
        },
        {
            icon: <FaTrain />,
            title: 'Book Your Train Freight',
            text: 'Eco-friendly rail transport solution'
        },
    ]
    return (
        <section className="py-16 px-8 grid gap-6 lg:grid-cols-4 md:grid-cols-2 bg-bg-white">
            {
                featureDetails.map(feature => (
                    <FeaturedCard key={feature.title} icon={feature.icon} title={feature.title} text={feature.text} />
                ))
            }
        </section>
    )
}