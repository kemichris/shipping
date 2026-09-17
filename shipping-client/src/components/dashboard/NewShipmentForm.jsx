import { useState } from "react";

export function NewShipmentForm() {
  const [formData, setFormData] = useState({
    sender: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    },

    recipient: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    },

    package: {
      weight: "",
      dimensions: "",
      declaredValue: "",
      serviceLevel: "",
      description: "",
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleClear = () => {
    setFormData({
      sender: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      },

      recipient: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      },

      package: {
        weight: "",
        dimensions: "",
        declaredValue: "",
        serviceLevel: "",
        description: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-7xl">
        {/* Sender + Recipient */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sender */}
          <div className="rounded-xl border border-[#dbe2ea] bg-white p-6 shadow-sm">
            <h2 className="border-b border-[#e5eaf0] pb-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#5c708d]">
              Sender Information
            </h2>

            <div className="mt-5 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Full Name / Company
                </label>

                <input
                  type="text"
                  placeholder="Mara Holloway"
                  value={formData.sender.name}
                  onChange={(e) =>
                    handleChange("sender", "name", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] bg-white px-4 text-sm text-[#24344d] outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Street Address
                </label>

                <input
                  type="text"
                  placeholder="44 Industrial Ave"
                  value={formData.sender.address}
                  onChange={(e) =>
                    handleChange("sender", "address", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] bg-white px-4 text-sm text-[#24344d] outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* City / State / ZIP */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Chicago"
                    value={formData.sender.city}
                    onChange={(e) =>
                      handleChange("sender", "city", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    State
                  </label>

                  <input
                    type="text"
                    placeholder="IL"
                    value={formData.sender.state}
                    onChange={(e) =>
                      handleChange("sender", "state", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    ZIP
                  </label>

                  <input
                    type="text"
                    placeholder="60601"
                    value={formData.sender.zip}
                    onChange={(e) =>
                      handleChange("sender", "zip", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.sender.email}
                  onChange={(e) =>
                    handleChange("sender", "email", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Phone
                </label>

                <input
                  type="tel"
                  placeholder="312-555-0000"
                  value={formData.sender.phone}
                  onChange={(e) =>
                    handleChange("sender", "phone", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>
            </div>
          </div>

          {/* Recipient */}
          <div className="rounded-xl border border-[#dbe2ea] bg-white p-6 shadow-sm">
            <h2 className="border-b border-[#e5eaf0] pb-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#5c708d]">
              Recipient Information
            </h2>

            <div className="mt-5 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Full Name / Company
                </label>

                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.recipient.name}
                  onChange={(e) =>
                    handleChange("recipient", "name", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Street Address
                </label>

                <input
                  type="text"
                  placeholder="2200 Lakeview Blvd"
                  value={formData.recipient.address}
                  onChange={(e) =>
                    handleChange("recipient", "address", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* City / State / ZIP */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Detroit"
                    value={formData.recipient.city}
                    onChange={(e) =>
                      handleChange("recipient", "city", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    State
                  </label>

                  <input
                    type="text"
                    placeholder="MI"
                    value={formData.recipient.state}
                    onChange={(e) =>
                      handleChange("recipient", "state", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                    ZIP
                  </label>

                  <input
                    type="text"
                    placeholder="48201"
                    value={formData.recipient.zip}
                    onChange={(e) =>
                      handleChange("recipient", "zip", e.target.value)
                    }
                    className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.recipient.email}
                  onChange={(e) =>
                    handleChange("recipient", "email", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                  Phone
                </label>

                <input
                  type="tel"
                  placeholder="313-555-0000"
                  value={formData.recipient.phone}
                  onChange={(e) =>
                    handleChange("recipient", "phone", e.target.value)
                  }
                  className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="mt-6 rounded-xl border border-[#dbe2ea] bg-white p-6 shadow-sm">
          <h2 className="border-b border-[#e5eaf0] pb-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#5c708d]">
            Package Details
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Weight */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                Weight (lbs)
              </label>

              <input
                type="text"
                placeholder="12.4 lbs"
                value={formData.package.weight}
                onChange={(e) =>
                  handleChange("package", "weight", e.target.value)
                }
                className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
              />
            </div>

            {/* Dimensions */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                Dimensions (in)
              </label>

              <input
                type="text"
                placeholder="18 × 14 × 10 in"
                value={formData.package.dimensions}
                onChange={(e) =>
                  handleChange("package", "dimensions", e.target.value)
                }
                className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
              />
            </div>

            {/* Declared Value */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                Declared Value
              </label>

              <input
                type="text"
                placeholder="$0.00"
                value={formData.package.declaredValue}
                onChange={(e) =>
                  handleChange("package", "declaredValue", e.target.value)
                }
                className="h-12 w-full rounded-md border border-[#cbd7e6] px-4 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
              />
            </div>

            {/* Service Level */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
                Service Level
              </label>

              <select
                value={formData.package.serviceLevel}
                onChange={(e) =>
                  handleChange("package", "serviceLevel", e.target.value)
                }
                className="h-12 w-full rounded-md border border-[#cbd7e6] bg-white px-4 text-sm text-[#24344d] outline-none focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
              >
                <option value="">Select service</option>
                <option value="express">Express 2-Day</option>
                <option value="standard">Standard</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#3d4d66]">
              Contents Description
            </label>

            <textarea
              rows="3"
              placeholder="Industrial sensor components, electronics, etc."
              value={formData.package.description}
              onChange={(e) =>
                handleChange("package", "description", e.target.value)
              }
              className="w-full resize-none rounded-md border border-[#cbd7e6] px-4 py-3 text-sm outline-none placeholder:text-[#c5d1e0] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="h-13 rounded-md bg-[#2463eb] px-8 text-base font-bold text-white transition hover:bg-[#1d55d1] active:scale-[0.98]"
          >
            Create Shipment
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="h-13 rounded-md border border-[#cbd7e6] bg-white px-8 text-base font-medium text-[#5c708d] transition hover:bg-[#f1f5f9] active:scale-[0.98]"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
