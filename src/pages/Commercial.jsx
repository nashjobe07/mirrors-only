import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Building2, Send, Check, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import PhotoUpload from "@/components/PhotoUpload";
import { base44 } from "@/api/base44Client";

const FIELD = "h-11 w-full border border-silver bg-white px-3 text-sm text-obsidian outline-none focus:border-icy";
const LABEL = "block text-[12px] font-semibold tracking-tight text-slate-ink mb-1.5";

const AUDIENCE = [
  "Fitness centers", "Apartment gyms", "Dance studios", "Yoga & Pilates studios",
  "Martial arts facilities", "Salons", "Barbershops", "Hotels",
  "Retail spaces", "Contractors", "Property managers"
];

export default function Commercial() {
  const [form, setForm] = useState({
    business_name: "", contact_name: "", contact_role: "", phone: "", email: "",
    project_address: "", project_type: "", num_mirrors: 1, preferred_size: "4x6",
    preferred_orientation: "vertical", desired_completion_date: "", service_type: "installation",
    plans_urls: [], wall_photos_urls: [], access_info: "", has_stairs: false, has_elevator: false,
    loading_area: "", coi_required: false, gc_info: "", bid_deadline: "", notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.business_name || !form.contact_name || !form.email) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.CommercialInquiry.create(form);
      setDone(true);
      toast.success("Quote request sent!");
    } catch (err) {
      toast.error("Could not submit: " + (err?.message || "please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Commercial"
        title="Multi-mirror projects for commercial spaces"
        subtitle="Purchase multiple standardized 4' × 5' or 4' × 6' frameless mirrors with delivery or installation. Volume pricing and multi-mirror discounts available."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Who we serve" title="Built for commercial customers" />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {AUDIENCE.map((a) => (
              <span key={a} className="rounded-full border border-silver bg-lightgray px-4 py-2 text-[13px] font-medium text-obsidian">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lightgray">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal>
              {done ? (
                <div className="border border-silver bg-white p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-icy/15">
                    <Check className="h-7 w-7 text-icy-dark" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-obsidian">Request received</h3>
                  <p className="mt-2 text-slate-ink">Our team will review your project and respond with a quote shortly.</p>
                  <Btn to="/" variant="outline" className="mt-6">Back to home</Btn>
                </div>
              ) : (
                <form onSubmit={submit} className="border border-silver bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-xl font-bold text-obsidian">Commercial quote request</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div><label className={LABEL}>Business name *</label><input className={FIELD} value={form.business_name} onChange={(e) => set("business_name", e.target.value)} /></div>
                    <div><label className={LABEL}>Contact name *</label><input className={FIELD} value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} /></div>
                    <div><label className={LABEL}>Contact role</label><input className={FIELD} value={form.contact_role} onChange={(e) => set("contact_role", e.target.value)} /></div>
                    <div><label className={LABEL}>Phone</label><input className={FIELD} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
                    <div><label className={LABEL}>Email *</label><input className={FIELD} value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                    <div><label className={LABEL}>Project address</label><input className={FIELD} value={form.project_address} onChange={(e) => set("project_address", e.target.value)} /></div>
                    <div><label className={LABEL}>Project type</label><input className={FIELD} value={form.project_type} onChange={(e) => set("project_type", e.target.value)} placeholder="e.g. Dance studio" /></div>
                    <div><label className={LABEL}>Number of mirrors</label><input type="number" min="1" className={FIELD} value={form.num_mirrors} onChange={(e) => set("num_mirrors", parseInt(e.target.value) || 1)} /></div>
                    <div><label className={LABEL}>Preferred size</label>
                      <select className={FIELD} value={form.preferred_size} onChange={(e) => set("preferred_size", e.target.value)}>
                        <option value="4x5">4' × 5'</option><option value="4x6">4' × 6'</option><option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div><label className={LABEL}>Preferred orientation</label>
                      <select className={FIELD} value={form.preferred_orientation} onChange={(e) => set("preferred_orientation", e.target.value)}>
                        <option value="vertical">Vertical</option><option value="horizontal">Horizontal</option><option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div><label className={LABEL}>Desired completion date</label><input type="date" className={FIELD} value={form.desired_completion_date} onChange={(e) => set("desired_completion_date", e.target.value)} /></div>
                    <div><label className={LABEL}>Service</label>
                      <select className={FIELD} value={form.service_type} onChange={(e) => set("service_type", e.target.value)}>
                        <option value="delivery">Delivery only</option><option value="installation">Delivery + installation</option>
                      </select>
                    </div>
                    <div><label className={LABEL}>Bid deadline</label><input type="date" className={FIELD} value={form.bid_deadline} onChange={(e) => set("bid_deadline", e.target.value)} /></div>
                    <div><label className={LABEL}>General contractor info</label><input className={FIELD} value={form.gc_info} onChange={(e) => set("gc_info", e.target.value)} /></div>
                    <div><label className={LABEL}>Loading area</label><input className={FIELD} value={form.loading_area} onChange={(e) => set("loading_area", e.target.value)} /></div>
                    <div><label className={LABEL}>Access information</label><input className={FIELD} value={form.access_info} onChange={(e) => set("access_info", e.target.value)} /></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-[13px] text-obsidian"><input type="checkbox" checked={form.has_stairs} onChange={(e) => set("has_stairs", e.target.checked)} className="accent-[#008B8B]" /> Stairs</label>
                    <label className="flex items-center gap-2 text-[13px] text-obsidian"><input type="checkbox" checked={form.has_elevator} onChange={(e) => set("has_elevator", e.target.checked)} className="accent-[#008B8B]" /> Elevator</label>
                    <label className="flex items-center gap-2 text-[13px] text-obsidian"><input type="checkbox" checked={form.coi_required} onChange={(e) => set("coi_required", e.target.checked)} className="accent-[#008B8B]" /> Certificate of insurance required</label>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <PhotoUpload label="Plans upload" max={5} value={form.plans_urls} onChange={(v) => set("plans_urls", v)} />
                    <PhotoUpload label="Wall photos" max={8} value={form.wall_photos_urls} onChange={(v) => set("wall_photos_urls", v)} />
                  </div>
                  <div className="mt-4">
                    <label className={LABEL}>Additional notes</label>
                    <textarea className="h-24 w-full border border-silver bg-white p-3 text-sm text-obsidian outline-none focus:border-icy" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                  </div>
                  <Btn variant="accent" size="lg" className="mt-6 w-full" disabled={submitting}>
                    {submitting ? "Sending…" : <>Request quote <Send className="h-4 w-4" /></>}
                  </Btn>
                </form>
              )}
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-40">
                <div className="border border-silver bg-white p-6">
                  <Building2 className="h-7 w-7 text-icy-dark" />
                  <h3 className="mt-4 font-heading text-lg font-bold text-obsidian">Why commercial customers choose us</h3>
                  <ul className="mt-4 space-y-2.5">
                    {["Standardized sizes — no custom-glass confusion", "Volume pricing & multi-mirror discounts", "Employee installers, licensed & bonded", "Delivery or installation options", "Phoenix metro coverage"].map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[13px] text-obsidian"><Check className="mt-0.5 h-4 w-4 shrink-0 text-icy-dark" /> {t}</li>
                    ))}
                  </ul>
                  <Link to="/shop" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-icy-dark hover:gap-2.5">Browse mirrors <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}