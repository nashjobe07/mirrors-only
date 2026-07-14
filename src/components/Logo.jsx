import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/siteConfig";

export default function Logo({ className = "", light = false, height = 34 }) {
  // Dark backgrounds (footer): clean typeset wordmark — no image box, fully native
  if (light) {
    return (
      <Link to="/" className={`group inline-flex flex-col items-start ${className}`} aria-label="Mirrors Only home">
        <span className="font-heading text-[20px] font-extrabold leading-none tracking-tight text-white transition-colors group-hover:text-icy">
          MIRRORS <span className="text-icy">ONLY</span>
        </span>
        <span className="mt-2 flex items-center gap-2 text-[8.5px] font-medium uppercase tracking-[0.22em] text-white/45">
          <span className="h-px w-5 bg-white/25" />
          Delivery · Installation · Care
          <span className="h-px w-5 bg-white/25" />
        </span>
      </Link>
    );
  }

  // Light backgrounds (navbar): real logo image — multiply blend drops the white background
  return (
    <Link to="/" className={`group inline-flex items-center ${className}`} aria-label="Mirrors Only home">
      <img
        src={IMAGES.logo}
        alt="Mirrors Only — Delivery • Installation • Care"
        style={{ height }}
        className="w-auto object-contain mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80"
      />
    </Link>
  );
}