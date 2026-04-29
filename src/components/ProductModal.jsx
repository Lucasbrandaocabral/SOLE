import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Star, ShoppingBag, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgIndex, setImgIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    setImgIndex(0)
  }, [product?.id])

  if (!product) return null

  const handleAdd = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const isMobile = window.innerWidth <= 720

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={isMobile ? { y: '100%' } : { y: 36, opacity: 0 }}
        animate={isMobile ? { y: 0 } : { y: 0, opacity: 1 }}
        exit={isMobile ? { y: '100%' } : { y: 24, opacity: 0 }}
        transition={isMobile
          ? { type: 'spring', damping: 30, stiffness: 250 }
          : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}><X size={20} /></button>

        <div className={styles.grid}>
          <div className={styles.gallery}>
            <div className={styles.mainImg}>
              <img src={product.gallery?.[imgIndex] ?? product.image} alt={product.name} />
              {product.gallery?.length > 1 && (
                <>
                  <button className={`${styles.imgNav} ${styles.prev}`}
                    onClick={() => setImgIndex(i => (i - 1 + product.gallery.length) % product.gallery.length)}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className={`${styles.imgNav} ${styles.next}`}
                    onClick={() => setImgIndex(i => (i + 1) % product.gallery.length)}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <div className={styles.thumbs}>
              {product.gallery?.map((src, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === imgIndex ? styles.thumbActive : ''}`}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.topInfo}>
              <span className={styles.brand}>{product.brand}</span>
              <span className={styles.tag} style={{ background: product.tagColor }}>{product.tag}</span>
            </div>

            <h2 className={styles.name}>{product.name}</h2>

            <div className={styles.ratingRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#ff4d00' : 'none'} color="#ff4d00" />
              ))}
              <span className={styles.ratingNum}>{product.rating}</span>
              <span className={styles.reviewsCount}>({product.reviews} avaliações)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>R$ {product.price.toLocaleString('pt-BR')}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.original}>R$ {product.originalPrice.toLocaleString('pt-BR')}</span>
                  <span className={styles.discountBadge}>-{discount}%</span>
                </>
              )}
            </div>

            <p className={styles.desc}>{product.description}</p>

            <div className={styles.colorSection}>
              <span className={styles.sectionLabel}>Cores disponíveis</span>
              <div className={styles.colors}>
                {product.colors.map((c, i) => (
                  <span key={i} className={styles.colorDot} style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className={styles.sizeSection}>
              <span className={styles.sectionLabel}>
                Tamanho {selectedSize && <strong>· {selectedSize} BR</strong>}
              </span>
              <div className={styles.sizes}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeActive : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!selectedSize && <span className={styles.sizeHint}>Selecione um tamanho para continuar</span>}
            </div>

            <div className={styles.actions}>
              <motion.button
                className={`${styles.addBtn} ${!selectedSize ? styles.addDisabled : ''} ${added ? styles.addAdded : ''}`}
                onClick={handleAdd}
                whileTap={selectedSize ? { scale: 0.97 } : {}}
              >
                {added ? <><Check size={18} /> Adicionado!</> : <><ShoppingBag size={18} /> Adicionar ao Carrinho</>}
              </motion.button>
              <button
                className={`${styles.wishBtn} ${liked ? styles.wishLiked : ''}`}
                onClick={() => setLiked(v => !v)}
              >
                <Heart size={20} fill={liked ? '#ff4d00' : 'none'} />
              </button>
            </div>

            <div className={styles.perks}>
              {['Frete grátis acima de R$500', 'Troca em até 30 dias', 'Produto 100% original'].map(p => (
                <div key={p} className={styles.perk}>
                  <Check size={14} color="#ff4d00" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
