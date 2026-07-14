import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { base44 } from "@/api/base44Client";

const DEFAULT_FAQS = [
  "What mirror sizes do you sell?",
  "Do you offer custom sizes?",
  "Are the mirrors framed?",
  "Can the mirror be installed horizontally?",
  "Can the mirror be installed vertically?",
  "Do you measure the wall?",
  "How do I know which size fits?",
  "Can I upload wall photos?",
  "Do you deliver?",
  "Can I pick up the mirror?",
  "What vehicle do I need for pickup?",
  "Do you help load the mirror?",
  "Do you install the mirror?",
  "Can you install a mirror purchased somewhere else?",
  "Do you remove existing mirrors?",
  "Do you dispose of existing mirrors?",
  "What wall types can you install on?",
  "Can you install over baseboards?",
  "Can you install around outlets?",
  "Can you install on tile?",
  "Can you install upstairs?",
  "Are stairs an additional charge?",
  "What happens if the mirror does not fit?",
  "What happens if the wall is unsuitable?",
  "What happens if the mirror is damaged?",
  "What does the one-year warranty cover?",
  "Are pickup purchases returnable?",
  "Are delivered mirrors returnable?",
  "Can I cancel or reschedule?",
  "Do you offer multi-mirror discounts?",
  "Do you serve commercial properties?",
  "What cities do you serve?",
  "Are you licensed and bonded?"
];

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    base44.entities.FAQItem.filter({ published: true }, "order_index", 100)
      .then(setFaqs).catch(() => {});
  }, []);

  const list = faqs.length > 0
    ? faqs.map((f) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS.map((q) => ({ q, a: "[Editable] This answer will be entered by an administrator before launch." }));

  return (
    <div>
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        subtitle="Answers are managed by our team and finalized before launch. Don't see your question? Reach out — we're happy to help."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
          <div className="divide-y divide-silver border-y border-silver">
            {list.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-[15px] font-semibold text-obsidian">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-ink transition-transform ${isOpen ? "rotate-180 text-icy-dark" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="squeegee pb-5 text-[14px] leading-relaxed text-slate-ink">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}