import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { createShipment } from "../../services/shipment.service";

const emptyParty = () => ({
  name: "",
  address: {
    label: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    placeId: "",
    coordinates: [],
  },
  email: "",
  phone: "",
});
const initialForm = () => ({
  sender: emptyParty(),
  recipient: emptyParty(),
  shippingMode: "road",
  paymentMethod: "prepaid",
  package: {
    weightKg: "",
    dimensions: "",
    declaredValue: "0",
    shippingCost: "0",
    currency: "NGN",
    serviceLevel: "standard",
    description: "",
    quantity: "1",
  },
  estimatedDeliveryDate: "",
});
const inputClass =
  "h-12 w-full rounded-md border border-[#cbd7e6] bg-white px-4 text-sm text-[#24344d] outline-none placeholder:text-[#9aa9bc] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10";

function PartySection({ type, title, party, onChange }) {
  const update = (field, value) => onChange({ ...party, [field]: value });
  return (
    <section className="rounded-xl border border-[#dbe2ea] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="border-b border-[#e5eaf0] pb-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#5c708d]">
        {title}
      </h2>
      <div className="mt-5 space-y-5">
        <div>
          <label
            htmlFor={`${type}-name`}
            className="mb-2 block text-sm font-medium text-[#3d4d66]"
          >
            Full Name / Company
          </label>
          <input
            id={`${type}-name`}
            required
            maxLength="150"
            value={party.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
            placeholder="Full name or company"
          />
        </div>
        <AddressAutocomplete
          idPrefix={type}
          label="Street Address"
          value={party.address}
          onChange={(address) => update("address", address)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${type}-email`}
              className="mb-2 block text-sm font-medium text-[#3d4d66]"
            >
              Email
            </label>
            <input
              id={`${type}-email`}
              type="email"
              value={party.email}
              onChange={(event) => update("email", event.target.value)}
              className={inputClass}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label
              htmlFor={`${type}-phone`}
              className="mb-2 block text-sm font-medium text-[#3d4d66]"
            >
              Phone
            </label>
            <input
              id={`${type}-phone`}
              type="tel"
              value={party.phone}
              onChange={(event) => update("phone", event.target.value)}
              className={inputClass}
              placeholder="International phone number"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewShipmentForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const updateParty = (key, party) =>
    setFormData((current) => ({ ...current, [key]: party }));
  const updatePackage = (field, value) =>
    setFormData((current) => ({
      ...current,
      package: { ...current.package, [field]: value },
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const dimensions = formData.package.dimensions.trim()
        ? formData.package.dimensions
            .split(/[x×]/i)
            .map((part) => Number.parseFloat(part.trim()))
        : [];
      if (
        dimensions.length &&
        (dimensions.length !== 3 ||
          dimensions.some((value) => !Number.isFinite(value) || value <= 0))
      ) {
        toast.error(
          "Enter dimensions as length × width × height in centimetres.",
        );
        return;
      }
      const packageData = {
        description: formData.package.description,
        weightKg: Number(formData.package.weightKg),
        quantity: Number(formData.package.quantity),
        declaredValue: Number(formData.package.declaredValue || 0),
        shippingCost: Number(formData.package.shippingCost || 0),
        currency: formData.package.currency,
        ...(dimensions.length
          ? {
              lengthCm: dimensions[0],
              widthCm: dimensions[1],
              heightCm: dimensions[2],
            }
          : {}),
      };
      const payload = {
        sender: formData.sender,
        recipient: formData.recipient,
        shippingMode: formData.shippingMode,
        paymentMethod: formData.paymentMethod,
        serviceMode: formData.package.serviceLevel,
        package: packageData,
        ...(formData.estimatedDeliveryDate
          ? {
              estimatedDeliveryDate: new Date(
                `${formData.estimatedDeliveryDate}T12:00:00`,
              ).toISOString(),
            }
          : {}),
      };
      const shipment = await createShipment(payload);
      toast.success(`Shipment ${shipment.trackingNumber} created.`);
      window.dispatchEvent(new Event("shipment:changed"));
      navigate(`/admin/shipments/${shipment._id}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Shipment could not be created. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#24344d]">Create Shipment</h1>
          <p className="mt-1 text-sm text-[#5c708d]">
            Add sender, recipient, and package details. Address search can be
            skipped for manual entry.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PartySection
            type="sender"
            title="Sender Information"
            party={formData.sender}
            onChange={(party) => updateParty("sender", party)}
          />
          <PartySection
            type="recipient"
            title="Recipient Information"
            party={formData.recipient}
            onChange={(party) => updateParty("recipient", party)}
          />
        </div>
        <section className="mt-6 rounded-xl border border-[#dbe2ea] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="border-b border-[#e5eaf0] pb-4 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#5c708d]">
            Shipment & Package Details
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label
                htmlFor="shipping-mode"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Shipping mode
              </label>
              <select
                id="shipping-mode"
                value={formData.shippingMode}
                onChange={(event) =>
                  setFormData({ ...formData, shippingMode: event.target.value })
                }
                className={inputClass}
              >
                <option value="road">Road</option>
                <option value="air">Air</option>
                <option value="sea">Sea</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="service-level"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Service level
              </label>
              <select
                id="service-level"
                value={formData.package.serviceLevel}
                onChange={(event) =>
                  updatePackage("serviceLevel", event.target.value)
                }
                className={inputClass}
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="payment-method"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Payment method
              </label>
              <select
                id="payment-method"
                value={formData.paymentMethod}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    paymentMethod: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="prepaid">Prepaid</option>
                <option value="cash_on_delivery">Cash on delivery</option>
                <option value="invoice">Invoice</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Weight (kg)
              </label>
              <input
                id="weight"
                required
                min="0.01"
                step="0.01"
                type="number"
                value={formData.package.weightKg}
                onChange={(event) =>
                  updatePackage("weightKg", event.target.value)
                }
                className={inputClass}
                placeholder="e.g. 2.5"
              />
            </div>
            <div>
              <label
                htmlFor="dimensions"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Dimensions (cm)
              </label>
              <input
                id="dimensions"
                value={formData.package.dimensions}
                onChange={(event) =>
                  updatePackage("dimensions", event.target.value)
                }
                className={inputClass}
                placeholder="L × W × H (e.g. 30 × 20 × 15)"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Package quantity
              </label>
              <input
                id="quantity"
                required
                min="1"
                step="1"
                type="number"
                value={formData.package.quantity}
                onChange={(event) =>
                  updatePackage("quantity", event.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="declared-value"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Declared value (NGN)
              </label>
              <input
                id="declared-value"
                min="0"
                step="0.01"
                type="number"
                value={formData.package.declaredValue}
                onChange={(event) =>
                  updatePackage("declaredValue", event.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="shipping-cost"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Shipping cost (NGN)
              </label>
              <input
                id="shipping-cost"
                min="0"
                step="0.01"
                type="number"
                value={formData.package.shippingCost}
                onChange={(event) =>
                  updatePackage("shippingCost", event.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="delivery-date"
                className="mb-2 block text-sm font-medium text-[#3d4d66]"
              >
                Estimated delivery
              </label>
              <input
                id="delivery-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={formData.estimatedDeliveryDate}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    estimatedDeliveryDate: event.target.value,
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#3d4d66]"
            >
              Contents description
            </label>
            <textarea
              id="description"
              required
              maxLength="500"
              rows="3"
              value={formData.package.description}
              onChange={(event) =>
                updatePackage("description", event.target.value)
              }
              className="w-full rounded-md border border-[#cbd7e6] px-4 py-3 text-sm outline-none focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10"
              placeholder="Describe the package contents"
            />
          </div>
        </section>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="h-13 rounded-md bg-[#2463eb] px-8 text-base font-bold text-white transition hover:bg-[#1d55d1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating shipment…" : "Create Shipment"}
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => setFormData(initialForm())}
            className="h-13 rounded-md border border-[#cbd7e6] bg-white px-8 text-base font-medium text-[#5c708d] transition hover:bg-[#f1f5f9]"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
