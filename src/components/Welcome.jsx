import React from 'react'

const Welcome = ({ onNavigate }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
            <h1 className="text-5xl font-bold text-gray-800">Welcome to SmartDine</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">A streamlined restaurant management system for menus, orders, tables, and reservations.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button onClick={() => onNavigate('Dashboard')} className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg shadow hover:bg-indigo-700 transition-colors">
                    Enter Dashboard
                </button>
                 <button onClick={() => onNavigate('Menu')} className="px-8 py-4 bg-gray-200 text-gray-800 text-lg rounded-lg shadow hover:bg-gray-300 transition-colors">
                    Manage Menu
                </button>
            </div>
        </div>
    );
};


export default Welcome