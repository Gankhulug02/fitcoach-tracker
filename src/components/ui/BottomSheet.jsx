import { useEffect } from "react";

export default function BottomSheet({ open, onClose, title, children, fullHeight = false }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-lg bg-zinc-900 rounded-t-3xl shadow-2xl ${fullHeight ? "h-[85vh] flex flex-col" : "max-h-[85vh]"}`}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
          <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2" />
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button onClick={onClose} className="text-zinc-400 hover:text-white tap-target flex items-center justify-center ml-auto">✕</button>
        </div>
        <div className={`overflow-y-auto px-6 pb-8 ${fullHeight ? "flex-1" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
