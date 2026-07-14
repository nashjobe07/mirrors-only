import { Check, MapPin, Clock, Car, AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import { FULFILLMENT, PRODUCTS } from "@/lib/siteConfig";

export default function Pickup() {
  const f = FULFILLMENT.pickup;
  return (
    <div>
      <PageHero
        eyebrow="Pickup"
        title="Customer pickup at our Phoenix location"
        subtitle="Purchase online, schedule an appointment, and pick up your mirror during the designated window."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <SectionHeading eyebrow="Pickup details" title={f.title} subtitle={f.description} />
              <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {f.fields.map((field) => (
                  <div key={field.label} className="border-l-2 border-silver pl-3">
                    <dt className="measure-tag">{field.label}</dt>
                    <dd className="mt-1 text-[13px] font-medium text-obsidian">{field.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-l-2 border-amber-400 bg-amber-50 p-4 text-[13px] leading-relaxed text-amber-800">
                <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" /> Important</p>
                <p className="mt-1">{f.warning}</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="border border-silver bg-lightgray p-6">
                <span className="measure-tag">Mirror dimensions</span>
                {["4x5", "4x6"].map((id) => {
                  const p = PRODUCTS[id];
                  return (
                    <div key={id} className="mt-4 border-t border-silver pt-4 first:border-0 first:pt-0">
                      <p className="font-heading text-lg font-bold text-obsidian">{p.name}</p>
                      <p className="text-sm text-slate-ink">{p.widthIn}" × {p.heightIn}" · {p.thickness}</p>
                      <p className="mt-1 text-[12px] text-slate-ink">Weight: confirmed at scheduling once final product specifications are entered.</p>
                    </div>
                  );
                })}
                <div className="mt-6 grid gap-3">
                  <div className="flex items-center gap-2 text-[13px] text-obsidian"><MapPin className="h-4 w-4 text-icy-dark" /> Phoenix, AZ — address shared at scheduling</div>
                  <div className="flex items-center gap-2 text-[13px] text-obsidian"><Clock className="h-4 w-4 text-icy-dark" /> Tue–Sat · 9 AM–4 PM</div>
                  <div className="flex items-center gap-2 text-[13px] text-obsidian"><Car className="h-4 w-4 text-icy-dark" /> Truck, van, or SUV (mirror lies flat)</div>
                </div>
                <Btn to="/shop?service=pickup" variant="accent" className="mt-6 w-full">Schedule pickup</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-lightgray">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Before you leave" title="Inspect before departure" subtitle="Inspect the mirror at our location before accepting it. Once accepted, transportation is your responsibility." />
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Inspect for chips or edge damage", "Confirm correct size and quantity", "Secure padding and blankets", "Tie-down with ratchet straps", "Transport mirror lying flat", "Two people recommended for loading"].map((t) => (
              <div key={t} className="flex items-center gap-2.5 border border-silver bg-white p-4 text-[13px] text-obsidian">
                <Check className="h-4 w-4 shrink-0 text-icy-dark" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}