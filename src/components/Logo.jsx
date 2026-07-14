import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/siteConfig";

function MirrorMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect x="6.5" y="3.5" width="19" height="25" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M10 7 L20 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export default function Logo({ variant = "nav", className = "" }) {
  // Navigation (white header): use the brand logo image. The asset's white
  // background blends into the white header, so no box or crop is needed —
  // the mark scales to the header height without distortion.
  if (variant === "nav") {
    return (
      <Link to="/" className={`group inline-flex items-center ${className}`} aria-label="Mirrors Only home">
        <img
          src={IMAGES.logo}
          alt="Mirrors Only — Delivery · Installation · Care"
          draggable={false}
          className="h-[52px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 lg:h-[66px]"
        />
      </Link>
    );
  }

  // Footer (dark surface): crisp vector lockup — no raster white-box.
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Mirrors Only home">
      <MirrorMark className="h-8 w-8 shrink-0 text-icy transition-opacity duration-300 group-hover:opacity-80 sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-extrabold tracking-tight text-white transition-opacity duration-300 group-hover:opacity-80 sm:text-2xl">
          MIRRORS<span className="text-icy"> ONLY</span>
        </span>
        <span className="measure-tag mt-1 text-white/45">Delivery · Installation · Care</span>
      </span>
    </Link>
  );
}