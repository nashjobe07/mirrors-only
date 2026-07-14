import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Truck, PackageCheck, Wrench, ShieldCheck, Star,
  Dumbbell, Warehouse, Activity, Music, Flower, Swords, BedDouble, Shirt,
  Scissors, Building2, Building, Ruler, Clock, MapPin, ChevronRight, ImageIcon
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import {
  PRODUCTS, IMAGES, TRUST, FULFILLMENT, WARRANTY, SERVICE_CITIES, USE_CASES, CONTACT
} from "@/lib/siteConfig";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ZipChecker from "@/components/ZipChecker";
import MeasurementTool from "@/components/MeasurementTool";

const ICONS = { Dumbbell, Warehouse, Activity, Music, Flower, Swords, BedDouble, Shirt, Scissors, Building2, Building };

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    base44.entities.GalleryProject.filter({ published: true }, "-order_index", 4)
      .then(setProjects).catch(() => {});
    base44.entities.Review.filter({ published: true }, "-created_date", 4)
      .then(setReviews).catch(() => {});
  }, []);

  return (
    <div>
      <Hero />
      <TrustBar />
      <Process />
      <ProductComparison />
      <Fulfillment />
      <Measurement />
      <UseCases />
      <WhyUs />
      <GalleryPreview projects={projects} />
      <Reviews reviews={reviews} />
      <WarrantySection />
      <ServiceAreaPreview />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-obsidian text-white">
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Large frameless mirror in a minimalist garage gym" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </div>

      <div className="relative mx-auto grid max-w-edge items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28 lg:px-10">
        <div>
          <div className="measure-tag flex items-center gap-2 text-icy">
            <span className="h-px w-6 bg-icy" /> Phoenix Metropolitan Area
          </div>
          <h1 className="mt-4 font-heading text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold leading-[0.98] tracking-tight">
            Large Frameless Mirrors—<span className="text-icy">Delivered and Installed</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
            Choose a 4' × 5' or 4' × 6' mirror, then select pickup, local delivery, or professional
            installation throughout the Phoenix metropolitan area.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/shop" variant="accent" size="lg">
              Shop Mirrors <ArrowRight className="h-4 w-4" />
            </Btn>
            <Btn to="/how-it-works" variant="darkOutline" size="lg">
              See How It Works
            </Btn>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: PackageCheck, label: "Pickup Available" },
              { icon: Truck, label: "Phoenix Metro Delivery" },
              { icon: Wrench, label: "Professional Installation" }
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm text-white/80">
                <s.icon className="h-4 w-4 text-icy" /> {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Dimension cards */}
        <div className="hidden flex-col gap-4 lg:flex">
          {["4x5", "4x6"].map((id) => {
            const p = PRODUCTS[id];
            return (
              <Link
                key={id}
                to={`/shop?size=${id}`}
                className="group relative overflow-hidden border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-icy/60 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="measure-tag text-white/50">{p.sku}</span>
                  <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-icy" />
                </div>
                <p className="mt-2 font-heading text-2xl font-bold tracking-tight">{p.name}</p>
                <p className="mt-1 text-3xl font-heading font-extrabold tracking-tight text-icy">
                  {p.widthFt}' × {p.heightFt}' <span className="text-base font-medium text-white/50">/ {p.widthIn}" × {p.heightIn}"</span>
                </p>
                <p className="mt-2 text-sm text-white/55">From ${p.price}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUST BAR ---------------- */
function TrustBar() {
  return (
    <section className="border-b border-silver bg-white">
      <div className="mx-auto flex max-w-edge flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6 lg:px-10">
        {TRUST.map((t) => (
          <div key={t} className="flex items-center gap-2 text-[13px] font-medium text-slate-ink">
            <Check className="h-4 w-4 text-icy-dark" /> {t}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    { n: "01", title: "Choose Your Size", desc: "Select either a 4' × 5' or 4' × 6' frameless mirror." },
    { n: "02", title: "Choose Your Service", desc: "Select customer pickup, local delivery, or delivery with professional installation." },
    { n: "03", title: "Choose Your Date", desc: "Select an available pickup, delivery, or installation window." }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The Process"
            title="Getting Your Mirror Is Simple"
            subtitle="Three decisions. No custom-glass confusion. Mirrors Only handles the rest."
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden border border-silver bg-silver md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="bg-white p-8 lg:p-10">
              <span className="font-heading text-5xl font-extrabold tracking-tight text-silver">{s.n}</span>
              <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-obsidian">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-ink">{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Btn to="/shop" variant="accent" size="lg">
            Start Your Order <ArrowRight className="h-4 w-4" />
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PRODUCT COMPARISON ---------------- */
function ProductComparison() {
  return (
    <section className="bg-lightgray">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Two Sizes. Zero Confusion."
            title="Choose your mirror"
            subtitle="Two standardized frameless sizes. The mirror may be positioned vertically or horizontally when installation conditions allow."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {["4x5", "4x6"].map((id, i) => {
            const p = PRODUCTS[id];
            const specs = [
              ["Width", `${p.widthFt} feet (${p.widthIn}")`],
              ["Height", `${p.heightFt} feet (${p.heightIn}")`],
              ["Thickness", p.thickness],
              ["Weight", p.weight],
              ["Edge finish", p.edge],
              ["Safety backing", p.safetyBacking],
              ["Mounting", p.mounting],
              ["Inventory", p.inventory],
              ["Pickup availability", p.pickupAvailability],
              ["Delivery availability", p.deliveryAvailability],
              ["Warranty", p.warranty],
              ["SKU", p.sku]
            ];
            return (
              <Reveal key={id} delay={i * 120}>
                <div className="flex h-full flex-col border border-silver bg-white">
                  <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-lightgray p-8">
                    <div
                      className="border border-obsidian/20"
                      style={{
                        width: `${p.widthFt * 28}px`,
                        height: `${p.heightFt * 28}px`,
                        background: "linear-gradient(135deg, rgba(226,232,240,0.95), rgba(148,163,184,0.35))",
                        boxShadow: "0 24px 60px -28px rgba(0,0,0,0.4)"
                      }}
                    />
                    <span className="measure-tag absolute right-4 top-4 text-icy-dark">
                      {p.widthIn}" × {p.heightIn}"
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-obsidian">{p.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-ink">{p.orientationNotice}</p>
                    <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-silver pt-5 sm:grid-cols-2">
                      {specs.map(([k, v]) => (
                        <div key={k} className="flex flex-col">
                          <dt className="measure-tag">{k}</dt>
                          <dd className="text-[13px] font-medium text-obsidian">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex items-center justify-between border-t border-silver pt-5">
                      <span className="font-heading text-2xl font-extrabold tracking-tight text-obsidian">${p.price}</span>
                      <Btn to={`/shop?size=${id}`} variant="primary">
                        Select {p.widthFt}' × {p.heightFt}'
                      </Btn>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <div className="border border-silver bg-white p-6">
            <div className="flex items-center gap-2 text-slate-ink">
              <Ruler className="h-4 w-4" /> <span className="measure-tag">Scale comparison · approximate, not to exact size</span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-ink">
              Both mirrors are 4' wide; the 4' × 6' is one foot taller. The illustration above is approximate
              and is intended to convey relative scale against an average-height person (≈5'9") and common
              wall configurations. Confirm exact dimensions before purchase.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FULFILLMENT ---------------- */
function Fulfillment() {
  const cards = [
    { key: "pickup", icon: PackageCheck, ...FULFILLMENT.pickup, cta: "Choose Pickup" },
    { key: "delivery", icon: Truck, ...FULFILLMENT.delivery, cta: "Choose Delivery" },
    { key: "installation", icon: Wrench, ...FULFILLMENT.installation, cta: "Choose Installation" }
  ];
  return (
    <section className="bg-obsidian text-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Fulfillment Options"
            title="Pickup, delivery, or installation"
            subtitle="Choose pickup, local delivery, or delivery with professional installation throughout the Phoenix metropolitan area."
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 100} className="bg-obsidian p-8 lg:p-10">
              <c.icon className="h-7 w-7 text-icy" />
              <h3 className="mt-5 font-heading text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{c.description}</p>
              {c.fields ? (
                <div className="mt-5 space-y-3">
                  {c.fields.slice(0, 4).map((f) => (
                    <div key={f.label} className="border-l-2 border-white/10 pl-3">
                      <p className="measure-tag text-white/40">{f.label}</p>
                      <p className="text-[13px] text-white/75">{f.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="mt-5 space-y-2.5">
                  {c.points.slice(0, 4).map((pt) => (
                    <li key={pt} className="flex gap-2 text-[13px] text-white/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-icy" /> {pt}
                    </li>
                  ))}
                </ul>
              )}
              {c.warning && (
                <p className="mt-5 border-l-2 border-amber-400 bg-amber-400/10 p-3 text-[12px] leading-relaxed text-amber-200">
                  {c.warning}
                </p>
              )}
              <Link to={`/shop?service=${c.key}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-icy hover:gap-2.5">
                {c.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn to="/delivery" variant="darkOutline" size="sm">Delivery details</Btn>
          <Btn to="/installation" variant="darkOutline" size="sm">Installation details</Btn>
          <Btn to="/pickup" variant="darkOutline" size="sm">Pickup details</Btn>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MEASUREMENT ---------------- */
function Measurement() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <div className="border-l-2 border-icy bg-icy/5 p-2">
            <span className="measure-tag text-icy-dark">Essential</span>
          </div>
          <SectionHeading
            className="mt-4"
            eyebrow="Measure Before You Order"
            title="Mirrors Only does not measure your wall"
            subtitle="Because we do not conduct pre-installation measurements, confirm your space fits before ordering. Use the tool below for guidance."
          />
        </Reveal>
        <Reveal className="mt-10">
          <div className="border border-silver bg-white p-6 sm:p-8 lg:p-10">
            <MeasurementTool />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- USE CASES ---------------- */
function UseCases() {
  return (
    <section className="bg-lightgray">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Common Uses"
            title="Built for the spaces that need big mirrors"
            subtitle="From home gyms to commercial fitness rooms—two sizes cover the most demanding reflective applications."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-silver bg-silver sm:grid-cols-3 lg:grid-cols-4">
          {USE_CASES.map((u, i) => {
            const Icon = ICONS[u.icon] || Dumbbell;
            return (
              <Reveal key={u.label} delay={(i % 4) * 60} className="group bg-white p-6 transition-colors hover:bg-obsidian">
                <Icon className="h-6 w-6 text-slate-ink transition-colors group-hover:text-icy" />
                <p className="mt-4 text-[14px] font-semibold tracking-tight text-obsidian transition-colors group-hover:text-white">
                  {u.label}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const points = [
    "Two simple standardized sizes",
    "No confusing custom-glass ordering process",
    "Direct mirror supply",
    "Pickup, delivery, and installation options",
    "Mirrors Only employee installers",
    "Phoenix metropolitan service",
    "Licensed and bonded business",
    "Clear scheduling",
    "Written warranty",
    "Residential and commercial capabilities"
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden border border-silver bg-gradient-to-b from-silver to-lightgray">
              <img src={IMAGES.studio} alt="Tall frameless mirror in a bright studio" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.opacity = 0; }} />
              <span className="measure-tag absolute bottom-4 left-4 bg-white/90 px-2 py-1 text-icy-dark">48" × 72"</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Why Mirrors Only"
              title="The easiest way to buy, receive, and install large mirrors"
              subtitle="Choose your size. Choose pickup, delivery, or installation. We handle the rest."
            />
            <div className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {points.map((p) => (
                <div key={p} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-icy-dark" /> <span className="text-[14px] text-obsidian">{p}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/shop" variant="accent">Shop Mirrors</Btn>
              <Btn to="/how-it-works" variant="outline">How It Works</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY PREVIEW ---------------- */
function GalleryPreview({ projects }) {
  const hasProjects = projects && projects.length > 0;
  return (
    <section className="bg-lightgray">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Project Gallery"
              title="Real mirrors, real spaces"
              subtitle="A growing collection of installed projects across the Phoenix metro. Filter the full gallery for size, orientation, and application."
            />
            <Btn to="/gallery" variant="outline">View all</Btn>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hasProjects
            ? projects.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 80} className="group overflow-hidden border border-silver bg-white">
                  <div className="relative aspect-[3/4] overflow-hidden bg-silver">
                    {p.after_image
                      ? <img src={p.after_image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      : <PlaceholderTile />}
                    <span className="measure-tag absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-obsidian">{p.mirror_size === "4x5" ? "4' × 5'" : "4' × 6'"}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] font-semibold text-obsidian">{p.title}</p>
                    <p className="text-[12px] text-slate-ink">{p.city}{p.application ? ` · ${p.application}` : ""}</p>
                  </div>
                </Reveal>
              ))
            : [0, 1, 2, 3].map((i) => (
                <Reveal key={i} delay={(i % 4) * 80} className="overflow-hidden border border-silver bg-white">
                  <div className="relative aspect-[3/4]">
                    <PlaceholderTile />
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] font-semibold text-slate-ink">Awaiting project photos</p>
                    <p className="text-[12px] text-slate-ink/70">Real client projects will appear here.</p>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderTile() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-silver to-lightgray text-slate-ink/50">
      <ImageIcon className="h-7 w-7" />
      <span className="measure-tag">Project photo pending</span>
    </div>
  );
}

/* ---------------- REVIEWS ---------------- */
function Reviews({ reviews }) {
  const hasReviews = reviews && reviews.length > 0;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="Verified customer feedback"
            subtitle="Reviews are published only when verified. Verified Google review integration is prepared for launch."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hasReviews
            ? reviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 4) * 80} className="flex flex-col border border-silver bg-white p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`h-4 w-4 ${idx < (r.star_rating || 5) ? "fill-icy text-icy" : "text-silver"}`} />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-obsidian">"{r.written_review}"</p>
                  <div className="mt-4 border-t border-silver pt-3">
                    <p className="text-[13px] font-semibold text-obsidian">{r.customer_name}</p>
                    <p className="text-[12px] text-slate-ink">{r.city}{r.mirror_size ? ` · ${r.mirror_size}` : ""}{r.service_selected ? ` · ${r.service_selected}` : ""}</p>
                    {r.verified && <span className="measure-tag mt-1 inline-block text-icy-dark">Verified review</span>}
                  </div>
                </Reveal>
              ))
            : [0, 1, 2, 3].map((i) => (
                <Reveal key={i} delay={(i % 4) * 80} className="flex flex-col items-center justify-center border border-dashed border-silver bg-lightgray p-6 text-center">
                  <Star className="h-6 w-6 text-silver" />
                  <p className="mt-3 text-[13px] font-medium text-slate-ink">Verified reviews coming soon</p>
                  <p className="text-[12px] text-slate-ink/70">No fictional reviews are published.</p>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WARRANTY ---------------- */
function WarrantySection() {
  return (
    <section className="bg-obsidian text-white">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="flex h-48 items-center justify-center border border-white/15 bg-white/5">
              <ShieldCheck className="h-16 w-16 text-icy" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading dark eyebrow="Protection" title={WARRANTY.heading} />
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">{WARRANTY.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 p-5">
                <p className="measure-tag text-white/40">Product</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{WARRANTY.productText}</p>
              </div>
              <div className="border border-white/10 p-5">
                <p className="measure-tag text-white/40">Workmanship</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">{WARRANTY.workmanshipText}</p>
              </div>
            </div>
            <div className="mt-6">
              <Btn to="/policies/warranty" variant="darkOutline">Review Warranty Terms</Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICE AREA PREVIEW ---------------- */
function ServiceAreaPreview() {
  return (
    <section className="bg-lightgray">
      <div className="mx-auto max-w-edge px-4 py-20 sm:px-6 lg:py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Service Area"
              title="Serving the Phoenix metropolitan area"
              subtitle="Enter your ZIP to confirm pickup, delivery, and installation availability. Extended areas may include a surcharge."
            />
            <div className="mt-6">
              <ZipChecker />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_CITIES.map((c) => (
                <span key={c} className="rounded-full border border-silver bg-white px-3 py-1 text-[12px] font-medium text-slate-ink">
                  {c}
                </span>
              ))}
            </div>
            <Btn to="/service-area" variant="outline" className="mt-6">View full service area</Btn>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden border border-silver bg-gradient-to-b from-silver to-lightgray">
              <img src={IMAGES.commercial} alt="Wall of frameless mirrors in a commercial gym" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.opacity = 0; }} />
              <span className="measure-tag absolute bottom-4 left-4 bg-white/90 px-2 py-1 text-obsidian">Commercial · Phoenix metro</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}