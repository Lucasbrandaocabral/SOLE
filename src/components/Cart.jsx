import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './Cart.module.css'

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, count, isOpen, setIsOpen } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className={styles.cart}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          >
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>Carrinho</h2>
                <span className={styles.count}>{count} {count === 1 ? 'item' : 'itens'}</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.items}>
              {cart.length === 0 ? (
                <div className={styles.empty}>
                  <ShoppingBag size={48} color="var(--border)" />
                  <p>Seu carrinho está vazio</p>
                  <button className={styles.shopBtn} onClick={() => setIsOpen(false)}>
                    Explorar produtos
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    className={styles.item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.itemImg}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemTop}>
                        <div>
                          <span className={styles.itemBrand}>{item.brand}</span>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <span className={styles.itemSize}>Tam. {item.size}</span>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className={styles.itemBottom}>
                        <div className={styles.qtyCtrl}>
                          <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}>
                            <Minus size={12} />
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className={styles.itemPrice}>
                          R$ {(item.price * item.qty).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <span>R$ {total.toLocaleString('pt-BR')}</span>
                </div>
                <div className={styles.shipping}>
                  <span>Frete</span>
                  <span className={total >= 500 ? styles.free : ''}>
                    {total >= 500 ? 'Grátis' : `R$ ${(29.90).toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className={styles.divider} />
                <div className={styles.total}>
                  <span>Total</span>
                  <span>R$ {(total >= 500 ? total : total + 29.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  Finalizar Compra <ArrowRight size={18} />
                </button>
                {total < 500 && (
                  <p className={styles.freeShipHint}>
                    Faltam R$ {(500 - total).toLocaleString('pt-BR')} para frete grátis
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
