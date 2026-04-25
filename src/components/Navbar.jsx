import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Sun, Moon } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar({ onSearch, theme, toggleTheme }) {
  const { count, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>SOLE<span>.</span></a>

        <ul className={styles.links}>
          {['Novidades', 'Coleções', 'Brands', 'Sale'].map(l => (
            <li key={l}><a href="#products">{l}</a></li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={styles.iconBtn} onClick={() => setSearchOpen(v => !v)}>
            <Search size={20} />
          </button>
          <button className={styles.iconBtn} onClick={() => setIsOpen(true)}>
            <ShoppingBag size={20} />
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </button>
          <button className={`${styles.iconBtn} ${styles.burger}`} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={styles.searchBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Search size={18} className={styles.searchIcon} />
            <input
              autoFocus
              placeholder="Buscar tênis, marcas..."
              value={searchVal}
              onChange={handleSearch}
            />
            {searchVal && <button onClick={() => { setSearchVal(''); onSearch('') }}><X size={16} /></button>}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {['Novidades', 'Coleções', 'Brands', 'Sale'].map(l => (
              <a key={l} href="#products" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
