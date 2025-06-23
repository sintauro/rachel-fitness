import React from 'react';

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rachel Rondón | Fitness Coach</h1>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'font-semibold underline' : 'hover:opacity-80'}>
            Inicio
          </button>
          <button onClick={() => setCurrentPage('routines')} className={currentPage === 'routines' ? 'font-semibold underline' : 'hover:opacity-80'}>
            Rutinas
          </button>
          <button onClick={() => setCurrentPage('payment')} className={currentPage === 'payment' ? 'font-semibold underline' : 'hover:opacity-80'}>
            Comprar Plan
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            className="bg-white text-gray-800 rounded p-1"
          >
            <option value="home">Inicio</option>
            <option value="routines">Rutinas</option>
            <option value="payment">Comprar Plan</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;