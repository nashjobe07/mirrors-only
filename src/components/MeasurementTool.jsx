import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/siteConfig";
import { Ruler, Info, CheckCircle2 } from "lucide-react";

function num(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

const FIELD = "h-11 w-full border border-silver bg-white px-3 text-sm text-obsidian outline-none focus:border-icy";
const LABEL = "block text-[12px] font-semibold tracking-tight text-slate-ink mb-1.5";

export default function MeasurementTool() {
  const [size, setSize] = useState("4x5");
  const [orientation, setOrientation] = useState("vertical");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [base, setBase] = useState("");
  const [bottom, setBottom] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const result = useMemo(() => {
    if (!w || !h) return null;
    const p = PRODUCTS[size];
    const mirrorW = orientation === "vertical" ? p.widthIn : p.heightIn;
    const mirrorH = orientation === "vertical" ? p.heightIn : p.widthIn;
    const wallW = num(w);
    const wallH = num(h);
    const baseH = num(base);
    const bottomPos = num(bottom);
    const topGap = num(top);
    const leftGap = num(left);
    const rightGap = num(right);

    const availW = wallW - leftGap - rightGap;
    const availH = wallH - baseH - bottomPos - topGap;
    const widthClear = availW - mirrorW;
    const heightClear = availH - mirrorH;

    if (widthClear < 0 || heightClear < 0) {
      return {
        ok: false,
        msg: `Based on the measurements entered, the selected mirror does NOT appear to fit. ${widthClear < 0 ? `Width is short by ${Math.abs(widthClear).toFixed(1)}".` : ""} ${heightClear < 0 ? `Height is short by ${Math.abs(heightClear).toFixed(1)}".` : ""} Please choose a different size, orientation, or location.`
      };
    }
    const minClear = Math.min(widthClear, heightClear);
    return {
      ok: true,
      msg: `Based on the measurements entered, the ${p.name} (${orientation}) appears to fit with approximately ${minClear.toFixed(1)}" of clearance remaining.`
    };
  }, [size, orientation, w, h, base, bottom, top, left, right]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="mb-5 flex flex-wrap gap-3">
          {["4x5", "4x6"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                size === s ? "border-icy bg-icy/10 text-icy-dark" : "border-silver text-slate-ink hover:border-obsidian/30"
              }`}
            >
              {PRODUCTS[s].name}
            </button>
          ))}
          <div className="mx-1 self-center text-slate-ink">·</div>
          {["vertical", "horizontal"].map((o) => (
            <button
              key={o}
              onClick={() => setOrientation(o)}
              className={`border px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                orientation === o ? "border-icy bg-icy/10 text-icy-dark" : "border-silver text-slate-ink hover:border-obsidian/30"
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <label className={LABEL}>Wall width (in)</label>
            <input className={FIELD} value={w} onChange={(e) => setW(e.target.value)} placeholder="120" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Wall height (in)</label>
            <input className={FIELD} value={h} onChange={(e) => setH(e.target.value)} placeholder="96" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Baseboard height</label>
            <input className={FIELD} value={base} onChange={(e) => setBase(e.target.value)} placeholder="4" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Desired bottom (in)</label>
            <input className={FIELD} value={bottom} onChange={(e) => setBottom(e.target.value)} placeholder="0" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Desired top gap (in)</label>
            <input className={FIELD} value={top} onChange={(e) => setTop(e.target.value)} placeholder="6" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Left clearance (in)</label>
            <input className={FIELD} value={left} onChange={(e) => setLeft(e.target.value)} placeholder="12" inputMode="decimal" />
          </div>
          <div>
            <label className={LABEL}>Right clearance (in)</label>
            <input className={FIELD} value={right} onChange={(e) => setRight(e.target.value)} placeholder="12" inputMode="decimal" />
          </div>
        </div>

        <div className="mt-5 rounded-sm border border-silver/80 bg-lightgray p-4 text-[13px] leading-relaxed text-slate-ink">
          <p className="flex items-center gap-2 font-semibold text-obsidian">
            <Info className="h-4 w-4" /> Measure at multiple points
          </p>
          <p className="mt-1.5">
            Walls, floors, and ceilings may not be perfectly square. Measure width and height at several
            points and account for outlets, switches, vents, trim, doors, and permanent obstructions.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Scale preview */}
        <div className="relative flex-1 overflow-hidden border border-silver bg-gradient-to-b from-white to-lightgray p-5">
          <span className="measure-tag">Approximate scale · not exact</span>
          <ScalePreview size={size} orientation={orientation} />
        </div>

        {result && (
          <div
            className={`mt-4 flex items-start gap-3 border-l-2 p-4 ${
              result.ok ? "border-icy bg-icy/5" : "border-red-400 bg-red-50"
            }`}
          >
            {result.ok ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-icy-dark" />
            ) : (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            )}
            <p className="text-sm font-medium text-obsidian">{result.msg}</p>
          </div>
        )}
        <p className="mt-3 text-[12px] leading-relaxed text-slate-ink">
          This tool provides guidance only. The customer remains responsible for confirming that the
          selected mirror fits the intended space. Mirrors Only does not perform a pre-installation measurement.
        </p>
      </div>
    </div>
  );
}

function ScalePreview({ size, orientation }) {
  const p = PRODUCTS[size];
  const mirrorW = orientation === "vertical" ? p.widthIn : p.heightIn;
  const mirrorH = orientation === "vertical" ? p.heightIn : p.widthIn;
  // Scale so the taller dimension fits ~ 70% of preview height (300px)
  const maxDim = Math.max(mirrorW, mirrorH);
  const scale = 220 / maxDim;
  const mw = mirrorW * scale;
  const mh = mirrorH * scale;
  const personH = 69 * scale; // 5'9" person

  return (
    <div className="relative mt-3 flex h-[300px] items-end justify-center gap-6">
      {/* Mirror */}
      <div
        className="relative border border-obsidian/30"
        style={{
          width: `${mw}px`,
          height: `${mh}px`,
          background: "linear-gradient(135deg, rgba(226,232,240,0.9), rgba(148,163,184,0.4))",
          boxShadow: "0 20px 50px -20px rgba(0,0,0,0.3)"
        }}
      >
        <span className="absolute -top-5 left-0 measure-tag text-icy-dark">
          {mirrorW}" × {mirrorH}"
        </span>
      </div>
      {/* Person */}
      <div className="relative flex flex-col items-center" style={{ height: `${personH}px` }}>
        <div className="h-3 w-3 rounded-full bg-slate-ink/60" />
        <div className="mt-0.5 h-6 w-1 bg-slate-ink/40" />
        <div className="h-3 w-10 bg-slate-ink/40" />
        <div className="h-12 w-1 bg-slate-ink/40" />
        <span className="absolute -bottom-5 measure-tag">~5'9" person</span>
      </div>
    </div>
  );
}