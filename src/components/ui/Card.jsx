export default function Card({ children, className = "", onClick }) {
  const base = "bg-zinc-900 rounded-2xl p-4";
  return (
    <div onClick={onClick} className={`${base} ${onClick ? "cursor-pointer active:scale-[0.99] transition" : ""} ${className}`}>
      {children}
    </div>
  );
}
