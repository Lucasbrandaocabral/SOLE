import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

const sortOptions = [
  { value: 'default', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliado' },
]

export default function ProductGrid({ onProductClick, search }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => {
      if (!search) return true
      const q = search.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.includes(q)
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.title}>Coleção</h2>
            <p className={styles.sub}>{filtered.length} produtos encontrados</p>
          </motion.div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.categories}>
            {categories.map(c => (
              <button
                key={c.id}
                className={`${styles.catBtn} ${activeCategory === c.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className={styles.sortWrap}>
            <SlidersHorizontal size={16} color="var(--text2)" />
            <div className={styles.selectWrap}>
              <select
                className={styles.sort}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className={styles.selectArrow} />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>Nenhum produto encontrado para "<strong>{search}</strong>"</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
