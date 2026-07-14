import { Link } from "react-router-dom";
import { Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { CONTACT, SERVICE_CITIES, POLICIES } from "@/lib/siteConfig";

const POLICY_LINKS = [
  { label: "Terms & Conditions", key: "terms", to: "/policies/terms" },
  { label: "Privacy Policy", key: "privacy", to: "/policies/privacy" },
  { label: "Pickup Policy", key: "pickup", to: "/policies/pickup" },
  { label: "Delivery Policy", key: "delivery", to: "/policies/delivery" },
  { label: "Installation Policy", key: "installation", to: "/policies/installation" },
  { label: "Cancellation Policy", key: "cancellation", to: "/policies/cancellation" },
  { label: "Rescheduling Policy", key: "rescheduling", to: "/policies/rescheduling" },
  { label: "Returns & Refunds", key: "returns", to: "/policies/returns" },
  { label: "Warranty Policy", key: "warranty", to: "/policies/warranty" },
  { label: "Damage Claims", key: "damage", to: "/policies/damage" },
  { label: "Measurement Responsibility", key: "measurement", to: "/policies/measurement" },
  { label: "Accessibility", key: "accessibility", to: "/policies/accessibility" }
];

const NAV_LINKS = [
  { label: "Shop Mirrors", to: "/shop" },
  { label: "Delivery", to: "/delivery" },
  { label: "Installation", to: "/installation" },
  { label: "Commercial", to: "/commercial" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Gallery", to: "/gallery" },
  { label: "Service Area", to: "/service-area" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
  { label: "Pickup", to: "/pickup" }
];

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white">
      <div className="mx-auto max-w-edge px-4 py-16 sm:px-6 lg:px-10 lg:py-22">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light height={52} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Large frameless mirrors without the custom-glass confusion. Two sizes, three fulfillment
              options, professional installation across the {CONTACT.serviceRegion}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Pickup", "Delivery", "Installation", "Licensed & Bonded", "1-Year Warranty"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-tight text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-icy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {POLICY_LINKS.map((l) => (
                <li key={l.key}>
                  <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-icy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-icy">
                  <Phone className="h-4 w-4" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.textHref} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-icy">
                  <MessageSquare className="h-4 w-4" /> Text us
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-icy">
                  <Mail className="h-4 w-4" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4" /> Serving {CONTACT.serviceRegion}
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
              {SERVICE_CITIES.slice(0, 8).map((c, i) => (
                <span key={c} className="flex items-center gap-1.5 text-[11px] text-white/40">
                  {i > 0 && <span className="text-white/20">·</span>}
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Mirrors Only. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Mirrors Only supplies mirrors directly. Installation is performed by Mirrors Only employees.
            Licensed and bonded. Coverage is governed by the written warranty provided with the order.
          </p>
        </div>
      </div>
    </footer>
  );
}