import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { suggestAddresses } from "../../services/shipment.service";

const inputClass =
  "h-12 w-full rounded-md border border-[#cbd7e6] bg-white px-4 text-sm text-[#24344d] outline-none placeholder:text-[#9aa9bc] focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/10";

export function AddressAutocomplete({ label, value, onChange, idPrefix }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const query = value.label.trim();
    if (value.placeId || query.length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const results = await suggestAddresses(query, controller.signal);
        setSuggestions(results);
        setOpen(true);
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") {
          setSuggestions([]);
          setOpen(false);
          setError(
            requestError.response?.data?.message ||
              "Suggestions are unavailable. You can enter the address manually.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value.label, value.placeId]);

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const update = (field, nextValue) =>
    onChange({
      ...value,
      [field]: nextValue,
      ...(field !== "placeId" ? { placeId: "", coordinates: [] } : {}),
    });
  const choose = (suggestion) => {
    onChange({
      label: suggestion.label,
      street: suggestion.street || "",
      city: suggestion.city || "",
      state: suggestion.state || "",
      country: suggestion.country || "",
      postalCode: suggestion.postalCode || "",
      placeId: suggestion.id || "",
      coordinates: suggestion.coordinates || [],
    });
    setSuggestions([]);
    setOpen(false);
    setError("");
  };

  return (
    <div ref={rootRef} className="space-y-4">
      <div className="relative">
        <label
          htmlFor={`${idPrefix}-address`}
          className="mb-2 block text-sm font-medium text-[#3d4d66]"
        >
          {label}
        </label>
        <div className="relative">
          <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8da5]" />
          <input
            id={`${idPrefix}-address`}
            type="text"
            autoComplete="street-address"
            role="combobox"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={`${idPrefix}-suggestions`}
            aria-autocomplete="list"
            placeholder="Start typing a street address"
            value={value.label}
            onFocus={() => suggestions.length && setOpen(true)}
            onChange={(event) => {
              update("label", event.target.value);
              setSuggestions([]);
              setOpen(false);
              setLoading(false);
              setError("");
            }}
            className={`${inputClass} pl-10`}
          />
          {loading && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              Searching…
            </span>
          )}
        </div>
        {open && !loading && suggestions.length > 0 && (
          <ul
            id={`${idPrefix}-suggestions`}
            role="listbox"
            className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-xl"
          >
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => choose(item)}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
                >
                  <span className="block font-medium">
                    {item.street || item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {[item.city, item.state, item.country, item.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {open &&
          !loading &&
          suggestions.length === 0 &&
          value.label.trim().length >= 3 &&
          !error && (
            <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
              No matching addresses. Continue entering the address manually.
            </p>
          )}
        {error && (
          <p
            role="status"
            className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800"
          >
            {error}
          </p>
        )}
        {value.placeId && (
          <p className="mt-1 text-xs text-emerald-700">
            Verified address selected. You can edit the address details below.
          </p>
        )}
      </div>
      <p className="-mt-2 text-right text-[11px] text-slate-400">
        Address suggestions powered by Geoapify
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          ["street", "Street"],
          ["city", "City"],
          ["state", "State / Region"],
          ["country", "Country"],
          ["postalCode", "Postal code"],
        ].map(([field, title]) => (
          <div key={field}>
            <label
              htmlFor={`${idPrefix}-${field}`}
              className="mb-1 block text-xs font-medium text-[#52657f]"
            >
              {title}
            </label>
            <input
              id={`${idPrefix}-${field}`}
              value={value[field] || ""}
              onChange={(event) => update(field, event.target.value)}
              className={inputClass}
              autoComplete={field === "postalCode" ? "postal-code" : field}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
