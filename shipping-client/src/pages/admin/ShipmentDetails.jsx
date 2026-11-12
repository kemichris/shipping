import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaBox, FaCalendarDays, FaLocationDot, FaUser, FaTrash, FaBan, FaPen, FaFloppyDisk, FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { deleteShipment, getShipment, shipmentStatusLabels, shipmentTransitions, updateShipment, updateShipmentStatus, updateShipmentLocation } from "../../services/shipment.service";
import { ShipmentStatusBadge } from "../../components/dashboard/ShipmentStatusBadge";

const inputClass = "h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary-light";
const formatDate = (value, withTime = false) => value ? new Intl.DateTimeFormat("en-GB", withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" }).format(new Date(value)) : "—";
const money = (value, currency = "NGN") => new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(value || 0);

function Info({ label, value }) { return <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-slate-900">{value || "—"}</dd></div>; }

export function ShipmentDetails() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState(null);
  const [saving, setSaving] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [location, setLocation] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadShipment = useCallback(async () => {
    setLoading(true); setError("");
    try { const record = await getShipment(id); setShipment(record); setLocation(record.currentLocation?.label || ""); }
    catch (requestError) { const message = requestError.response?.data?.message || "Could not load this shipment."; setError(message); toast.error(message); }
    finally { setLoading(false); }
  }, [id]);
  useEffect(() => { const timer = setTimeout(loadShipment, 0); return () => clearTimeout(timer); }, [loadShipment]);

  const startEditing = () => {
    setEdit({ sender: structuredClone(shipment.sender), recipient: structuredClone(shipment.recipient), package: { ...shipment.package }, shippingMode: shipment.shippingMode, paymentMethod: shipment.paymentMethod, serviceMode: shipment.serviceMode || "standard", estimatedDeliveryDate: shipment.estimatedDeliveryDate ? new Date(shipment.estimatedDeliveryDate).toISOString().slice(0, 10) : "" });
    setEditing(true);
  };
  const editParty = (party, field, value) => setEdit((current) => ({ ...current, [party]: { ...current[party], [field]: value } }));
  const editAddress = (party, field, value) => setEdit((current) => ({ ...current, [party]: { ...current[party], address: { ...current[party].address, [field]: value, placeId: "", coordinates: [] } } }));
  const editPackage = (field, value) => setEdit((current) => ({ ...current, package: { ...current.package, [field]: value } }));

  const saveEdits = async (event) => {
    event.preventDefault(); setSaving(true);
    try {
      const payload = { ...edit, estimatedDeliveryDate: edit.estimatedDeliveryDate ? new Date(`${edit.estimatedDeliveryDate}T12:00:00`).toISOString() : null, package: { ...edit.package, weightKg: Number(edit.package.weightKg), quantity: Number(edit.package.quantity), declaredValue: Number(edit.package.declaredValue || 0), shippingCost: Number(edit.package.shippingCost || 0) } };
      const updated = await updateShipment(id, payload); setShipment(updated); setEditing(false); window.dispatchEvent(new Event("shipment:changed")); toast.success("Shipment details saved.");
    } catch (requestError) { toast.error(requestError.response?.data?.message || "Could not save shipment details."); }
    finally { setSaving(false); }
  };

  const changeStatus = async (event) => {
    event.preventDefault();
    if (!nextStatus) return;
    setUpdatingStatus(true);
    try {
      const updated = await updateShipmentStatus(id, { status: nextStatus, message: statusMessage || `Shipment status updated to ${shipmentStatusLabels[nextStatus]}.`, location: location.trim() || undefined });
      setShipment(updated); setNextStatus(""); setStatusMessage(""); window.dispatchEvent(new Event("shipment:changed")); toast.success("Shipment status updated.");
    } catch (requestError) { toast.error(requestError.response?.data?.message || "Could not update shipment status."); }
    finally { setUpdatingStatus(false); }
  };

  const saveLocation = async (event) => {
    event.preventDefault();
    try {
      const updated = await updateShipmentLocation(id, { label: location.trim() });
      setShipment(updated); window.dispatchEvent(new Event("shipment:changed")); toast.success("Shipment location added to tracking history.");
    } catch (requestError) { toast.error(requestError.response?.data?.message || "Could not update shipment location."); }
  };

  const cancel = async () => {
    if (!window.confirm(`Cancel shipment ${shipment.trackingNumber}? This will add a cancellation event to its tracking history.`)) return;
    try { const updated = await updateShipmentStatus(id, { status: "cancelled", message: "Shipment cancelled by an administrator" }); setShipment(updated); window.dispatchEvent(new Event("shipment:changed")); toast.success("Shipment cancelled."); }
    catch (requestError) { toast.error(requestError.response?.data?.message || "Could not cancel shipment."); }
  };
  const remove = async () => {
    if (!window.confirm(`Permanently delete shipment ${shipment.trackingNumber}? This action cannot be undone.`)) return;
    try { await deleteShipment(id); window.dispatchEvent(new Event("shipment:changed")); toast.success("Shipment deleted."); window.location.assign("/admin/shipments"); }
    catch (requestError) { toast.error(requestError.response?.data?.message || "Only cancelled or returned shipments can be deleted."); }
  };

  if (loading) return <div className="mx-auto max-w-6xl animate-pulse space-y-4"><div className="h-10 rounded bg-slate-100"/><div className="h-48 rounded-xl bg-slate-100"/><div className="h-72 rounded-xl bg-slate-100"/></div>;
  if (error || !shipment) return <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-10 text-center"><h1 className="text-xl font-bold">Shipment unavailable</h1><p className="mt-2 text-sm text-slate-600">{error || "Shipment not found."}</p><button type="button" onClick={loadShipment} className="mt-4 font-semibold text-primary-light">Try again</button><Link to="/admin/shipments" className="ml-4 font-semibold text-primary-light">Back to shipments</Link></div>;

  const possibleStatuses = shipmentTransitions[shipment.status] || [];
  const addressString = (address) => [address?.street, address?.city, address?.state, address?.postalCode, address?.country].filter(Boolean).join(", ") || address?.label;
  const editableInput = (label, value, onChange, type = "text") => <label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">{label}</span><input type={type} value={value ?? ""} onChange={(event) => onChange(event.target.value)} className={inputClass}/></label>;

  return <main className="mx-auto max-w-6xl space-y-5">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><Link to="/admin/shipments" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light"><FaArrowLeft/> All shipments</Link><h1 className="mt-3 text-2xl font-bold text-slate-900">Shipment details</h1><p className="mt-1 break-all text-sm text-slate-500">{shipment.trackingNumber}</p></div><div className="flex flex-wrap gap-2">{!editing && <button type="button" onClick={startEditing} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold"><FaPen/> Edit details</button>}{!['delivered','cancelled','returned'].includes(shipment.status) && <button type="button" onClick={cancel} className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 text-sm font-semibold text-rose-700"><FaBan/> Cancel</button>}{['cancelled','returned'].includes(shipment.status) && <button type="button" onClick={remove} className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 text-sm font-semibold text-rose-700"><FaTrash/> Delete</button>}</div></div>
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current status</p><div className="mt-2"><ShipmentStatusBadge status={shipment.status}/></div></div><Info label="Tracking number" value={shipment.trackingNumber}/><Info label="Created" value={formatDate(shipment.createdAt, true)}/><Info label="Estimated delivery" value={formatDate(shipment.estimatedDeliveryDate)}/></div></section>
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><FaBox className="text-primary-light"/><h2 className="font-bold text-slate-900">Shipment and package</h2></div><dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Info label="Shipping mode" value={shipment.shippingMode}/><Info label="Service" value={shipment.serviceMode}/><Info label="Payment method" value={shipment.paymentMethod}/><Info label="Package description" value={shipment.package?.description}/><Info label="Weight" value={shipment.package?.weightKg ? `${shipment.package.weightKg} kg` : "—"}/><Info label="Dimensions" value={[shipment.package?.lengthCm, shipment.package?.widthCm, shipment.package?.heightCm].some(Boolean) ? `${shipment.package.lengthCm || "—"} × ${shipment.package.widthCm || "—"} × ${shipment.package.heightCm || "—"} cm` : "—"}/><Info label="Quantity" value={shipment.package?.quantity}/><Info label="Declared value" value={money(shipment.package?.declaredValue, shipment.package?.currency)}/><Info label="Shipping cost" value={money(shipment.package?.shippingCost, shipment.package?.currency)}/><Info label="Current location" value={shipment.currentLocation?.label}/></dl></section>
    {editing && <form onSubmit={saveEdits} className="space-y-5 rounded-xl border border-sky-200 bg-sky-50/40 p-5"><div className="flex items-center justify-between"><h2 className="font-bold text-slate-900">Edit shipment information</h2><button type="button" onClick={() => setEditing(false)} aria-label="Close editor" className="rounded p-2 text-slate-500"><FaXmark/></button></div><div className="grid gap-5 lg:grid-cols-2">{["sender","recipient"].map((party) => <section key={party} className="space-y-3 rounded-lg bg-white p-4"><h3 className="font-semibold capitalize">{party}</h3>{editableInput("Name", edit[party].name, (value) => editParty(party,"name",value))}{editableInput("Email", edit[party].email, (value) => editParty(party,"email",value), "email")}{editableInput("Phone", edit[party].phone, (value) => editParty(party,"phone",value), "tel")}{editableInput("Full address", edit[party].address?.label, (value) => editAddress(party,"label",value))}{editableInput("City", edit[party].address?.city, (value) => editAddress(party,"city",value))}{editableInput("State / region", edit[party].address?.state, (value) => editAddress(party,"state",value))}{editableInput("Country", edit[party].address?.country, (value) => editAddress(party,"country",value))}{editableInput("Postal code", edit[party].address?.postalCode, (value) => editAddress(party,"postalCode",value))}</section>)}</div><div className="grid gap-4 rounded-lg bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">{editableInput("Package description", edit.package.description, (value) => editPackage("description",value))}{editableInput("Weight (kg)", edit.package.weightKg, (value) => editPackage("weightKg",value), "number")}{editableInput("Length (cm)", edit.package.lengthCm, (value) => editPackage("lengthCm",value), "number")}{editableInput("Width (cm)", edit.package.widthCm, (value) => editPackage("widthCm",value), "number")}{editableInput("Height (cm)", edit.package.heightCm, (value) => editPackage("heightCm",value), "number")}{editableInput("Quantity", edit.package.quantity, (value) => editPackage("quantity",value), "number")}{editableInput("Declared value", edit.package.declaredValue, (value) => editPackage("declaredValue",value), "number")}{editableInput("Shipping cost", edit.package.shippingCost, (value) => editPackage("shippingCost",value), "number")}{editableInput("Currency", edit.package.currency || "NGN", (value) => editPackage("currency",value))}{editableInput("Estimated delivery", edit.estimatedDeliveryDate, (value) => setEdit({...edit,estimatedDeliveryDate:value}), "date")}<label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">Shipping mode</span><select value={edit.shippingMode||"road"} onChange={(event)=>setEdit({...edit,shippingMode:event.target.value})} className={inputClass}><option value="road">Road</option><option value="air">Air</option><option value="sea">Sea</option></select></label>{["serviceMode","paymentMethod"].map((field)=><label key={field} className="block"><span className="mb-1 block text-xs font-medium capitalize text-slate-600">{field.replace(/[A-Z]/g,(letter)=>` ${letter.toLowerCase()}`)}</span><input value={edit[field]||""} onChange={(event)=>setEdit({...edit,[field]:event.target.value})} className={inputClass}/></label>)}</div><div className="flex flex-wrap gap-2"><button disabled={saving} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-light px-4 font-semibold text-white disabled:opacity-60"><FaFloppyDisk/>{saving?"Saving…":"Save changes"}</button><button type="button" onClick={()=>setEditing(false)} className="h-10 rounded-lg border border-slate-200 px-4 font-semibold">Discard</button></div></form>}
    <div className="grid gap-5 lg:grid-cols-2"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><FaUser className="text-primary-light"/><h2 className="font-bold">Sender</h2></div><dl className="grid gap-4 sm:grid-cols-2"><Info label="Name" value={shipment.sender?.name}/><Info label="Email" value={shipment.sender?.email}/><Info label="Phone" value={shipment.sender?.phone}/><Info label="Pickup address" value={addressString(shipment.sender?.address)}/></dl></section><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><FaLocationDot className="text-primary-light"/><h2 className="font-bold">Recipient</h2></div><dl className="grid gap-4 sm:grid-cols-2"><Info label="Name" value={shipment.recipient?.name}/><Info label="Email" value={shipment.recipient?.email}/><Info label="Phone" value={shipment.recipient?.phone}/><Info label="Delivery address" value={addressString(shipment.recipient?.address)}/></dl></section></div>
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center gap-2"><FaCalendarDays className="text-primary-light"/><h2 className="font-bold">Update shipment status</h2></div>{possibleStatuses.length===0?<p className="text-sm text-slate-600">This shipment is in a terminal status and has no allowed next status.</p>:<form onSubmit={changeStatus} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">New status</span><select required value={nextStatus} onChange={(event)=>setNextStatus(event.target.value)} className={inputClass}><option value="">Select next status</option>{possibleStatuses.map((status)=><option key={status} value={status}>{shipmentStatusLabels[status]}</option>)}</select></label><label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">Update location</span><input value={location} onChange={(event)=>setLocation(event.target.value)} className={inputClass} placeholder="City, facility, country"/></label><label className="block sm:col-span-2"><span className="mb-1 block text-xs font-medium text-slate-600">Customer-facing update</span><input required minLength="3" value={statusMessage} onChange={(event)=>setStatusMessage(event.target.value)} className={inputClass} placeholder={nextStatus?`Shipment ${shipmentStatusLabels[nextStatus]?.toLowerCase()}`:"Describe this tracking update"}/></label><div className="sm:col-span-2 lg:col-span-4"><button disabled={updatingStatus||!nextStatus} className="h-10 rounded-lg bg-primary-light px-4 font-semibold text-white disabled:opacity-50">{updatingStatus?"Saving update…":"Save status update"}</button></div></form>}</section>
    <form onSubmit={saveLocation} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Update location</h2><p className="mt-1 text-sm text-slate-500">Add a location scan without changing the shipment status.</p><div className="mt-4 flex flex-col gap-3 sm:flex-row"><input required minLength="2" maxLength="500" value={location} onChange={(event)=>setLocation(event.target.value)} className={`${inputClass} flex-1`} placeholder="City, facility, country"/><button className="h-11 shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-700 hover:bg-slate-100">Save location update</button></div></form>
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Tracking history</h2>{!shipment.trackingEvents?.length?<p className="mt-4 text-sm text-slate-500">No tracking events recorded yet.</p>:<ol className="mt-5 space-y-0">{shipment.trackingEvents.map((item,index)=><li key={`${item._id||item.occurredAt}-${index}`} className="relative flex gap-4 pb-6 last:pb-0"><span className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full bg-primary-light ring-4 ring-blue-50"/>{index<shipment.trackingEvents.length-1&&<span className="absolute bottom-0 left-[5px] top-4 w-px bg-slate-200"/>}<div className="min-w-0 flex-1 sm:flex sm:justify-between sm:gap-4"><div><p className="font-semibold text-slate-900">{item.message}</p><p className="mt-1 text-sm text-slate-600">{item.previousStatus ? `${shipmentStatusLabels[item.previousStatus]||item.previousStatus} → ` : ""}{shipmentStatusLabels[item.status]||item.status}{item.location?.label ? ` · ${item.location.label}` : ""}</p></div><time className="mt-1 shrink-0 text-xs text-slate-500 sm:mt-0">{formatDate(item.occurredAt,true)}</time></div></li>)}</ol>}</section>
  </main>;
}
