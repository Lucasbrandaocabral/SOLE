import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart()
  const [liked, setLiked] = useState(false)
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 })

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 280, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 280, damping: 22 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    rotateX.set((cy - 0.5) * -14)
    rotateY.set((cx - 0.5) * 14)
    setShinePos({ x: cx * 100, y: cy * 100 })
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setShinePos({ x: 50, y: 50 })
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 900,
        rotateX: springX,
        rotateY: springY,
      }}
    >
      <div className={styles.imgWrap} onClick={() => onClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.img}
          loading="lazy"
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} hover`}
            className={styles.hoverImg}
            loading="lazy"
          />
        )}

        <span className={styles.tag} style={{ background: product.tagColor }}>
          {product.tag}
        </span>

        {discount && (
          <span className={styles.discount}>-{discount}%</span>
        )}

        <button
          className={`${styles.like} ${liked ? styles.liked : ''}`}
          onClick={(e) => { e.stopPropagation(); setLiked(v => !v) }}
        >
          <Heart size={16} fill={liked ? '#ff4d00' : 'none'} />
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.topRow}>
          <span className={styles.brand}>{product.brand}</span>
          <div className={styles.rating}>
            <Star size={11} fill="#ff4d00" color="#ff4d00" />
            <span>{product.rating}</span>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>
        </div>

        <h3 className={styles.name} onClick={() => onClick(product)}>{product.name}</h3>

        <div className={styles.colors}>
          {product.colors.map((c, i) => (
            <span key={i} className={styles.colorDot} style={{ background: c }} />
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>R$ {product.price.toLocaleString('pt-BR')}</span>
            {product.originalPrice && (
              <span className={styles.original}>R$ {product.originalPrice.toLocaleString('pt-BR')}</span>
            )}
          </div>
          <button
            className={styles.addBtn}
            onClick={() => addToCart(product, product.sizes[0])}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Mouse-tracking shine overlay */}
      <div
        className={styles.shine}
        style={{
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.08) 0%, transparent 65%)`
        }}
      />
    </motion.div>
  )
}
