import PageWrapper from "../layout/PageWrapper";
import AccountSection from "./AccountSection";
import InjuryFlagsSection from "./InjuryFlagsSection";
import ExportSection from "./ExportSection";
import DeleteAccountSection from "./DeleteAccountSection";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">{title}</h2>
      <div className="bg-zinc-900 rounded-2xl p-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { signOut } = useAuth();

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Section title="Account">
        <AccountSection />
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <Button variant="ghost" onClick={signOut} className="w-full text-zinc-400">Sign out</Button>
        </div>
      </Section>

      <Section title="Injury flags">
        <InjuryFlagsSection />
      </Section>

      <Section title="Export data">
        <p className="text-xs text-zinc-500 mb-3">Download all your data as CSV files.</p>
        <ExportSection />
      </Section>

      <Section title="Danger zone">
        <DeleteAccountSection />
      </Section>
    </PageWrapper>
  );
}
