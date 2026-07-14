import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/siteConfig";

const CartContext = createContext(null);

const STORAGE_KEY = "mo_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = (size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.size === size);
      if (existing) {
        return prev.map((i) => (i.size === size ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { size, quantity }];
    });
  };

  const setItem = (size, quantity) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.size === size);
      if (existing) {
        return prev.map((i) => (i.size === size ? { ...i, quantity } : i));
      }
      return [...prev, { size, quantity }];
    });
  };

  const removeItem = (size) => setItems((prev) => prev.filter((i) => i.size !== size));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + (PRODUCTS[i.size]?.price || 0) * i.quantity, 0),
    [items]
  );

  const value = { items, addItem, setItem, removeItem, clear, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}