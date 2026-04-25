import { motion } from 'framer-motion'
import styles from './FeaturedBanner.module.css'

export default function FeaturedBanner() {
  return (
    <section id="featured" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          style={{ backgroundImage: 'url(https://imgnike-a.akamaihd.net/1920x1920/022147NYA9.jpg)' }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <span className={styles.eyebrow}>LIMITED DROP</span>
            <h3>Tênis Nike Air Max Plus Masculino<br />Exclusivo 2025</h3>
            <a href="#products" className={styles.link}>Shop Now →</a>
          </div>
        </motion.div>

        <div className={styles.stack}>
          <motion.div
            className={`${styles.card} ${styles.cardSm}`}
            style={{ backgroundImage: 'url(https://imgnike-a.akamaihd.net/360x360/058467IEA1.jpg)' }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className={styles.overlay} />
            <div className={styles.cardContent}>
              <span className={styles.eyebrow}>RARO</span>
              <h3>Nike Air Max 95 Big Bubble</h3>
              <a href="#products" className={styles.link}>Ver →</a>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} ${styles.cardSm}`}
            style={{ backgroundImage: 'url(https://imgnike-a.akamaihd.net/360x360/105746IKA3.jpg)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.overlay} />
            <div className={styles.cardContent}>
              <span className={styles.eyebrow}>NOVO</span>
              <h3>Nike Shox R4</h3>
              <a href="#products" className={styles.link}>Ver →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
