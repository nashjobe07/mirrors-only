import { Check, Wrench, ShieldCheck, Ruler } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import { FULFILLMENT } from "@/lib/siteConfig";

const PREP = [
  "Remove furniture near the wall",
  "Remove wall décor",
  "Clear the access path",
  "Secure pets",
  "Reserve elevators when necessary",
  "Confirm parking for the install vehicle",
  "Remove the existing mirror",
  "Identify hidden plumbing or wiring when known",
  "Ensure an adult decision-maker is present"
];

export default function Installation() {
  const f = FULFILLMENT.installation;
  return (
    <div>
      <PageHero
        eyebrow="Installation"
        title="Professional installation by Mirrors Only employees"
        subtitle="We deliver the mirror and install it at your eligible Phoenix metropolitan property. Licensed, bonded, and done by our own team."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-edge gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="How it works" title={f.title} subtitle={f.description} />
            <ul className="mt-6 space-y-3">
              {f.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] text-obsidian">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-icy-dark" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-4">
              {[
                { icon: Wrench, t: "Employee installers", d: "All installations are performed by Mirrors Only employees." },
                { icon: ShieldCheck, t: "Licensed & bonded", d: "The business is licensed and bonded. Verified details available on request." },
                { icon: Ruler, t: "You confirm fit", d: "We do not measure before purchase. Confirm your mirror fits the intended wall." }
              ].map((c) => (
                <div key={c.t} className="border border-silver bg-lightgray p-6">
                  <c.icon className="h-6 w-6 text-icy-dark" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-obsidian">{c.t}</h3>
                  <p className="mt-1 text-[13px] text-slate-ink">{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-obsidian text-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading dark eyebrow="Preparation" title="Before your appointment" subtitle="Complete these steps so installation can proceed safely and on schedule." />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PREP.map((p) => (
              <div key={p} className="flex items-start gap-2.5 border border-white/10 bg-white/5 p-4 text-[13px] text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-icy" /> {p}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Btn to="/shop?service=installation" variant="accent">Order installation</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}