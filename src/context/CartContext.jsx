import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size)
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, size, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (id, size) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))

  const updateQty = (id, size, qty) => {
    if (qty < 1) return removeFromCart(id, size)
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i))
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
