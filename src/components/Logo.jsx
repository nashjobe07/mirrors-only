import { Link } from "react-router-dom";

function BrandMark({ className, accent, frame }) {
  return (
    <svg viewBox="0 0 120 52" className={className} fill="none" aria-hidden="true">
      {/* motion lines (left) */}
      <line x1="6" y1="15" x2="28" y2="15" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <line x1="2" y1="26" x2="32" y2="26" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <line x1="6" y1="37" x2="30" y2="37" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      {/* mirror frame */}
      <rect x="48" y="6" width="26" height="40" rx="3" stroke={frame} strokeWidth="3" />
      <path d="M54 12 L68 38" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      {/* chevron (right) */}
      <polyline points="84,15 100,26 84,37" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Crisp, resolution-independent vector lockup of the Mirrors Only logo:
// mirror-frame icon with motion lines + chevron, "MIRRORS ONLY" wordmark
// (teal "ONLY"), and the tagline flanked by hairlines. Transparent, sharp at
// any size, and toned for light (nav) or dark (footer) surfaces.
export default function Logo({ variant = "nav", className = "" }) {
  const isFooter = variant === "footer";
  const wordColor = isFooter ? "text-white" : "text-obsidian";
  const tagColor = isFooter ? "text-white/55" : "text-slate-ink";
  const lineColor = isFooter ? "bg-white/25" : "bg-silver";
  const accent = "#008B8B";
  const frame = isFooter ? "#CBD5E1" : "#94A3B8";

  return (
    <Link
      to="/"
      className={`group inline-flex flex-col items-center ${className}`}
      aria-label="Mirrors Only home"
    >
      <BrandMark
        className="h-6 w-auto transition-opacity duration-300 group-hover:opacity-80 lg:h-7"
        accent={accent}
        frame={frame}
      />
      <span
        className={`mt-1 font-heading text-base font-extrabold uppercase leading-none tracking-[0.04em] ${wordColor} transition-opacity duration-300 group-hover:opacity-80 lg:text-[19px]`}
      >
        MIRRORS<span className="text-icy-dark"> ONLY</span>
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span className={`h-px w-3 ${lineColor} lg:w-4`} />
        <span className={`text-[7px] font-medium uppercase tracking-[0.2em] ${tagColor} lg:text-[8px]`}>
          Delivery • Installation • Care
        </span>
        <span className={`h-px w-3 ${lineColor} lg:w-4`} />
      </span>
    </Link>
  );
}