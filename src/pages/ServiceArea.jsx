import { useEffect, useState } from "react";
import { Check, MapPin, Info } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ZipChecker from "@/components/ZipChecker";
import { base44 } from "@/api/base44Client";
import { SERVICE_CITIES } from "@/lib/siteConfig";

export default function ServiceArea() {
  const [zips, setZips] = useState([]);

  useEffect(() => {
    base44.entities.ServiceAreaZip.list("-city", 200)
      .then(setZips).catch(() => {});
  }, []);

  // Merge static cities with any DB-backed coverage data
  const cityStatus = (city) => {
    const match = zips.find((z) => z.city === city);
    if (!match) return { status: "pending", label: "Confirm availability" };
    if (match.status === "inactive") return { status: "inactive", label: "Not currently served" };
    if (match.status === "surcharge") return { status: "surcharge", label: `Surcharge: +$${match.surcharge}` };
    return { status: "active", label: "Active" };
  };

  return (
    <div>
      <PageHero
        eyebrow="Service Area"
        title="Phoenix metropolitan coverage"
        subtitle="Enter your ZIP to confirm pickup, delivery, and installation. Extended areas may include a surcharge. Coverage is activated per ZIP by our team."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="ZIP checker" title="Check your address" />
              <div className="mt-6"><ZipChecker /></div>
              <div className="mt-6 border-l-2 border-icy bg-icy/5 p-4 text-[13px] text-slate-ink">
                Results may return: pickup available, delivery available, delivery and installation available,
                extended service area with surcharge, commercial quote required, or currently outside the service area.
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading eyebrow="Cities" title="Where we work" subtitle="Cities in the Phoenix metro. Final availability is confirmed by ZIP and may be activated, deactivated, or carry a surcharge." />
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {SERVICE_CITIES.map((city) => {
                  const s = cityStatus(city);
                  const tone = s.status === "active" ? "text-icy-dark" : s.status === "surcharge" ? "text-amber-600" : s.status === "inactive" ? "text-red-500" : "text-slate-ink";
                  return (
                    <div key={city} className="flex items-center justify-between border border-silver bg-lightgray px-4 py-2.5">
                      <span className="flex items-center gap-2 text-[13px] font-medium text-obsidian"><MapPin className="h-4 w-4 text-slate-ink" /> {city}</span>
                      <span className={`text-[11px] font-semibold ${tone}`}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <div className="flex items-start gap-3 border border-silver bg-white p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-icy-dark" />
              <p className="text-[13px] leading-relaxed text-slate-ink">
                We do not automatically promise service to every city. Each ZIP is activated, deactivated, or
                assigned a surcharge by an administrator. If your area is outside our coverage, request a
                commercial quote and we'll do our best to help.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}