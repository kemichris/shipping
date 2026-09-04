
export function FeaturedCard({icon, title, text}) {
    return (
        <div className="flex flex-col items-center p-8 rounded-lg shadow-md bg-white gap-4 transition-colors duration-500 ease-in-out  border border-transparent hover:border-primary-light">
            <div className="flex justify-center items-center w-16 h-16 rounded-full text-primary-light text-2xl bg-sky-200 ">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-center">{title}</h3>
            <p className="text-text-dark text-center text-sm">{text}</p>
        </div>
    )
}