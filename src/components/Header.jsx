import React from 'react'

const Header = ({ activePage, onNavigate }) => {
  const navItems = ['Dashboard', 'Menu', 'Orders', 'Tables', 'Reservations'];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl" role="img" aria-label="plate icon">🍽️</span>
            <h1 className="text-xl font-bold text-gray-800">SmartDine</h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-2 md:space-x-4">
              {navItems.map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); onNavigate(item); }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activePage === item
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header