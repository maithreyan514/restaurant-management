import React, {  useMemo } from 'react';
import { formatCurrency } from '../utils';

const Dashboard = ({ store, onNavigate }) => {
    const { menu, tables, orders, reservations } = store;
    const occupied = tables.filter(t => t.status === "occupied").length;
    const available = tables.length - occupied;
    const activeOrders = orders.filter(o => o.status !== "Paid").length;
    const upcomingReservations = reservations.filter(r => r.status === "upcoming").length;
    const recentOrders = useMemo(() => [...orders].sort((a,b) => b.createdAt - a.createdAt).slice(0, 5), [orders]);

    const StatCard = ({ title, value }) => (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );

    const getStatusTagColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Served': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Menu Items" value={menu.length} />
                <StatCard title="Tables" value={`${available} available / ${occupied} occupied`} />
                <StatCard title="Active Orders" value={activeOrders} />
                <StatCard title="Upcoming Reservations" value={upcomingReservations} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onNavigate('Orders')} className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">New Order</button>
                        <button onClick={() => onNavigate('Reservations')} className="px-6 py-3 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition-colors">Add Reservation</button>
                        <button onClick={() => onNavigate('Menu')} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-colors">Manage Menu</button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.length > 0 ? recentOrders.map(o => (
                                    <tr key={o.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...{o.id.slice(-5)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{o.tableName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatCurrency(o.total)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTagColor(o.status)}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No recent orders</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard