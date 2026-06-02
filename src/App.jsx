import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import LoginPage from "./components/auth/LoginPage";
import OnboardingPage from "./components/auth/OnboardingPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import WorkoutPage from "./components/workout/WorkoutPage";
import WorkoutLoggerPage from "./components/workout/WorkoutLoggerPage";
import PlansPage from "./components/plans/PlansPage";
import EtoyaaPlanPage from "./components/plans/EtoyaaPlanPage";
import RunsPage from "./components/runs/RunsPage";
import StatsPage from "./components/stats/StatsPage";
import SettingsPage from "./components/settings/SettingsPage";
import BottomNav from "./components/layout/BottomNav";
import FAB from "./components/layout/FAB";
import Spinner from "./components/ui/Spinner";

function AppRoutes() {
  const { session, isOnboarded } = useAuth();

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session) return <LoginPage />;
  if (!isOnboarded) return <OnboardingPage />;

  return (
    <AppProvider>
      <div className="relative">
        <Routes>
          <Route path="/"             element={<DashboardPage />} />
          <Route path="/workouts"     element={<WorkoutPage />} />
          <Route path="/workouts/log"        element={<WorkoutLoggerPage />} />
          <Route path="/workouts/edit/:id"  element={<WorkoutLoggerPage />} />
          <Route path="/plans"          element={<PlansPage />} />
          <Route path="/plans/etoyaa"  element={<EtoyaaPlanPage />} />
          <Route path="/runs"         element={<RunsPage />} />
          <Route path="/stats"        element={<StatsPage />} />
          <Route path="/settings"     element={<SettingsPage />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
        <FAB />
      </div>
    </AppProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#18181b", color: "#fff", border: "1px solid #3f3f46", borderRadius: "12px" },
            success: { iconTheme: { primary: "#00FF87", secondary: "#000" } },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
