import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "@/components/Logo";
import Btn from "@/components/Btn";
import { useCart } from "@/lib/cartContext";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop Mirrors", to: "/shop" },
  { label: "Delivery", to: "/delivery" },
  { label: "Installation", to: "/installation" },
  { label: "Commercial", to: "/commercial" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Gallery", to: "/gallery" },
  { label: "Service Area", to: "/service-area" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 glass-nav border-b border-silver/60 ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-edge items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[12.5px] font-medium tracking-tight transition-colors hover:text-icy-dark ${
                location.pathname === item.to ? "text-icy-dark" : "text-slate-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <Btn to="/service-area" variant="outline" size="sm">
            Check Delivery
          </Btn>
          <Btn to="/shop" variant="accent" size="sm">
            Shop Mirrors
          </Btn>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            to="/shop"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-silver text-obsidian"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-icy px-1 text-[10px] font-bold text-obsidian">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-silver text-obsidian"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass-nav border-t border-silver/60 xl:hidden">
          <nav className="mx-auto grid max-w-edge gap-1 px-4 py-4 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between border-b border-silver/50 py-3 text-sm font-medium ${
                  location.pathname === item.to ? "text-icy-dark" : "text-obsidian"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Btn to="/service-area" variant="outline" size="sm">
                Check Delivery
              </Btn>
              <Btn to="/shop" variant="accent" size="sm">
                Shop Mirrors
              </Btn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}