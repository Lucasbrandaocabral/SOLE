import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
})

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()

  const bgY = useTransform(scrollY, [0, 900], [0, 250])
  const contentY = useTransform(scrollY, [0, 700], [0, -60])
  const rawOpacity = useTransform(scrollY, [0, 550], [1, 0])
  const contentOpacity = useSpring(rawOpacity, { damping: 30, stiffness: 100 })

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.bg}>
        <motion.img
          src="https://imgnike-a.akamaihd.net/1920x1920/022147IKA9.jpg"
          alt=""
          className={styles.bgImg}
          style={{ y: bgY }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 14, ease: 'easeOut' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.grain} />

      <motion.div
        className={styles.content}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.span className={styles.eyebrow} {...fadeUp(0.2)}>
          Nova Coleção · 2025
        </motion.span>

        <motion.h1 className={styles.title} {...fadeUp(0.35)}>
          Defina seu<br />
          <span>estilo.</span>
        </motion.h1>

        <motion.p className={styles.sub} {...fadeUp(0.5)}>
          Sneakers premium para quem não abre<br />mão de performance e identidade.
        </motion.p>

        <motion.div className={styles.ctas} {...fadeUp(0.65)}>
          <a href="#products" className={styles.btnPrimary}>
            Ver Coleção
          </a>
          <a href="#featured" className={styles.btnSecondary}>
            Destaques
          </a>
        </motion.div>

        <motion.div className={styles.stats} {...fadeUp(0.8)}>
          {[['200+', 'Modelos'], ['50+', 'Marcas'], ['10K+', 'Clientes']].map(([n, l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </motion.div>
    </section>
  )
}
