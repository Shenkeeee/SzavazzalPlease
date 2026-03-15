import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CommitmentScreen } from './components/CommitmentScreen';
import { TimeSelectionScreen } from './components/TimeSelectionScreen';
import { ShareScreen } from './components/ShareScreen';
import { DashboardScreen } from './components/DashboardScreen';

type Screen = 'welcome' | 'commitment' | 'time' | 'share' | 'dashboard';

interface AppData {
  userName: string;
  friends: string[];
  scheduledTime: { date: string; time: string };
  currentScreen: Screen;
}

const initialData: AppData = {
  userName: '',
  friends: ['', '', ''],
  scheduledTime: { date: '', time: '' },
  currentScreen: 'welcome'
};

export default function App() {
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('valasztas-app-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>(appData.currentScreen);

  useEffect(() => {
    const dataToSave = { ...appData, currentScreen };
    localStorage.setItem('valasztas-app-data', JSON.stringify(dataToSave));
  }, [appData, currentScreen]);

  const handleNameSubmit = (name: string) => {
    setAppData(prev => ({ ...prev, userName: name }));
    setCurrentScreen('commitment');
  };

  const handleFriendsSubmit = (friends: string[]) => {
    setAppData(prev => ({ ...prev, friends }));
    setCurrentScreen('time');
  };

  const handleTimeSubmit = (scheduledTime: { date: string; time: string }) => {
    setAppData(prev => ({ ...prev, scheduledTime }));
    setCurrentScreen('share');
  };

  const handleShareComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Biztosan új tervezést szeretnél kezdeni? Ez törli a jelenlegi adataidat.');
    if (confirmReset) {
      localStorage.removeItem('valasztas-app-data');
      localStorage.removeItem('friends-status');
      localStorage.removeItem('tasks-status');
      setAppData(initialData);
      setCurrentScreen('welcome');
    }
  };

  const goBack = () => {
    const screenFlow: Screen[] = ['welcome', 'commitment', 'time', 'share', 'dashboard'];
    const currentIndex = screenFlow.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screenFlow[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onNext={handleNameSubmit}
          initialName={appData.userName}
        />
      )}

      {currentScreen === 'commitment' && (
        <CommitmentScreen
          userName={appData.userName}
          onNext={handleFriendsSubmit}
          onBack={goBack}
          initialFriends={appData.friends}
        />
      )}

      {currentScreen === 'time' && (
        <TimeSelectionScreen
          onNext={handleTimeSubmit}
          onBack={goBack}
          initialSelection={appData.scheduledTime}
        />
      )}

      {currentScreen === 'share' && (
        <ShareScreen
          userName={appData.userName}
          friendsCount={appData.friends.filter(f => f.trim()).length}
          onNext={handleShareComplete}
          onBack={goBack}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          userName={appData.userName}
          friends={appData.friends}
          scheduledTime={appData.scheduledTime}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
