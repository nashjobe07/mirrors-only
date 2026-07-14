import { useParams, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import Btn from "@/components/Btn";
import { POLICIES, WARRANTY } from "@/lib/siteConfig";

const TITLES = {
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  pickup: "Pickup Policy",
  delivery: "Delivery Policy",
  installation: "Installation Policy",
  cancellation: "Cancellation Policy",
  rescheduling: "Rescheduling Policy",
  returns: "Return & Refund Policy",
  warranty: "Warranty Policy",
  damage: "Damage Claim Policy",
  measurement: "Customer Measurement Responsibility",
  accessibility: "Accessibility Statement"
};

export default function Policies() {
  const { key } = useParams();
  const title = TITLES[key] || "Policy";

  return (
    <div>
      <PageHero eyebrow="Legal" title={title} subtitle="This page is editable and must be reviewed before launch. Final terms are governed by the written agreement provided with your order." />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-icy-dark hover:gap-2.5">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          {key === "warranty" ? (
            <div className="mt-8">
              <div className="flex items-center gap-3 border-l-2 border-icy bg-icy/5 p-4">
                <ShieldCheck className="h-6 w-6 text-icy-dark" />
                <p className="text-[14px] font-medium text-obsidian">{WARRANTY.summary}</p>
              </div>
              <h2 className="mt-8 font-heading text-xl font-bold text-obsidian">Product warranty</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-ink">{WARRANTY.productText}</p>
              <h2 className="mt-6 font-heading text-xl font-bold text-obsidian">Installation workmanship warranty</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-ink">{WARRANTY.workmanshipText}</p>
              <h2 className="mt-6 font-heading text-xl font-bold text-obsidian">Exclusions</h2>
              <ul className="mt-2 space-y-2">
                {WARRANTY.exclusions.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-[14px] text-slate-ink"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-icy-dark" /> {x}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-8">
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-ink">{POLICIES[key] || "This policy is editable and will be finalized before launch."}</p>
            </div>
          )}

          <div className="mt-10 border-t border-silver pt-6">
            <p className="text-[12px] text-slate-ink">
              All policy pages are editable and reviewed before launch. Coverage, exclusions, and claim procedures are governed by the written warranty and agreements provided with the order.
            </p>
            <Btn to="/contact" variant="outline" className="mt-4">Questions? Contact us</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}