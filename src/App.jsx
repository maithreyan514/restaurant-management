import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Orders from './components/Orders'
import Menu from './components/Menu';
import Reservations from './components/Reservations'
import Tables from './components/Tables'
import Welcome from './components/Welcome'


import {useSmartDineStore} from './store/useSmartDineStore'


// --- MAIN APP COMPONENT ---
export default function App() {

  const [page, setPage] = useState('Dashboard');
  const store = useSmartDineStore();

  const handleNavigate = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard store={store} onNavigate={handleNavigate} />;
      case 'Menu':
        return <Menu store={store} />;
      case 'Orders':
        return <Orders store={store} />;
      case 'Tables':
        return <Tables store={store} />;
      case 'Reservations':
        return <Reservations store={store} />;
      case 'Welcome':
      default:
        return <Welcome onNavigate={handleNavigate}/>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {page !== 'Welcome' && <Header activePage={page} onNavigate={handleNavigate} />}
      <main className="container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
}
