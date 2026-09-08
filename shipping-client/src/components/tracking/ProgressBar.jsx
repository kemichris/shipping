import { useEffect, useState } from "react";

export function ProgressBar() {
  const currentProgress = 25;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    let timeout;

    const startProgress = () => {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentProgress) {
            clearInterval(interval);

            timeout = setTimeout(() => {
              startProgress();
            }, 5000);

            return currentProgress;
          }

          return prev + 1;
        });
      }, 80);
    };

    startProgress();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentProgress]);

  return (
    <div className="w-full ">
      <p className="uppercase text-text-dark font-semibold text-center mb-2">
        Shipment Progress
      </p>
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 flex h-full rounded-full bg-blue-600 transition-all duration-75"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="z-10 font-semibold text-xs text-white">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
