import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Check, ChevronLeft, ChevronRight, Ruler, Truck, Wrench, PackageCheck,
  CalendarDays, User, CreditCard, ShieldCheck, PartyPopper, AlertCircle
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PRODUCTS, SERVICE_PRICING, CONTACT } from "@/lib/siteConfig";
import { useCart } from "@/lib/cartContext";
import Btn from "@/components/Btn";
import PhotoUpload from "@/components/PhotoUpload";

const FIELD = "h-11 w-full border border-silver bg-white px-3 text-sm text-obsidian outline-none focus:border-icy";
const LABEL = "block text-[12px] font-semibold tracking-tight text-slate-ink mb-1.5";
const BOOL = "flex items-center gap-2.5 border border-silver bg-white px-3 py-2.5 text-[13px] text-obsidian";

const STEPS = [
  { key: "mirror", label: "Mirror", icon: Ruler },
  { key: "orientation", label: "Orientation", icon: PackageCheck },
  { key: "service", label: "Service", icon: Truck },
  { key: "install", label: "Install Info", icon: Wrench },
  { key: "photos", label: "Photos", icon: ShieldCheck },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "customer", label: "Your Info", icon: User },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "agreements", label: "Agreements", icon: ShieldCheck },
  { key: "confirm", label: "Confirm", icon: PartyPopper }
];

const TIME_WINDOWS = ["9:00 AM – 11:00 AM", "11:00 AM – 1:00 PM", "1:00 PM – 3:00 PM", "3:00 PM – 5:00 PM"];

