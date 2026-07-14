import { Check, Ruler, Truck, CalendarDays, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import MeasurementTool from "@/components/MeasurementTool";

const STEPS = [
  { n: "01", icon: Ruler, title: "Choose your size", desc: "Select a 4' × 5' or 4' × 6' frameless mirror. Two standardized sizes — no custom-glass confusion." },
  { n: "02", icon: Truck, title: "Choose your service", desc: "Pickup, local delivery, or delivery with professional installation by Mirrors Only employees." },
  { n: "03", icon: CalendarDays, title: "Choose your date", desc: "Select an available pickup, delivery, or installation window based on inventory and route." }
];

const WE_DO = ["Supply the mirror directly", "Deliver to eligible Phoenix metro addresses", "Install with employee installers", "Provide a one-year limited warranty", "Confirm scheduling and reminders"];
const YOU_DO = ["Choose the correct size", "Measure and confirm your wall fits", "Remove existing mirrors before arrival", "Ensure safe access and clear the area", "Accept the mirror on delivery/installation"];

export default function HowItWorks() {
  return (
    <div>
      <PageHero
        eyebrow="How It Works"
        title="Three steps to your mirror"
        subtitle="Choose your size. Choose pickup, delivery, or installation. We handle the rest."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-px overflow-hidden border border-silver bg-silver md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100} className="bg-white p-8 lg:p-10">
                <s.icon className="h-7 w-7 text-icy-dark" />
                <span className="mt-4 block font-heading text-4xl font-extrabold tracking-tight text-silver">{s.n}</span>
                <h3 className="mt-2 font-heading text-xl font-bold text-obsidian">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-ink">{s.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Btn to="/shop" variant="accent" size="lg">Start your order <ArrowRight className="h-4 w-4" /></Btn>
          </Reveal>
        </div>
      </section>

      <section className="bg-lightgray">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full border border-silver bg-white p-8">
                <span className="measure-tag text-icy-dark">What we do</span>
                <ul className="mt-4 space-y-3">
                  {WE_DO.map((t) => <li key={t} className="flex items-start gap-2.5 text-[14px] text-obsidian"><Check className="mt-0.5 h-4 w-4 shrink-0 text-icy-dark" /> {t}</li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full border border-silver bg-obsidian p-8 text-white">
                <span className="measure-tag text-icy">What you do</span>
                <ul className="mt-4 space-y-3">
                  {YOU_DO.map((t) => <li key={t} className="flex items-start gap-2.5 text-[14px] text-white/85"><Check className="mt-0.5 h-4 w-4 shrink-0 text-icy" /> {t}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Measure before you order" title="Confirm your space fits" subtitle="We do not measure before purchase. Use this tool for guidance, then verify at multiple points." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="border border-silver bg-lightgray p-6 sm:p-8">
              <MeasurementTool />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}