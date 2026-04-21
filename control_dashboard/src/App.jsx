import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AmbulancesPage from './pages/AmbulancesPage';
import EmergenciesPage, { initialEmergencies, availableAmbulances } from './pages/EmergenciesPage';
import PolicePage from './pages/PolicePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [emergencies, setEmergencies] = useState(initialEmergencies);
  const [ambulances, setAmbulances] = useState(availableAmbulances);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage emergencies={emergencies} ambulances={ambulances} onNavigate={setActivePage} />;
      case 'ambulances':
        return <AmbulancesPage />;
      case 'emergencies':
        return (
          <EmergenciesPage
            emergencies={emergencies}
            setEmergencies={setEmergencies}
            ambulances={ambulances}
            setAmbulances={setAmbulances}
          />
        );
      case 'police':
        return <PolicePage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage emergencies={emergencies} ambulances={ambulances} onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout} />
      <div className="main-area">
        <Header title="AMPTS Control Center" user={user} onLogout={handleLogout} />
        <div className="content-scroll">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
