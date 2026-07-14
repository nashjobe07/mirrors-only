import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/siteConfig";

export default function Logo({ className = "", light = false, height = 34 }) {
  return (
    <Link to="/" className={`group inline-flex items-center ${className}`} aria-label="Mirrors Only home">
      <img
        src={IMAGES.logo}
        alt="Mirrors Only — Delivery • Installation • Care"
        style={{ height }}
        className={`w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 ${
          light ? "rounded-sm bg-white p-1.5" : ""
        }`}
      />
    </Link>
  );
}