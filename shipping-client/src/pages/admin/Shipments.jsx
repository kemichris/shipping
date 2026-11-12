import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { getShipments, shipmentStatuses, shipmentStatusLabels } from "../../services/shipment.service";
import { ShipmentStatusBadge } from "../../components/dashboard/ShipmentStatusBadge";

const date = (value) => value ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value)) : "—";

export function Shipments() {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState({ page: 1, limit: 10, q: "", status: "", deliveryState: "", from: "", to: "", sort: "createdAt", direction: "desc" });
  const [result, setResult] = useState({ items: [], pagination: { page: 1, pages: 0, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { const timer = setTimeout(() => setQuery((current) => ({ ...current, q: searchText, page: 1 })), 350); return () => clearTimeout(timer); }, [searchText]);
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      setLoading(true); setError("");
      getShipments(query).then((data) => { if (active) setResult(data); }).catch((requestError) => {
        if (active) { const message = requestError.response?.data?.message || "Could not load shipments."; setError(message); toast.error(message); }
      }).finally(() => { if (active) setLoading(false); });
    }, 0);
    return () => { active = false; clearTimeout(timer); };
  }, [query]);

  const update = (field, value) => setQuery((current) => ({ ...current, [field]: value, ...(field === "status" && value ? { deliveryState: "" } : {}), ...(field === "deliveryState" && value ? { status: "" } : {}), page: 1 }));
  const reload = () => setQuery((current) => ({ ...current }));
  const filters = <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-6">
    <label className="relative sm:col-span-2"><span className="sr-only">Search shipments</span><FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Tracking, sender, recipient, destination" className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-primary-light" /></label>
    <label><span className="sr-only">Status</span><select value={query.status} onChange={(event) => update("status", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"><option value="">All statuses</option>{shipmentStatuses.map((status) => <option key={status} value={status}>{shipmentStatusLabels[status]}</option>)}</select></label>
    <label><span className="sr-only">Delivery state</span><select value={query.deliveryState} onChange={(event) => update("deliveryState", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"><option value="">All delivery states</option><option value="active">Active / undelivered</option><option value="delivered">Delivered</option></select></label>
    <label><span className="sr-only">Created from</span><input aria-label="Created from" type="date" value={query.from} onChange={(event) => update("from", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm" /></label>
    <label><span className="sr-only">Sort shipments</span><select value={`${query.sort}:${query.direction}`} onChange={(event) => { const [sort, direction] = event.target.value.split(":"); setQuery((current) => ({ ...current, sort, direction, page: 1 })); }} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"><option value="createdAt:desc">Newest created</option><option value="createdAt:asc">Oldest created</option><option value="updatedAt:desc">Recently updated</option><option value="trackingNumber:asc">Tracking number</option><option value="status:asc">Status</option></select></label>
    <label className="xl:col-start-6"><span className="sr-only">Created to</span><input aria-label="Created to" type="date" value={query.to} onChange={(event) => update("to", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm" /></label>
  </div>;

  return <div className="mx-auto max-w-7xl space-y-5">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary-light">Operations</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Shipment management</h1><p className="mt-1 text-sm text-slate-500">Search, filter, and manage shipments across their delivery lifecycle.</p></div><Link to="/admin/new-shipment" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary-light px-4 font-semibold text-white hover:bg-primary-dark"><FaPlus /> New shipment</Link></header>
    {filters}
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><h2 className="font-semibold text-slate-800">Shipments</h2><span className="text-sm text-slate-500">{result.pagination.total} total</span></div>
      {loading ? <div className="space-y-3 p-5" aria-label="Loading shipments">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-12 animate-pulse rounded bg-slate-100" />)}</div> : error ? <div className="p-10 text-center"><p className="text-sm text-rose-700">{error}</p><button type="button" onClick={reload} className="mt-3 font-semibold text-primary-light">Try again</button></div> : result.items.length === 0 ? <div className="p-12 text-center"><h3 className="font-semibold text-slate-800">No shipments found</h3><p className="mt-1 text-sm text-slate-500">Adjust your filters or create a shipment.</p></div> : <div className="overflow-x-auto"><table className="min-w-[850px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Tracking number</th><th className="px-4 py-3">Sender</th><th className="px-4 py-3">Recipient / destination</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-4 py-3">Estimated delivery</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr></thead><tbody className="divide-y divide-slate-100">{result.items.map((shipment) => <tr key={shipment._id} className="hover:bg-slate-50"><td className="px-4 py-4 font-semibold text-slate-900">{shipment.trackingNumber}</td><td className="px-4 py-4">{shipment.sender?.name || "—"}</td><td className="px-4 py-4"><span className="block">{shipment.recipient?.name || "—"}</span><span className="text-xs text-slate-500">{[shipment.recipient?.address?.city, shipment.recipient?.address?.country].filter(Boolean).join(", ") || shipment.recipient?.address?.label}</span></td><td className="px-4 py-4"><ShipmentStatusBadge status={shipment.status} /></td><td className="px-4 py-4 text-slate-600">{date(shipment.createdAt)}</td><td className="px-4 py-4 text-slate-600">{date(shipment.estimatedDeliveryDate)}</td><td className="px-4 py-4"><Link to={`/admin/shipments/${shipment._id}`} className="font-semibold text-primary-light hover:text-primary-dark">View</Link></td></tr>)}</tbody></table></div>}
      {!loading && !error && result.pagination.pages > 1 && <footer className="flex items-center justify-between border-t border-slate-100 px-4 py-3"><p className="text-sm text-slate-500">Page {result.pagination.page} of {result.pagination.pages}</p><div className="flex gap-2"><button type="button" disabled={result.pagination.page <= 1} onClick={() => update("page", result.pagination.page - 1)} className="rounded-md border px-3 py-2 text-sm disabled:opacity-40">Previous</button><button type="button" disabled={result.pagination.page >= result.pagination.pages} onClick={() => update("page", result.pagination.page + 1)} className="rounded-md border px-3 py-2 text-sm disabled:opacity-40">Next</button></div></footer>}
    </section>
  </div>;
}
