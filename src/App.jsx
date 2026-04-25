import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import FeaturedBanner from './components/FeaturedBanner'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <CartProvider>
      <Cursor />

      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #ff4d00, #ff7a40)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 99997,
          boxShadow: '0 0 8px rgba(255,77,0,0.6)',
        }}
      />

      <Navbar onSearch={setSearch} theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <FeaturedBanner />
      <ProductGrid onProductClick={setSelectedProduct} search={search} />
      <Footer />
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <ProductModal key={selectedProduct.id} product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
      <Cart />
    </CartProvider>
  )
}
