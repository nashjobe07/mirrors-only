import { Link } from "react-router-dom";

function MirrorMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect x="6.5" y="3.5" width="19" height="25" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M10 7 L20 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

// Crisp, resolution-independent lockup built from the brand's own type and
// palette — no raster asset, so it stays sharp at every size and has a
// transparent background on both light (nav) and dark (footer) surfaces.
export default function Logo({ variant = "nav", className = "" }) {
  const isFooter = variant === "footer";
  const wordColor = isFooter ? "text-white" : "text-obsidian";
  const tagColor = isFooter ? "text-white/45" : "text-slate-ink";
  const wordSize = isFooter ? "text-xl sm:text-2xl" : "text-xl lg:text-[26px]";
  const markSize = isFooter ? "h-8 w-8 sm:h-9 sm:w-9" : "h-8 w-8 lg:h-9 lg:w-9";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Mirrors Only home"
    >
      <MirrorMark className={`${markSize} shrink-0 text-icy transition-opacity duration-300 group-hover:opacity-80`} />
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tight ${wordSize} ${wordColor} transition-opacity duration-300 group-hover:opacity-80`}>
          Mirrors<span className="text-icy"> Only</span>
        </span>
        <span className={`measure-tag mt-1 ${tagColor}`}>Delivery · Installation · Care</span>
      </span>
    </Link>
  );
}