export default function Shop() {
  const [params] = useSearchParams();
  const { setItem, clear } = useCart();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [prelaunch, setPrelaunch] = useState(false);

  useEffect(() => {
    base44.entities.SiteSetting.filter({ key: "global" })
      .then((rows) => setPrelaunch(!!(rows && rows[0] && rows[0].prelaunch_mode)))
      .catch(() => {});
  }, []);

  const [form, setForm] = useState({
    mirror_size: params.get("size") === "4x6" ? "4x6" : "4x5",
    quantity: 1,
    orientation: "vertical",
    service_type: params.get("service") || "pickup",
    residential_commercial: "residential",
    property_type: "",
    installation_address: "",
    installation_floor: "",
    has_stairs: false,
    has_elevator: false,
    wall_width: "",
    wall_height: "",
    wall_material: "",
    baseboard_height: "",
    num_mirrors: 1,
    installation_height: "",
    has_outlets: false,
    has_switches: false,
    has_trim: false,
    has_shelving: false,
    nearby_doors: "",
    nearby_windows: "",
    wall_equipment: "",
    existing_mirror_present: false,
    existing_mirror_removed: false,
    clear_access: false,
    appointment_date: "",
    appointment_window: TIME_WINDOWS[0],
    additional_notes: "",
    photo_urls: [],
    first_name: "",
    last_name: "",
    mobile_phone: "",
    email: "",
    billing_address: "",
    service_address: "",
    zip_code: "",
    company_name: "",
    preferred_comm: "Text",
    referral_source: "",
    payment_method: "full",
    promo_code: "",
    agreementAccepted: false
  });

  useEffect(() => {
    setItem(form.mirror_size, form.quantity);
  }, [form.mirror_size, form.quantity]); // eslint-disable-line

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const pricing = useMemo(() => {
    const p = PRODUCTS[form.mirror_size];
    const subtotal = (p?.price || 0) * form.quantity;
    const serviceBase = SERVICE_PRICING[form.service_type]?.base || 0;
    const multiDiscount = form.quantity >= 3 ? Math.round(subtotal * 0.1) : 0;
    const tax = Math.round((subtotal + serviceBase - multiDiscount) * 0.083 * 100) / 100;
    const total = subtotal + serviceBase - multiDiscount + tax;
    return { subtotal, serviceBase, multiDiscount, tax, total, unitPrice: p?.price || 0 };
  }, [form.mirror_size, form.quantity, form.service_type]);

  const stepsToShow = useMemo(() => {
    return STEPS.filter((s) => {
      if (s.key === "install") return form.service_type === "installation";
      if (s.key === "photos") return form.service_type !== "pickup";
      return true;
    });
  }, [form.service_type]);

  const curStep = stepsToShow[step];

  const next = () => step < stepsToShow.length - 1 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  const submitOrder = async () => {
    if (!form.agreementAccepted) {
      toast.error("Please accept the required agreements to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const order_number = "MO-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 89999);
      const payload = {
        order_number,
        mirror_size: form.mirror_size,
        quantity: form.quantity,
        orientation: form.orientation,
        service_type: form.service_type,
        residential_commercial: form.residential_commercial,
        property_type: form.property_type,
        installation_address: form.service_type !== "pickup" ? form.installation_address : "",
        installation_floor: form.installation_floor,
        has_stairs: form.has_stairs,
        has_elevator: form.has_elevator,
        wall_width: form.wall_width,
        wall_height: form.wall_height,
        wall_material: form.wall_material,
        baseboard_height: form.baseboard_height,
        num_mirrors: form.quantity,
        installation_height: form.installation_height,
        has_outlets: form.has_outlets,
        has_switches: form.has_switches,
        has_trim: form.has_trim,
        has_shelving: form.has_shelving,
        nearby_doors: form.nearby_doors,
        nearby_windows: form.nearby_windows,
        wall_equipment: form.wall_equipment,
        existing_mirror_present: form.existing_mirror_present,
        existing_mirror_removed: form.existing_mirror_removed,
        clear_access: form.clear_access,
        appointment_date: form.appointment_date,
        appointment_window: form.appointment_window,
        additional_notes: form.additional_notes,
        photo_urls: form.photo_urls,
        first_name: form.first_name,
        last_name: form.last_name,
        mobile_phone: form.mobile_phone,
        email: form.email,
        billing_address: form.billing_address,
        service_address: form.service_address,
        zip_code: form.zip_code,
        company_name: form.company_name,
        preferred_comm: form.preferred_comm,
        referral_source: form.referral_source,
        payment_method: form.payment_method,
        subtotal: pricing.subtotal,
        delivery_charge: form.service_type === "delivery" ? pricing.serviceBase : 0,
        installation_charge: form.service_type === "installation" ? pricing.serviceBase : 0,
        surcharge: 0,
        sales_tax: pricing.tax,
        discount: pricing.multiDiscount,
        promo_code: form.promo_code,
        amount_paid: prelaunch ? 0 : (form.payment_method === "invoice" ? 0 : form.payment_method === "deposit" ? Math.round(pricing.total * 0.5) : 0),
        balance_due: prelaunch ? pricing.total : (form.payment_method === "full" ? pricing.total : form.payment_method === "deposit" ? Math.round(pricing.total * 0.5) : pricing.total),
        total: pricing.total,
        status: prelaunch ? "Order Request Received" : "Order Received",
        payment_status: prelaunch ? "Pending" : (form.payment_method === "invoice" ? "Invoiced" : "Pending"),
        agreement_version: "v1.0",
        agreement_accepted_at: new Date().toISOString(),
        lead_source: form.referral_source || "website"
      };
      const created = await base44.entities.Order.create(payload);
      setOrderId(created?.id || order_number);
      clear();
      setStep(stepsToShow.length - 1);
      toast.success(prelaunch ? "Order request submitted!" : "Order placed!");
    } catch (err) {
      toast.error("Could not place order: " + (err?.message || "please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId && curStep?.key === "confirm") {
    return <Confirmation form={form} pricing={pricing} orderId={orderId} prelaunch={prelaunch} />;
  }

  return (
    <div className="bg-white">
      <div className="border-b border-silver bg-obsidian text-white">
        <div className="mx-auto max-w-edge px-4 py-10 sm:px-6 lg:px-10">
          <span className="measure-tag text-icy">Checkout</span>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Build your order</h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">One question at a time. Your selections update the summary in real time.</p>
        </div>
      </div>

      <div className="sticky top-[68px] z-30 border-b border-silver bg-white/90 backdrop-blur lg:top-20">
        <div className="mx-auto flex max-w-edge items-center gap-1 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6 lg:px-10">
          {stepsToShow.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div key={s.key} className="flex shrink-0 items-center">
                <button
                  onClick={() => i <= step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold transition-colors ${active ? "text-icy-dark" : done ? "text-obsidian" : "text-slate-ink/50"}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active ? "bg-icy text-obsidian" : done ? "bg-obsidian text-white" : "bg-silver text-slate-ink"}`}>
                    {done ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  {s.label}
                </button>
                {i < stepsToShow.length - 1 && <ChevronRight className="h-3 w-3 text-silver" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-edge gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_0.9fr] lg:px-10">
        <div className="min-w-0">
          {curStep?.key === "mirror" && <MirrorStep form={form} set={set} />}
          {curStep?.key === "orientation" && <OrientationStep form={form} set={set} />}
          {curStep?.key === "service" && <ServiceStep form={form} set={set} />}
          {curStep?.key === "install" && <InstallStep form={form} set={set} />}
          {curStep?.key === "photos" && <PhotosStep form={form} set={set} />}
          {curStep?.key === "schedule" && <ScheduleStep form={form} set={set} prelaunch={prelaunch} />}
          {curStep?.key === "customer" && <CustomerStep form={form} set={set} />}
          {curStep?.key === "payment" && <PaymentStep form={form} set={set} pricing={pricing} prelaunch={prelaunch} />}
          {curStep?.key === "agreements" && <AgreementsStep form={form} set={set} />}
          {curStep?.key === "confirm" && <ConfirmStep form={form} pricing={pricing} submitting={submitting} onSubmit={submitOrder} prelaunch={prelaunch} />}

          {curStep?.key !== "confirm" && (
            <div className="mt-10 flex items-center justify-between border-t border-silver pt-6">
              <Btn variant="ghost" onClick={back} className={step === 0 ? "pointer-events-none opacity-0" : ""}>
                <ChevronLeft className="h-4 w-4" /> Back
              </Btn>
              <Btn variant="accent" onClick={next} size="lg">
                Continue <ChevronRight className="h-4 w-4" />
              </Btn>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          <div className="border border-silver bg-lightgray p-6">
            <span className="measure-tag">Order Summary</span>
            <div className="mt-4 space-y-3">
              <Row label={PRODUCTS[form.mirror_size]?.name} value={`$${pricing.unitPrice} × ${form.quantity}`} />
              <Row label="Subtotal" value={`$${pricing.subtotal}`} />
              {pricing.serviceBase > 0 && <Row label={SERVICE_PRICING[form.service_type]?.label} value={`$${pricing.serviceBase}`} />}
              {pricing.multiDiscount > 0 && <Row label="Multi-mirror discount" value={`–$${pricing.multiDiscount}`} />}
              <Row label="Est. sales tax" value={`$${pricing.tax}`} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-silver pt-4">
              <span className="font-heading text-lg font-bold text-obsidian">{prelaunch ? "Estimated total" : "Total"}</span>
              <span className="font-heading text-2xl font-extrabold text-obsidian">${pricing.total}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-ink">
              <PackageCheck className="h-4 w-4 text-icy-dark" /> {SERVICE_PRICING[form.service_type]?.label}
            </div>
          </div>
          <div className="mt-4 border border-silver bg-white p-4 text-[12px] leading-relaxed text-slate-ink">
            Need help? Call <a href={CONTACT.phoneHref} className="font-semibold text-icy-dark">{CONTACT.phone}</a> or text us.
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-slate-ink">{label}</span>
      <span className="font-semibold text-obsidian">{value}</span>
    </div>
  );
}

function StepWrap({ title, subtitle, children }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-obsidian">{title}</h2>
      <p className="mt-1.5 text-[14px] text-slate-ink">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Text({ label, value, set, placeholder, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className={LABEL}>{label}</label>
      <input className={FIELD} value={value || ""} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Choice({ label, value, options, set }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => set(o)} className={`border px-3 py-2 text-[13px] capitalize transition-all ${value === o ? "border-icy bg-icy/10 text-icy-dark" : "border-silver text-slate-ink"}`}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="measure-tag">{label}</p>
      <p className="text-[14px] font-semibold text-obsidian">{value}</p>
    </div>
  );
}

function MirrorStep({ form, set }) {
  return (
    <StepWrap title="Choose your mirror" subtitle="Select a standardized frameless size and quantity.">
      <div className="grid gap-4 sm:grid-cols-2">
        {["4x5", "4x6"].map((id) => {
          const p = PRODUCTS[id];
          const active = form.mirror_size === id;
          return (
            <button key={id} onClick={() => set("mirror_size", id)} className={`border p-5 text-left transition-all ${active ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>
              <div className="flex items-center justify-between">
                <span className="measure-tag">{p.sku}</span>
                {active && <Check className="h-4 w-4 text-icy-dark" />}
              </div>
              <h3 className="mt-2 font-heading text-xl font-bold text-obsidian">{p.name}</h3>
              <p className="mt-1 text-3xl font-heading font-extrabold tracking-tight text-obsidian">{p.widthFt}' × {p.heightFt}'</p>
              <p className="mt-1 text-sm text-slate-ink">{p.thickness} · {p.weight}</p>
              <p className="mt-3 font-heading text-2xl font-bold text-obsidian">${p.price}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-6 max-w-xs">
        <label className={LABEL}>Quantity</label>
        <div className="flex items-center gap-2">
          <button onClick={() => set("quantity", Math.max(1, form.quantity - 1))} className="flex h-11 w-11 items-center justify-center border border-silver text-obsidian">–</button>
          <input className={`${FIELD} text-center`} value={form.quantity} onChange={(e) => set("quantity", Math.max(1, parseInt(e.target.value) || 1))} />
          <button onClick={() => set("quantity", form.quantity + 1)} className="flex h-11 w-11 items-center justify-center border border-silver text-obsidian">+</button>
        </div>
        {form.quantity >= 3 && <p className="mt-2 text-[12px] text-icy-dark">Multi-mirror discount (10%) applied at 3+ mirrors.</p>}
      </div>
    </StepWrap>
  );
}

function OrientationStep({ form, set }) {
  return (
    <StepWrap title="Select orientation" subtitle="Orientation helps with installation planning. It does not change the mirror's physical dimensions.">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { v: "vertical", label: "Vertical", note: "Tall format" },
          { v: "horizontal", label: "Horizontal", note: "Wide format" },
          { v: "not_sure", label: "Not sure", note: "We'll help you decide" }
        ].map((o) => (
          <button key={o.v} onClick={() => set("orientation", o.v)} className={`border p-5 text-left transition-all ${form.orientation === o.v ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-obsidian">{o.label}</span>
              {form.orientation === o.v && <Check className="h-4 w-4 text-icy-dark" />}
            </div>
            <p className="mt-1 text-[12px] text-slate-ink">{o.note}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 border-l-2 border-icy bg-icy/5 p-4 text-[13px] text-slate-ink">
        The mirror may be positioned vertically or horizontally when installation conditions allow.
      </div>
    </StepWrap>
  );
}

function ServiceStep({ form, set }) {
  return (
    <StepWrap title="Choose your service" subtitle="Pickup, local delivery, or delivery with professional installation. Price updates instantly.">
      <div className="grid gap-3">
        {["pickup", "delivery", "installation"].map((key) => {
          const s = SERVICE_PRICING[key];
          const active = form.service_type === key;
          const Icon = key === "pickup" ? PackageCheck : key === "delivery" ? Truck : Wrench;
          return (
            <button key={key} onClick={() => set("service_type", key)} className={`flex items-center gap-4 border p-5 text-left transition-all ${active ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>
              <Icon className={`h-6 w-6 ${active ? "text-icy-dark" : "text-slate-ink"}`} />
              <div className="flex-1">
                <p className="font-heading text-lg font-bold text-obsidian">{s.label}</p>
                <p className="text-[13px] text-slate-ink">{s.blurb}</p>
              </div>
              <span className="font-heading text-xl font-bold text-obsidian">{s.base === 0 ? "Free" : `$${s.base}`}</span>
              {active && <Check className="h-4 w-4 text-icy-dark" />}
            </button>
          );
        })}
      </div>
    </StepWrap>
  );
}

function InstallStep({ form, set }) {
  const bools = [
    { k: "has_stairs", label: "Stairs present" },
    { k: "has_elevator", label: "Elevator available" },
    { k: "has_outlets", label: "Outlets on wall" },
    { k: "has_switches", label: "Switches on wall" },
    { k: "has_trim", label: "Wall trim present" },
    { k: "has_shelving", label: "Shelving nearby" },
    { k: "existing_mirror_present", label: "Existing mirror present" },
    { k: "existing_mirror_removed", label: "Existing mirror removed" },
    { k: "clear_access", label: "Clear access path available" }
  ];
  return (
    <StepWrap title="Installation information" subtitle="Help us prepare. All of this is reviewed before your appointment.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Choice label="Residential or commercial" value={form.residential_commercial} options={["residential", "commercial"]} set={(v) => set("residential_commercial", v)} />
        <Text label="Property type" value={form.property_type} set={(v) => set("property_type", v)} placeholder="e.g. Garage gym" />
        <Text label="Installation address" value={form.installation_address} set={(v) => set("installation_address", v)} placeholder="Street, city, ZIP" full />
        <Text label="Floor / level" value={form.installation_floor} set={(v) => set("installation_floor", v)} placeholder="1st floor" />
        <Text label="Wall width (in)" value={form.wall_width} set={(v) => set("wall_width", v)} placeholder="120" />
        <Text label="Wall height (in)" value={form.wall_height} set={(v) => set("wall_height", v)} placeholder="96" />
        <Text label="Wall material (if known)" value={form.wall_material} set={(v) => set("wall_material", v)} placeholder="Drywall / concrete / tile" />
        <Text label="Baseboard height (in)" value={form.baseboard_height} set={(v) => set("baseboard_height", v)} placeholder="4" />
        <Text label="Installation height" value={form.installation_height} set={(v) => set("installation_height", v)} placeholder="Bottom at 24 inch" />
        <Text label="Nearby doors" value={form.nearby_doors} set={(v) => set("nearby_doors", v)} placeholder="Door on left wall" />
        <Text label="Nearby windows" value={form.nearby_windows} set={(v) => set("nearby_windows", v)} placeholder="None" />
        <Text label="Wall-mounted equipment" value={form.wall_equipment} set={(v) => set("wall_equipment", v)} placeholder="None" full />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {bools.map((b) => (
          <label key={b.k} className={BOOL}>
            <input type="checkbox" checked={!!form[b.k]} onChange={(e) => set(b.k, e.target.checked)} className="accent-[#008B8B]" />
            {b.label}
          </label>
        ))}
      </div>

      <div className="mt-5">
        <label className={LABEL}>Additional notes</label>
        <textarea className="h-24 w-full border border-silver bg-white p-3 text-sm text-obsidian outline-none focus:border-icy" value={form.additional_notes} onChange={(e) => set("additional_notes", e.target.value)} />
      </div>

      <div className="mt-5 border-l-2 border-amber-400 bg-amber-50 p-4 text-[13px] leading-relaxed text-amber-800">
        <p className="flex items-center gap-2 font-semibold"><AlertCircle className="h-4 w-4" /> Please confirm before continuing:</p>
        <ul className="mt-2 space-y-1">
          <li>· Mirrors Only does not perform a pre-installation measurement.</li>
          <li>· You are responsible for confirming the selected mirror fits.</li>
          <li>· Existing mirrors must be removed before the appointment.</li>
          <li>· Mirrors Only does not remove or dispose of existing mirrors.</li>
          <li>· Installation depends on safe access and suitable wall conditions.</li>
          <li>· Additional work may require a revised price.</li>
        </ul>
      </div>
    </StepWrap>
  );
}

function PhotosStep({ form, set }) {
  const labels = ["Full installation wall", "Wall from the left", "Wall from the right", "Baseboard and floor", "Ceiling", "Outlets and switches", "Access path", "Staircase", "Elevator", "Parking area", "Inspiration image"];
  const [sets, setSets] = useState({});
  return (
    <StepWrap title="Upload photos" subtitle="Photos help identify obvious installation concerns. They are not an official measurement or fit guarantee.">
      <p className="text-[13px] text-slate-ink">Up to 15 images total. Choose any that apply to your space.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {labels.map((l) => (
          <PhotoUpload key={l} label={l} max={3} value={sets[l] || []} onChange={(v) => {
            const next = { ...sets, [l]: v };
            setSets(next);
            const all = Object.values(next).flat();
            set("photo_urls", all.slice(0, 15));
          }} />
        ))}
      </div>
      <p className="mt-4 text-[12px] text-slate-ink">Mirrors Only has not officially measured or guaranteed fit based solely on photographs.</p>
    </StepWrap>
  );
}

function ScheduleStep({ form, set, prelaunch }) {
  const today = new Date();
  const days = Array.from({ length: 21 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0 && d.getDay() !== 1).slice(0, 9);
  return (
    <StepWrap title="Schedule your appointment" subtitle="Available windows depend on inventory, route, and installer availability.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{prelaunch ? "Requested date — pending approval (Tue–Sat)" : "Available dates (Tue–Sat)"}</label>
          <div className="grid grid-cols-3 gap-2">
            {days.map((d) => {
              const iso = d.toISOString().slice(0, 10);
              const active = form.appointment_date === iso;
              return (
                <button key={iso} onClick={() => set("appointment_date", iso)} className={`border p-2 text-center text-[12px] transition-all ${active ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>
                  <span className="block font-semibold text-obsidian">{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  <span className="block text-slate-ink">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className={LABEL}>Time window</label>
          <div className="grid gap-2">
            {TIME_WINDOWS.map((w) => (
              <button key={w} onClick={() => set("appointment_window", w)} className={`border p-3 text-left text-[13px] transition-all ${form.appointment_window === w ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>{w}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-slate-ink">{prelaunch ? "Requested dates and windows are pending approval and are not confirmed until Mirrors Only reviews your request." : "Double-booking is prevented by live capacity. Final confirmation is sent after order review."}</p>
    </StepWrap>
  );
}

function CustomerStep({ form, set }) {
  return (
    <StepWrap title="Your information" subtitle="We'll use this to confirm your appointment and send updates.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Text label="First name" value={form.first_name} set={(v) => set("first_name", v)} />
        <Text label="Last name" value={form.last_name} set={(v) => set("last_name", v)} />
        <Text label="Mobile phone" value={form.mobile_phone} set={(v) => set("mobile_phone", v)} placeholder="(602) 555-0142" />
        <Text label="Email" value={form.email} set={(v) => set("email", v)} placeholder="you@email.com" />
        <Text label="Billing address" value={form.billing_address} set={(v) => set("billing_address", v)} full />
        <Text label="Service address" value={form.service_address} set={(v) => set("service_address", v)} full />
        <Text label="ZIP code" value={form.zip_code} set={(v) => set("zip_code", v)} />
        <Text label="Company name (if applicable)" value={form.company_name} set={(v) => set("company_name", v)} />
        <Choice label="Preferred communication" value={form.preferred_comm} options={["Text", "Call", "Email"]} set={(v) => set("preferred_comm", v)} />
        <Text label="How did you hear about us?" value={form.referral_source} set={(v) => set("referral_source", v)} />
      </div>
    </StepWrap>
  );
}

function PaymentStep({ form, set, pricing, prelaunch }) {
  return (
    <StepWrap title="Payment" subtitle={prelaunch ? "No payment is taken now. Tell us your preferred payment method — payment is arranged only after Mirrors Only confirms your request." : "Choose how you'd like to pay. Secure online payment is finalized before your appointment."}>
      <div className="grid gap-3">
        {[
          { v: "full", label: "Full online payment", note: prelaunch ? `Estimated $${pricing.total} — arranged after confirmation` : `Pay $${pricing.total} now` },
          { v: "deposit", label: "Deposit + balance", note: prelaunch ? `Estimated 50% deposit ($${Math.round(pricing.total * 0.5)}) — arranged after confirmation` : `50% deposit ($${Math.round(pricing.total * 0.5)}), balance due before appointment` },
          { v: "invoice", label: "Commercial invoice", note: "Net terms — for approved commercial accounts" }
        ].map((o) => (
          <button key={o.v} onClick={() => set("payment_method", o.v)} className={`flex items-center gap-4 border p-5 text-left transition-all ${form.payment_method === o.v ? "border-icy bg-icy/5 ring-1 ring-icy" : "border-silver hover:border-obsidian/30"}`}>
            <CreditCard className={`h-5 w-5 ${form.payment_method === o.v ? "text-icy-dark" : "text-slate-ink"}`} />
            <div className="flex-1">
              <p className="font-heading font-bold text-obsidian">{o.label}</p>
              <p className="text-[13px] text-slate-ink">{o.note}</p>
            </div>
            {form.payment_method === o.v && <Check className="h-4 w-4 text-icy-dark" />}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <label className={LABEL}>Promotional code</label>
        <input className={FIELD} value={form.promo_code} onChange={(e) => set("promo_code", e.target.value)} placeholder="Enter code" />
      </div>
      <p className="mt-4 text-[12px] text-slate-ink">Extended-area surcharges and additional-access fees are disclosed before any work beyond the original order. Financing is not offered.</p>
    </StepWrap>
  );
}

function AgreementsStep({ form, set }) {
  const items = [
    ["Product dimensions acknowledged", "/policies/measurement"],
    ["Customer measurement responsibility", "/policies/measurement"],
    ["Pickup policy", "/policies/pickup"],
    ["Delivery policy", "/policies/delivery"],
    ["Installation policy", "/policies/installation"],
    ["Existing-mirror policy", "/policies/installation"],
    ["Cancellation policy", "/policies/cancellation"],
    ["Nonreturnable custom product", "/policies/returns"],
    ["Warranty terms", "/policies/warranty"],
    ["Damage-inspection procedure", "/policies/damage"],
    ["Terms and conditions", "/policies/terms"],
    ["Privacy policy", "/policies/privacy"]
  ];
  return (
    <StepWrap title="Agreements" subtitle="Please review and accept each policy to place your order. The accepted version is stored with your order.">
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item[0]} className="flex items-center justify-between border border-silver bg-white px-4 py-3">
            <span className="flex items-center gap-2.5 text-[13px] text-obsidian">
              <input type="checkbox" checked={form.agreementAccepted} onChange={(e) => set("agreementAccepted", e.target.checked)} className="accent-[#008B8B]" />
              {item[0]}
            </span>
            <Link to={item[1]} className="text-[12px] font-semibold text-icy-dark">View</Link>
          </label>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-slate-ink">Agreement version v1.0 · accepted timestamp stored with your order.</p>
    </StepWrap>
  );
}

function ConfirmStep({ form, pricing, submitting, onSubmit, prelaunch }) {
  const p = PRODUCTS[form.mirror_size];
  return (
    <StepWrap title={prelaunch ? "Review and submit request" : "Review and place order"} subtitle={prelaunch ? "Confirm the details below. Submitting sends an order request — no payment is taken yet." : "Confirm the details below. You'll receive an order number and preparation instructions."}>
      <div className="border border-silver bg-lightgray p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Detail label="Mirror" value={`${p.name} × ${form.quantity}`} />
          <Detail label="Orientation" value={form.orientation} />
          <Detail label="Service" value={SERVICE_PRICING[form.service_type]?.label} />
          <Detail label={prelaunch ? "Requested appointment" : "Appointment"} value={form.appointment_date ? `${form.appointment_date} · ${form.appointment_window}${prelaunch ? " (pending approval)" : ""}` : "—"} />
          <Detail label="Name" value={`${form.first_name} ${form.last_name}`} />
          <Detail label="Contact" value={`${form.mobile_phone} · ${form.email}`} />
          <Detail label={prelaunch ? "Estimated total" : "Total"} value={`$${pricing.total}`} />
          <Detail label="Payment" value={prelaunch ? `${form.payment_method} (arranged after confirmation)` : form.payment_method} />
        </div>
      </div>
      <Btn variant="accent" size="lg" onClick={onSubmit} disabled={submitting} className="mt-6 w-full">
        {submitting ? (prelaunch ? "Submitting…" : "Placing order…") : prelaunch ? "Submit Order Request" : "Place Order"}
      </Btn>
    </StepWrap>
  );
}

function Confirmation({ form, pricing, orderId, prelaunch }) {
  const p = PRODUCTS[form.mirror_size];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-icy/15">
          <PartyPopper className="h-8 w-8 text-icy-dark" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-obsidian sm:text-4xl">{prelaunch ? "Order Request Received" : "Order placed"}</h1>
        <p className="mt-3 text-slate-ink">Thank you, {form.first_name || "there"}. {prelaunch ? "Your order request has been received." : "Your order has been received."}</p>
        <div className="mt-8 border border-silver bg-lightgray p-6 text-left">
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail label="Order number" value={orderId} />
            <Detail label="Mirror" value={`${p.name} × ${form.quantity}`} />
            <Detail label="Service" value={SERVICE_PRICING[form.service_type]?.label} />
            <Detail label={prelaunch ? "Requested appointment" : "Appointment"} value={form.appointment_date ? `${form.appointment_date} · ${form.appointment_window}${prelaunch ? " (pending approval)" : ""}` : "To be confirmed"} />
            <Detail label={prelaunch ? "Estimated amount due" : "Amount due"} value={`$${pricing.total}`} />
            <Detail label="Payment status" value={prelaunch ? "No payment taken — pending confirmation" : "Pending — instructions to follow"} />
          </div>
        </div>
        {prelaunch && (
          <div className="mt-6 border-l-2 border-icy bg-icy/5 p-4 text-left text-[13px] leading-relaxed text-slate-ink">
            Your order request has been received. Mirrors Only will review product availability, service area, access information, pricing, photos, and requested scheduling. Your order is not final until it is confirmed by Mirrors Only and any required payment is completed.
          </div>
        )}
        {prelaunch ? (
          <p className="mt-6 text-[13px] text-slate-ink">
            Mirrors Only will contact you to confirm your request and arrange any required payment. Keep your order number for reference.
          </p>
        ) : (
          <p className="mt-6 text-[13px] text-slate-ink">
            A confirmation and preparation instructions will be sent to {form.email || "your email"}. Keep your order number to manage your appointment.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn to="/" variant="primary">Back to Home</Btn>
          <Btn to="/contact" variant="outline">Contact us</Btn>
        </div>
      </div>
    </div>
  );
}