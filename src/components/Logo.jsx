import { Link } from "react-router-dom";

export default function Logo({ className = "", light = false }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Mirrors Only home">
      <span className="relative flex h-7 w-3 items-start">
        <span
          className="block h-7 w-3 rounded-[1px] border border-silver/80 transition-all duration-500 group-hover:border-icy"
          style={{
            background: light
              ? "linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.25))"
              : "linear-gradient(160deg, rgba(226,232,240,0.9), rgba(148,163,184,0.35))"
          }}
        />
        <span className="absolute -right-1 top-1 h-5 w-[1.5px] bg-icy/70 transition-opacity duration-500 group-hover:bg-icy" />
      </span>
      <span className={`font-heading text-[15px] font-extrabold leading-none tracking-tight ${light ? "text-white" : "text-obsidian"}`}>
        MIRRORS <span className="text-icy">ONLY</span>
      </span>
    </Link>
  );
}