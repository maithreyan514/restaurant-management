import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {cryptoId} from '../utils'

// --- DATA STORE ---
export const useSmartDineStore = () => {
    const defaultMenu = useMemo(() => [
        { id: cryptoId(), name: "Margherita Pizza", category: "Main", price: 9.99 },
        { id: cryptoId(), name: "Caesar Salad", category: "Starter", price: 6.5 },
        { id: cryptoId(), name: "Grilled Salmon", category: "Main", price: 14.25 },
        { id: cryptoId(), name: "Chocolate Lava Cake", category: "Dessert", price: 5.75 },
        { id: cryptoId(), name: "Fresh Lemonade", category: "Beverage", price: 3.0 },
    ], []);

    const defaultTables = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        name: `T-${i + 1}`,
        capacity: i < 6 ? 4 : 6,
        status: "available",
        currentOrderId: null,
    })), []);


  const [menu, setMenu] = useLocalStorage('SMARTDINE_MENU', defaultMenu);
  const [tables, setTables] = useLocalStorage('SMARTDINE_TABLES', defaultTables);
  const [orders, setOrders] = useLocalStorage('SMARTDINE_ORDERS', []);
  const [reservations, setReservations] = useLocalStorage('SMARTDINE_RESERVATIONS', []);

  return {
    menu, setMenu,
    tables, setTables,
    orders, setOrders,
    reservations, setReservations,
  };
};