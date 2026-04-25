import styles from './Marquee.module.css'

const items = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Yeezy', 'Puma', 'Salomon', 'Asics', 'Vans', 'Converse', 'On Running', 'Hoka']

export default function Marquee() {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
