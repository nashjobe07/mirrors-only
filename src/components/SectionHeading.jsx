export default function SectionHeading({ eyebrow, title, subtitle, align = "left", dark = false, className = "" }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`${alignCls} ${className}`}>
      {eyebrow && (
        <div className={`measure-tag ${align === "center" ? "justify-center" : ""} flex items-center gap-2`}>
          <span className="h-px w-6 bg-icy" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`mt-3 font-heading text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold leading-[1.03] tracking-tight ${
          dark ? "text-white" : "text-obsidian"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-slate-ink"} ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}