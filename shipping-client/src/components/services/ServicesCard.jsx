

export function ServicesCard({icon, title, text, featuresTags}) {
    return (
        <div className="p-8 rounded-lg shadow-md bg-white transition-colors duration-500 ease-in-out  border border-gray-200 hover:border-primary-light">
            <div className="flex justify-center items-center w-16 h-16 rounded-full text-white text-2xl bg-primary-light mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-text-dark text-sm">{text}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {featuresTags.map((feature, index) => (
                    <div key={index} className="w-fit p-2 rounded-2xl bg-sky-500/20">
                        <p className="text-primary-light text-xs">{feature}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}