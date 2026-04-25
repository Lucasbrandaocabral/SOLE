import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Cursor.module.css'

export default function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const dotX = useSpring(mx, { damping: 50, stiffness: 1500 })
  const dotY = useSpring(my, { damping: 50, stiffness: 1500 })
  const ringX = useSpring(mx, { damping: 20, stiffness: 150 })
  const ringY = useSpring(my, { damping: 20, stiffness: 150 })

  useEffect(() => {
    const track = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', track)
    return () => window.removeEventListener('mousemove', track)
  }, [mx, my])

  return (
    <>
      <motion.div className={styles.dot} style={{ x: dotX, y: dotY }} />
      <motion.div className={styles.ring} style={{ x: ringX, y: ringY }} />
    </>
  )
}
