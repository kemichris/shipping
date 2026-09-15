
import { StatCard } from "./StatCard";

export function Stats() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title='total shipment' stat={21} timeline='All time' style='border-blue-500' />
            <StatCard title='total shipment' stat={21} timeline='All time' style='border-red-500' />
            <StatCard title='total shipment' stat={21} timeline='All time' style='border-gray-500' />
            <StatCard title='total shipment' stat={21} timeline='All time' style='border-red-500' />
        </section>
    )
}