import { useState } from "react";
import { toast } from "sonner";
import { Phone, MessageSquare, Mail, MapPin, Send, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Btn from "@/components/Btn";
import { base44 } from "@/api/base44Client";
import { CONTACT } from "@/lib/siteConfig";

const FIELD = "h-11 w-full border border-silver bg-white px-3 text-sm text-obsidian outline-none focus:border-icy";
const LABEL = "block text-[12px] font-semibold tracking-tight text-slate-ink mb-1.5";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: CONTACT.email,
        subject: "New contact form message — Mirrors Only",
        body: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
      });
      setDone(true);
      toast.success("Message sent!");
    } catch (err) {
      toast.error("Could not send: " + (err?.message || "please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Mirrors Only team"
        subtitle="Questions about sizing, delivery, or installation? Call, text, or send a message — we'll get you sorted."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="space-y-3">
                <a href={CONTACT.phoneHref} className="flex items-center gap-4 border border-silver bg-lightgray p-5 transition-colors hover:border-icy">
                  <Phone className="h-5 w-5 text-icy-dark" />
                  <div><p className="measure-tag">Call</p><p className="text-[14px] font-semibold text-obsidian">{CONTACT.phone}</p></div>
                </a>
                <a href={CONTACT.textHref} className="flex items-center gap-4 border border-silver bg-lightgray p-5 transition-colors hover:border-icy">
                  <MessageSquare className="h-5 w-5 text-icy-dark" />
                  <div><p className="measure-tag">Text</p><p className="text-[14px] font-semibold text-obsidian">{CONTACT.phone}</p></div>
                </a>
                <a href={CONTACT.emailHref} className="flex items-center gap-4 border border-silver bg-lightgray p-5 transition-colors hover:border-icy">
                  <Mail className="h-5 w-5 text-icy-dark" />
                  <div><p className="measure-tag">Email</p><p className="text-[14px] font-semibold text-obsidian">{CONTACT.email}</p></div>
                </a>
                <div className="flex items-center gap-4 border border-silver bg-lightgray p-5">
                  <MapPin className="h-5 w-5 text-icy-dark" />
                  <div><p className="measure-tag">Service area</p><p className="text-[14px] font-semibold text-obsidian">{CONTACT.serviceRegion}</p></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {done ? (
                <div className="border border-silver bg-lightgray p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-icy/15">
                    <Check className="h-7 w-7 text-icy-dark" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-obsidian">Message sent</h3>
                  <p className="mt-2 text-slate-ink">We'll respond as soon as possible.</p>
                  <Btn to="/" variant="outline" className="mt-6">Back to home</Btn>
                </div>
              ) : (
                <form onSubmit={submit} className="border border-silver bg-white p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className={LABEL}>Name *</label><input className={FIELD} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
                    <div><label className={LABEL}>Email *</label><input className={FIELD} value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                    <div className="sm:col-span-2"><label className={LABEL}>Phone</label><input className={FIELD} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
                  </div>
                  <div className="mt-4">
                    <label className={LABEL}>Message *</label>
                    <textarea className="h-32 w-full border border-silver bg-white p-3 text-sm text-obsidian outline-none focus:border-icy" value={form.message} onChange={(e) => set("message", e.target.value)} />
                  </div>
                  <Btn variant="accent" size="lg" className="mt-6 w-full" disabled={submitting}>
                    {submitting ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
                  </Btn>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}