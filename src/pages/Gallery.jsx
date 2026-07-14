import { useEffect, useState } from "react";
import { ImageIcon, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import { base44 } from "@/api/base44Client";
import { GALLERY_FILTERS } from "@/lib/siteConfig";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    base44.entities.GalleryProject.filter({ published: true }, "-order_index", 60)
      .then(setProjects).catch(() => {});
  }, []);

  const filters = ["All", ...GALLERY_FILTERS];
  const filtered = active === "All"
    ? projects
    : projects.filter((p) => {
        const sizeLabel = p.mirror_size === "4x5" ? "4' × 5'" : "4' × 6'";
        return [p.application, p.city, sizeLabel, p.orientation].some((v) => v === active);
      });

  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="Installed projects across the Phoenix metro"
        subtitle="Real client projects — filter by application, size, and orientation. Projects appear here as they're completed and verified."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-12 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${active === f ? "border-icy bg-icy/10 text-icy-dark" : "border-silver text-slate-ink hover:border-obsidian/30"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80} className="group overflow-hidden border border-silver bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden bg-silver">
                    {p.after_image
                      ? <img src={p.after_image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      : <PlaceholderTile />}
                    {p.before_image && (
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <img src={p.before_image} alt="Before" className="h-full w-full object-cover" />
                        <span className="absolute left-3 top-3 bg-obsidian/80 px-2 py-1 text-[10px] font-semibold text-white">BEFORE</span>
                      </div>
                    )}
                    <span className="measure-tag absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-obsidian">
                      {p.mirror_size === "4x5" ? "4' × 5'" : "4' × 6'"} · {p.orientation}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-base font-bold text-obsidian">{p.title}</p>
                    {p.description && <p className="mt-1 text-[13px] leading-relaxed text-slate-ink">{p.description}</p>}
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-slate-ink">
                      {p.city && <span>{p.city}</span>}
                      {p.application && <span>· {p.application}</span>}
                      {p.num_mirrors > 1 && <span>· {p.num_mirrors} mirrors</span>}
                      {p.installation_date && <span>· {p.installation_date}</span>}
                    </div>
                    {p.customer_review && (
                      <p className="mt-3 border-t border-silver pt-3 text-[13px] italic text-obsidian">"{p.customer_review}"</p>
                    )}
                  </div>
                </Reveal>
              ))
            ) : (
              <div className="col-span-full">
                <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-silver bg-lightgray px-6 py-20 text-center">
                  <ImageIcon className="h-10 w-10 text-slate-ink/40" />
                  <h3 className="font-heading text-xl font-bold text-obsidian">Gallery coming soon</h3>
                  <p className="max-w-md text-[14px] text-slate-ink">Real client projects will appear here once uploaded and verified. No fictional projects are displayed.</p>
                  <Btn to="/shop" variant="accent" className="mt-2">Start your project <ArrowRight className="h-4 w-4" /></Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlaceholderTile() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-silver to-lightgray text-slate-ink/50">
      <ImageIcon className="h-8 w-8" />
      <span className="measure-tag">Project photo pending</span>
    </div>
  );
}