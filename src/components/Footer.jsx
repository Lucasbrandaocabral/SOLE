import styles from './Footer.module.css'
import { Globe, Send, Play } from 'lucide-react'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>SOLE<span>.</span></span>
          <p>Premium sneakers para quem<br />define seu próprio estilo.</p>
          <div className={styles.socials}>
            <a href="#"><Globe size={18} /></a>
            <a href="#"><Send size={18} /></a>
            <a href="#"><Play size={18} /></a>
          </div>
        </div>

        {[
          { title: 'Loja', links: ['Novidades', 'Coleções', 'Promoções', 'Brands'] },
          { title: 'Suporte', links: ['FAQ', 'Troca e Devolução', 'Rastreio', 'Contato'] },
          { title: 'Empresa', links: ['Sobre nós', 'Carreiras', 'Blog', 'Imprensa'] },
        ].map(col => (
          <div key={col.title} className={styles.col}>
            <h4>{col.title}</h4>
            {col.links.map(l => <a key={l} href="#">{l}</a>)}
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>© 2025 SOLE. Todos os direitos reservados.</span>
        <div className={styles.policies}>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
