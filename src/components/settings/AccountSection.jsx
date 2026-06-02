import { useAuth } from "../../context/AuthContext";

export default function AccountSection() {
  const { session, profile } = useAuth();
  const meta = session?.user?.user_metadata;

  return (
    <div className="flex items-center gap-4">
      {meta?.avatar_url && (
        <img src={meta.avatar_url} alt="avatar" className="w-14 h-14 rounded-full" />
      )}
      <div>
        <p className="font-semibold text-white">{meta?.full_name || profile?.name || "—"}</p>
        <p className="text-sm text-zinc-500">{session?.user?.email}</p>
        <p className="text-xs text-zinc-600 mt-0.5">Google account</p>
      </div>
    </div>
  );
}
