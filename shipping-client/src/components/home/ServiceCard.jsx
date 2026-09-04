export function ServiceCard({ image, title, description }) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      
      <div className="relative h-50 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />

        
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        
        <h3 className="absolute bottom-8 left-8 text-2xl font-semibold text-white">
          {title}
        </h3>
      </div>

      <div className="p-6">
        <p className=" leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
