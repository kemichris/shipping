
export function StatCard({title, stat, timeline, style}) {
    return (
        <div className={`flex flex-col gap-3 p-4 rounded-lg border-t shadow-lg ${style}`} >
            <p className="uppercase text-sm text-text-dark">{title}</p>
            <p className="text-xl font-bold">{stat}</p>
            <p className="text-xs text-text-dark">{timeline}</p>
        </div>
    )
}