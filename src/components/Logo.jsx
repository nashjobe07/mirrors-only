import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/siteConfig";

// Visible logo heights.
// Desktop header 80px → logo 52px; Mobile header 68px → logo 38px.
const SIZES = {
  nav: "h-[38px] lg:h-[52px]",
  footer: "h-9 sm:h-11"
};

// Horizontal lockup aspect (width : height). The source asset ships as a square
// with generous white margins; object-cover crops the vertical whitespace so
// the mark fills the bar instead of reading as a small square thumbnail.
// Non-destructive — no scaling distortion.
const DEFAULT_ASPECT = "3.2 / 1";

export default function Logo({ variant = "nav", className = "", aspect = DEFAULT_ASPECT }) {
  const isFooter = variant === "footer";
  const src = isFooter ? (IMAGES.logoDark || IMAGES.logo) : (IMAGES.logoLight || IMAGES.logo);
  const sizeClass = SIZES[variant] || SIZES.nav;

  return (
    <Link
      to="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="Mirrors Only home"
    >
      <span
        className={`relative block overflow-hidden ${sizeClass}`}
        style={{ aspectRatio: aspect }}
      >
        <img
          src={src}
          alt="Mirrors Only — Delivery · Installation · Care"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
        />
      </span>
    </Link>
  );
}