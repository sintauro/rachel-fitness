import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage.jsx';
import RoutinesPage from './components/RoutinesPage.jsx';
import PaymentPage from './components/PaymentPage.jsx';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'routines':
        return <RoutinesPage />;
      case 'payment':
        return <PaymentPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}
