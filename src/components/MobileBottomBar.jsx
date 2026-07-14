import { Phone, MessageSquare, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cartContext";
import { CONTACT } from "@/lib/siteConfig";

export default function MobileBottomBar() {
  const { count } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 glass-dark border-t border-white/10 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-edge grid-cols-4">
        <Link to="/shop" className="flex flex-col items-center justify-center gap-1 py-2.5 text-white">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-[10px] font-semibold tracking-wide">Shop</span>
        </Link>
        <a href={CONTACT.phoneHref} className="flex flex-col items-center justify-center gap-1 py-2.5 text-white">
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-semibold tracking-wide">Call</span>
        </a>
        <a href={CONTACT.textHref} className="flex flex-col items-center justify-center gap-1 py-2.5 text-white">
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-semibold tracking-wide">Text</span>
        </a>
        <Link to="/shop" className="relative flex flex-col items-center justify-center gap-1 py-2.5 text-white">
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-icy px-1 text-[10px] font-bold text-obsidian">
                {count}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Cart</span>
        </Link>
      </div>
    </div>
  );
}