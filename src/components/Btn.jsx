import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-icy/60 disabled:opacity-50 disabled:pointer-events-none";

export default function Btn({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  ...props
}) {
  const sizes = {
    sm: "text-[13px] px-4 h-9",
    md: "text-sm px-5 h-11",
    lg: "text-[15px] px-7 h-12"
  };

  const variants = {
    primary: "bg-obsidian text-white hover:bg-nearblack",
    accent: "bg-icy text-obsidian hover:brightness-110 shadow-[0_8px_30px_-12px_rgba(0,206,209,0.7)]",
    outline: "border border-obsidian/15 text-obsidian hover:border-obsidian/40 hover:bg-black/[0.02]",
    ghost: "text-obsidian hover:bg-black/[0.04]",
    light: "bg-white text-obsidian hover:bg-silver",
    darkOutline: "border border-white/25 text-white hover:bg-white/10"
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}