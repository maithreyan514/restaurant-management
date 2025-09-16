import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils';

const Orders = ({ store }) => {
    const { menu, tables, setTables, orders, setOrders } = store;
    const [selectedTable, setSelectedTable] = useState(tables.find(t => t.status === 'available')?.id || '');
    const [cart, setCart] = useState({});

    const addToCart = (item) => {
        setCart(prev => ({
            ...prev,
            [item.id]: { item, qty: (prev[item.id]?.qty || 0) + 1 }
        }));
    };

    const updateCartQty = (itemId, newQty) => {
        if (newQty <= 0) {
            const newCart = { ...cart };
            delete newCart[itemId];
            setCart(newCart);
        } else {
            setCart(prev => ({
                ...prev,
                [itemId]: { ...prev[itemId], qty: newQty }
            }));
        }
    };
    
    const cartTotal = useMemo(() => Object.values(cart).reduce((sum, { item, qty }) => sum + item.price * qty, 0), [cart]);

    const placeOrder = () => {
        const table = tables.find(t => t.id === parseInt(selectedTable));
        if (!table || Object.keys(cart).length === 0) {
            alert('Please select a table and add items to the cart.');
            return;
        }

        const newOrder = {
            id: cryptoId(),
            tableId: table.id,
            tableName: table.name,
            items: Object.values(cart).map(({ item, qty }) => ({ id: item.id, name: item.name, price: item.price, qty })),
            total: cartTotal,
            status: "Pending",
            createdAt: Date.now(),
        };

        setOrders([...orders, newOrder]);
        
        setTables(tables.map(t => t.id === table.id ? { ...t, status: 'occupied', currentOrderId: newOrder.id } : t));

        setCart({});
        setSelectedTable(tables.find(t => t.status === 'available')?.id || '');
    };

    const updateOrderStatus = (orderId, status) => {
        const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
        setOrders(updatedOrders);

        if (status === 'Paid') {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                setTables(prevTables => prevTables.map(t =>
                    t.id === order.tableId ? { ...t, status: 'available', currentOrderId: null } : t
                ));
            }
        }
    };

    const getStatusTagColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Served': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const sortedOrders = useMemo(() => [...orders].sort((a,b) => b.createdAt - a.createdAt), [orders]);

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
            
            {/* Create Order Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="order-table" className="text-sm font-medium text-gray-700">Select Table:</label>
                        <select id="order-table" value={selectedTable} onChange={e => setSelectedTable(e.target.value)} className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                             {tables.map(t => (
                                <option key={t.id} value={t.id} disabled={t.status === 'occupied'}>{t.name} ({t.status})</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={placeOrder} disabled={Object.keys(cart).length === 0 || !selectedTable} className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Place Order
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Menu List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Menu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                        {menu.map(item => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                               <div>
                                 <h4 className="font-bold text-gray-800">{item.name}</h4>
                                 <p className="text-sm text-gray-500">{item.category}</p>
                                 <p className="font-semibold mt-1">{formatCurrency(item.price)}</p>
                               </div>
                               <div className="flex items-center justify-between mt-3">
                                   <button onClick={() => addToCart(item)} className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors">Add</button>
                                   {cart[item.id] && <span className="text-sm font-bold text-gray-600">In cart: {cart[item.id].qty}</span>}
                               </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {Object.keys(cart).length > 0 ? Object.values(cart).map(({item, qty}) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                     <button onClick={() => updateCartQty(item.id, qty - 1)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300">-</button>
                                     <span>{qty}</span>
                                     <button onClick={() => updateCartQty(item.id, qty + 1)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300">+</button>
                                     <button onClick={() => updateCartQty(item.id, 0)} className="text-red-500 hover:text-red-700 text-sm ml-2">Remove</button>
                                </div>
                                <div className="font-semibold w-20 text-right">{formatCurrency(item.price * qty)}</div>
                            </div>
                        )) : (
                            <p className="text-gray-500">Cart is empty.</p>
                        )}
                    </div>
                    {cartTotal > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-200 text-right">
                            <p className="text-xl font-bold">Total: {formatCurrency(cartTotal)}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">All Orders</h3>
                <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                             {sortedOrders.length > 0 ? sortedOrders.map(o => (
                                <tr key={o.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...{o.id.slice(-5)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{o.tableName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{o.items.reduce((sum, item) => sum + item.qty, 0)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatCurrency(o.total)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusTagColor(o.status)}`}>{o.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            {["Pending", "In Progress", "Served", "Paid"].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Orders