export default function PageHero({ eyebrow, title, subtitle, dark = true }) {
  return (
    <section className={dark ? "bg-obsidian text-white" : "bg-lightgray text-obsidian"}>
      <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:py-20 lg:px-10">
        <div className="measure-tag flex items-center gap-2 text-icy">
          <span className="h-px w-6 bg-icy" /> {eyebrow}
        </div>
        <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.02] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-slate-ink"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}