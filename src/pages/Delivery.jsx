import { Check, Truck, MapPin, Calendar, AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import ZipChecker from "@/components/ZipChecker";
import { FULFILLMENT } from "@/lib/siteConfig";

export default function Delivery() {
  const f = FULFILLMENT.delivery;
  return (
    <div>
      <PageHero
        eyebrow="Delivery"
        title="Local delivery across the Phoenix metro"
        subtitle="Mirrors Only delivers your mirror to an eligible Phoenix metropolitan area address. Check your ZIP, then schedule your window."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="What's included" title={f.title} subtitle={f.description} />
              <ul className="mt-6 space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-obsidian">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-icy-dark" /> {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-l-2 border-icy bg-icy/5 p-4 text-[13px] text-slate-ink">{f.note}</p>
            </Reveal>
            <Reveal delay={120}>
              <ZipChecker />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-lightgray">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, t: "Eligible area", d: "Limited to the Phoenix metro radius. Extended areas may include a surcharge." },
              { icon: Calendar, t: "Scheduling", d: "Choose an available window based on route and inventory." },
              { icon: Truck, t: "Service level", d: "Curbside / garage / doorway delivery. Room-of-choice not guaranteed." },
              { icon: AlertTriangle, t: "Failed delivery", d: "Rescheduling fees apply when access cannot be completed as scheduled." }
            ].map((c) => (
              <div key={c.t} className="border border-silver bg-white p-6">
                <c.icon className="h-6 w-6 text-icy-dark" />
                <h3 className="mt-4 font-heading text-lg font-bold text-obsidian">{c.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-ink">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/shop?service=delivery" variant="accent">Order delivery</Btn>
            <Btn to="/service-area" variant="outline">Check service area</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}