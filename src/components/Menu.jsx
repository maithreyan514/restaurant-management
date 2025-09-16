import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils';
import { cryptoId } from '../utils';

const Menu = ({ store }) => {
    const { menu, setMenu } = store;
    const [editingItem, setEditingItem] = useState(null);
    const [formState, setFormState] = useState({ name: '', category: '', price: '' });

    useEffect(() => {
        if (editingItem) {
            setFormState({
                name: editingItem.name,
                category: editingItem.category,
                price: editingItem.price,
            });
        } else {
            setFormState({ name: '', category: '', price: '' });
        }
    }, [editingItem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, category, price } = formState;
        if (!name.trim() || !category.trim() || !price || isNaN(parseFloat(price))) return;

        const priceValue = parseFloat(price);

        if (editingItem) {
            setMenu(menu.map(item =>
                item.id === editingItem.id ? { ...item, name, category, price: priceValue } : item
            ));
            setEditingItem(null);
        } else {
            setMenu([...menu, { id: cryptoId(), name, category, price: priceValue }]);
        }
        setFormState({ name: '', category: '', price: '' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setMenu(menu.filter(item => item.id !== id));
        }
    };
    
    const cancelEdit = () => {
        setEditingItem(null);
        setFormState({ name: '', category: '', price: '' });
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{editingItem ? 'Edit Item' : 'Add Item'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Margherita Pizza" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" id="category" name="category" value={formState.category} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Starter, Main, Dessert"/>
                        </div>
                         <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" id="price" name="price" value={formState.price} onChange={handleInputChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="flex space-x-2 pt-2">
                             <button type="submit" className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">{editingItem ? 'Update' : 'Add'}</button>
                             {editingItem && (
                                <button type="button" onClick={cancelEdit} className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300 transition-colors">Cancel</button>
                             )}
                        </div>
                    </form>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Menu Items</h3>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                                {menu.length > 0 ? menu.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.price)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button onClick={() => setEditingItem(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No menu items found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu