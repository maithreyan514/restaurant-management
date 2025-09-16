import React, { useState, useMemo } from 'react';
import { cryptoId } from '../utils';

const Reservations = ({ store }) => {
    const { reservations, setReservations } = store;
    const [formState, setFormState] = useState({ customer: '', date: '', time: '', partySize: '2' });

     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { customer, date, time, partySize } = formState;
        if (!customer.trim() || !date || !time) return;

        const when = new Date(`${date}T${time}`).toISOString();

        setReservations([...reservations, {
            id: cryptoId(),
            customer,
            when,
            partySize: parseInt(partySize),
            status: 'upcoming'
        }]);

        setFormState({ customer: '', date: '', time: '', partySize: '2' });
    };

    const handleDelete = (id) => {
         if (window.confirm('Are you sure you want to delete this reservation?')) {
            setReservations(reservations.filter(r => r.id !== id));
        }
    };
    
    const sortedReservations = useMemo(() => [...reservations].sort((a,b) => new Date(a.when) - new Date(b.when)), [reservations]);


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Reservations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">New Reservation</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
                            <input type="text" id="customer" name="customer" value={formState.customer} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" id="date" name="date" value={formState.date} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                                <input type="time" id="time" name="time" value={formState.time} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="partySize" className="block text-sm font-medium text-gray-700">Party Size</label>
                            <input type="number" id="partySize" name="partySize" value={formState.partySize} onChange={handleInputChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-sky-500 text-white rounded-md shadow hover:bg-sky-600 transition-colors">Add Reservation</button>
                    </form>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                     <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Reservations</h3>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                                {sortedReservations.length > 0 ? sortedReservations.map(r => (
                                    <tr key={r.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(r.when).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.partySize}</td>
                                         <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{r.status}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">No upcoming reservations.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Reservations