import { useState } from "react";
import { Search, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { base44 } from "@/api/base44Client";

function resultMeta(result) {
  switch (result) {
    case "pickup":
      return { label: "Pickup available", tone: "ok" };
    case "delivery":
      return { label: "Delivery available", tone: "ok" };
    case "installation":
      return { label: "Delivery and installation available", tone: "ok" };
    case "surcharge":
      return { label: "Extended service area with surcharge", tone: "warn" };
    case "commercial":
      return { label: "Commercial quote required", tone: "warn" };
    default:
      return { label: "Currently outside the service area", tone: "bad" };
  }
}

export default function ZipChecker({ compact = false, onResult }) {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [detail, setDetail] = useState("");

  const check = async (e) => {
    e.preventDefault();
    const code = zip.trim();
    if (code.length < 5) return;
    setLoading(true);
    setResult(null);
    try {
      const rows = await base44.entities.ServiceAreaZip.filter({ zip_code: code });
      let res = "commercial";
      if (rows && rows.length > 0) {
        const r = rows[0];
        if (r.status === "inactive") res = "outside";
        else if (r.status === "surcharge") res = "surcharge";
        else if (r.installation_available) res = "installation";
        else if (r.delivery_available) res = "delivery";
        else if (r.pickup_available) res = "pickup";
        setResult(res);
        setDetail(r.city ? `${r.city}, AZ` + (r.surcharge ? ` · +$${r.surcharge} surcharge` : "") : "");
      } else {
        setResult(res);
        setDetail("This ZIP isn't confirmed in our system yet.");
      }
      if (onResult) onResult(res);
    } catch (err) {
      setResult("outside");
      setDetail("We couldn't verify coverage right now. Please call us to confirm.");
    } finally {
      setLoading(false);
    }
  };

  const meta = result ? resultMeta(result) : null;

  if (compact) {
    return (
      <form onSubmit={check} className="flex w-full items-center gap-2">
        <input
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter ZIP"
          className="h-11 w-full border border-silver bg-white px-4 text-sm text-obsidian outline-none focus:border-icy"
          aria-label="ZIP code"
        />
        <button
          type="submit"
          disabled={loading || zip.length < 5}
          className="flex h-11 shrink-0 items-center gap-2 bg-icy px-4 text-sm font-semibold text-obsidian disabled:opacity-50"
        >
          <Search className="h-4 w-4" /> Check
        </button>
      </form>
    );
  }

  return (
    <div className="hairline bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2 text-slate-ink">
        <MapPin className="h-4 w-4" />
        <span className="measure-tag">Phoenix Metro Availability</span>
      </div>
      <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-obsidian">
        Check delivery availability
      </h3>
      <p className="mt-1.5 text-sm text-slate-ink">
        Enter your ZIP code to see pickup, delivery, and installation options.
      </p>
      <form onSubmit={check} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 85032"
          className="h-12 flex-1 border border-silver bg-white px-4 text-base text-obsidian outline-none focus:border-icy"
          aria-label="ZIP code"
        />
        <button
          type="submit"
          disabled={loading || zip.length < 5}
          className="flex h-12 items-center justify-center gap-2 bg-obsidian px-7 text-sm font-semibold text-white hover:bg-nearblack disabled:opacity-50"
        >
          <Search className="h-4 w-4" /> {loading ? "Checking…" : "Check Availability"}
        </button>
      </form>

      {result && meta && (
        <div
          className={`mt-5 flex items-start gap-3 border-l-2 p-4 ${
            meta.tone === "ok"
              ? "border-icy bg-icy/5"
              : meta.tone === "warn"
              ? "border-amber-400 bg-amber-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          {meta.tone === "ok" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-icy-dark" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          )}
          <div>
            <p className="text-sm font-semibold text-obsidian">{meta.label}</p>
            {detail && <p className="mt-0.5 text-[13px] text-slate-ink">{detail}</p>}
          </div>
        </div>
      )}
    </div>
  );
}