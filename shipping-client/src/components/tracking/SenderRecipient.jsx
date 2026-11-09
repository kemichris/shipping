import { FaBox, FaLocationDot } from "react-icons/fa6";

function PartyCard({ title, person, address }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <p className="mt-3 font-semibold text-slate-900">{person}</p>
      <p className="mt-1 flex items-start gap-2 text-sm text-slate-600"><FaLocationDot className="mt-1 shrink-0 text-primary-light" />{address}</p>
    </section>
  );
}

export function SenderRecipient({ shipment }) {
  return (
    <section className="mt-8 pb-8" aria-label="Shipment details">
      <div className="mb-4 flex items-center gap-2"><FaBox className="text-primary-light" /><h2 className="text-lg font-bold text-slate-900">Shipment details</h2></div>
      <div className="grid gap-4 md:grid-cols-2">
        <PartyCard title="Sender" person={shipment.sender.name} address={shipment.sender.address} />
        <PartyCard title="Recipient" person={shipment.recipient.name} address={shipment.recipient.address} />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        <span>Contents: <strong className="text-slate-900">{shipment.package.description}</strong></span>
        <span>Packages: <strong className="text-slate-900">{shipment.package.quantity}</strong></span>
        <span>Total weight: <strong className="text-slate-900">{shipment.package.weight}</strong></span>
      </div>
    </section>
  );
}
