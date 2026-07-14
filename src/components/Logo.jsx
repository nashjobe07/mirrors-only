import { Link } from "react-router-dom";

function MirrorMark({ className = "" }) {
  return (
    <svg viewBox="0 0 42 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* speed lines */}
      <path d="M2 15 H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M1 21 H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 27 H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* mirror frame */}
      <rect x="12" y="4" width="22" height="34" rx="2.5" fill="#0A0A0B" />
      <rect x="13.5" y="5.5" width="19" height="31" rx="1.5" fill="url(#moShine)" />
      <path d="M17 9 L26.5 33" stroke="#00CED1" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <defs>
        <linearGradient id="moShine" x1="14" y1="6" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F5F9" />
          <stop offset="0.5" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ className = "", light = false, size = "sm" }) {
  const mark = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const title = size === "lg" ? "text-xl" : "text-[15px]";
  const sub = size === "lg" ? "text-[9px]" : "text-[8px]";
  const ink = light ? "text-white" : "text-obsidian";
  const subColor = light ? "text-white/55" : "text-slate-ink";

  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Mirrors Only home">
      <MirrorMark className={`shrink-0 ${mark} ${light ? "text-white" : "text-obsidian"}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold uppercase tracking-[0.14em] ${title} ${ink}`}>
          Mirrors Only
        </span>
        <span className={`mt-1 font-medium uppercase tracking-[0.22em] ${sub} ${subColor}`}>
          Delivery · Installation · Care
        </span>
      </span>
    </Link>
  );
}