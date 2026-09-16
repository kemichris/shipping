
import { StatCard } from "./StatCard";

export function Stats({statDatas}) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statDatas.map((data, index) => (
                <StatCard
                    key={index}
                    title={data.title}
                    stat={data.stat}
                    timeline={data.timeline}
                    style={data.style}
                />
            ))}
        </section>
    )
}