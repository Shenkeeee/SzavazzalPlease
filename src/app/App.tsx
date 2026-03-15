import { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { CommitmentScreen } from "./components/CommitmentScreen";
import { TimeSelectionScreen } from "./components/TimeSelectionScreen";
import { ShareScreen } from "./components/ShareScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { SocialProofScreen } from "./components/SocialProofScreen";
import { AdminDashboard } from "./components/AdminDashboard";

type Screen =
  | "welcome"
  | "commitment"
  | "time"
  | "share"
  | "dashboard"
  | "adminDashboard"
  | "socialProof";

interface AppData {
  userName: string;
  friends: string[];
  scheduledTime: { date: string; time: string };
  currentScreen: Screen;
}

const initialData: AppData = {
  userName: "",
  friends: ["", "", ""],
  scheduledTime: { date: "", time: "" },
  currentScreen: "welcome",
};

export default function App() {
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem("valasztas-app-data");
    return initialData;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>(
    appData.currentScreen,
  );

  useEffect(() => {
    const dataToSave = { ...appData, currentScreen };
    localStorage.setItem("valasztas-app-data", JSON.stringify(dataToSave));
  }, [appData, currentScreen]);

  const handleNameSubmit = (name: string) => {
    setAppData((prev) => ({ ...prev, userName: name }));
    setCurrentScreen("commitment");
  };

  const handleFriendsSubmit = (friends: string[]) => {
    setAppData((prev) => ({ ...prev, friends }));
    setCurrentScreen("time");
  };

  const handleTimeSubmit = (scheduledTime: { date: string; time: string }) => {
    setAppData((prev) => ({ ...prev, scheduledTime }));
    setCurrentScreen("share");
  };

  const handleShareComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleLeaderboardClick = () => {
    setCurrentScreen("socialProof");
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Biztosan új tervezést szeretnél kezdeni? Ez törli a jelenlegi adataidat.",
    );
    if (confirmReset) {
      localStorage.removeItem("valasztas-app-data");
      localStorage.removeItem("friends-status");
      localStorage.removeItem("tasks-status");
      setAppData(initialData);
      setCurrentScreen("welcome");
    }
  };

  const goBack = () => {
    const screenFlow: Screen[] = [
      "welcome",
      "commitment",
      "time",
      "share",
      "dashboard",
    ];
    const currentIndex = screenFlow.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screenFlow[currentIndex - 1]);
    }
  };

  const goBackToShare = () => {
    setCurrentScreen("share");
  };

  const goToDasboard = () => {
    setCurrentScreen("dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === "welcome" && (
        <WelcomeScreen
          onNext={handleNameSubmit}
          initialName={appData.userName}
        />
      )}
      {currentScreen === "commitment" && (
        <CommitmentScreen
          userName={appData.userName}
          onNext={handleFriendsSubmit}
          onBack={goBack}
          initialFriends={appData.friends}
        />
      )}
      {currentScreen === "time" && (
        <TimeSelectionScreen
          onNext={handleTimeSubmit}
          onBack={goBack}
          initialSelection={appData.scheduledTime}
        />
      )}
      {currentScreen === "share" && (
        <ShareScreen
          userName={appData.userName}
          friendsCount={appData.friends.filter((f) => f.trim()).length}
          onNext={handleShareComplete}
          onLeaderboard={handleLeaderboardClick}
          onBack={goBack}
        />
      )}
      {currentScreen === "dashboard" && (
        <DashboardScreen
          userName={appData.userName}
          friends={appData.friends}
          scheduledTime={appData.scheduledTime}
          onReset={handleReset}
        />
      )}
      {currentScreen === "adminDashboard" && <AdminDashboard />}
      {currentScreen === "socialProof" && (
        <SocialProofScreen onBack={goBackToShare} onForward={goToDasboard} />
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-2 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity z-50">
        <div className="flex gap-4 items-center ml-2">
          <span className="text-slate-500 font-bold">Admin Panel:</span>
          <button
            onClick={() => setCurrentScreen("adminDashboard")}
            className={`hover:text-[#CE2939] transition-colors ${currentScreen === "adminDashboard" ? "text-[#CE2939]" : ""}`}
          >
            Analytics
          </button>
        </div>
      </footer>
    </div>
  );
}
