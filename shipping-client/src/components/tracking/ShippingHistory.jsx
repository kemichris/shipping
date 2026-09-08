
const shippingHistory = [
  {
    date: '2026/06/10',
    time: '07:00:18 am',
    status: 'In_Transit',
    location: '',
    message: 'Shipment created',
  },
  {
    date: '2026/06/11',
    time: '05:51:57 am',
    status: 'Pending_payment',
    location: 'Athens',
    message: 'PACKAGE AWAITING PAYMENT',
  },
];

export function ShippingHistory() {
  return (
    <section className="w-full border border-gray-200 bg-white p-5 sm:p-8">
      <h2 className="mb-5 text-2xl font-bold text-[#294563] ">
        Shipping History
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 h-full w-0.75 bg-[#83bd3f]" />

        <div className="space-y-6">
          {shippingHistory.map((item, index) => (
            <div
              key={index}
              className="relative pl-10"
            >
              {/* Timeline circle */}
              <div className="absolute left-0 top-1 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#83bd3f]">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>

              {/* Event */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr] md:gap-5">

                {/* Left side */}
                <div>
                  {/* Date */}
                  <div className="rounded-sm border-2 border-gray-300 bg-gray-300 px-2 py-1">
                    <p className="text-base font-medium text-gray-900 sm:text-lg">
                      {item.date}
                    </p>
                  </div>

                  {/* Event information */}
                  <div className="min-h-28.75 rounded-sm border-2 border-gray-200 bg-gray-100 px-2 py-2">
                    <p className="text-base font-bold text-black ">
                      {item.status}
                    </p>

                    {item.location && (
                      <p className="mt-1 text-base font-bold text-black ">
                        {item.location}
                      </p>
                    )}

                    <p className="mt-7 text-base font-bold text-black ">
                      + {item.message}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div>
                  <div className="rounded-sm border-2 border-gray-300 bg-gray-300 px-2 py-1">
                    <p className="text-base font-medium text-gray-900 ">
                      {item.time}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}