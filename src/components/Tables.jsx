import React from 'react'

const Tables = ({ store }) => {
    const { tables, setTables } = store;

    const updateTableStatus = (tableId, status) => {
        setTables(tables.map(t =>
            t.id === tableId
                ? { ...t, status, currentOrderId: status === 'available' ? null : t.currentOrderId }
                : t
        ));
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Table Management</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                 <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                            {tables.map(t => (
                                <tr key={t.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.capacity} people</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {t.status === 'available' ? (
                                            <button onClick={() => updateTableStatus(t.id, 'occupied')} className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md shadow hover:bg-indigo-700 transition-colors">Assign</button>
                                        ) : (
                                            <button onClick={() => updateTableStatus(t.id, 'available')} className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-md shadow hover:bg-yellow-600 transition-colors">Release</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tables