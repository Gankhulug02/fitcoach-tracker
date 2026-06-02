export default function Button({ children, variant = "primary", size = "md", className = "", disabled, onClick, type = "button" }) {
  const base = "tap-target inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-accent text-zinc-950 hover:bg-accent/90 active:scale-95",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 active:scale-95",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2.5",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}
