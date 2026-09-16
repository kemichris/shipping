import { FaTruckArrowRight } from "react-icons/fa6";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-white" role="status" aria-label="Loading">
      <div className="flex w-28 flex-col items-center">
        <FaTruckArrowRight size={70} className="animate-truck-drive text-primary-dark" />
        <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
          <div className="h-full w-8 animate-road-slide rounded-full bg-primary-light" />
        </div>
      </div>
    </div>
  );
}
