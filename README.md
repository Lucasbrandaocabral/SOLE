# SOLE — E-commerce de Sneakers

Loja virtual de tênis com experiência de compra moderna, animações fluidas e carrinho interativo.

## Tecnologias

- **React 19** — componentização e gerenciamento de estado com hooks (`useState`, `useEffect`, `useContext`)
- **Vite** — bundler e servidor de desenvolvimento
- **Framer Motion** — animações de entrada, scroll progress bar, transições de modal e carrinho
- **Lucide React** — ícones
- **CSS Modules** — estilização escopada por componente
- **Context API** — gerenciamento global do carrinho via `CartContext`

## Funcionalidades

- Catálogo de produtos com busca em tempo real
- Modal de produto com galeria de imagens, seleção de cor e tamanho
- Carrinho lateral com adição, remoção e cálculo de total
- Tema dark/light persistido no `localStorage`
- Cursor customizado
- Marquee animado
- Banner de destaque com produto em evidência
- Barra de progresso de scroll

## Estrutura

```
src/
├── components/      # Navbar, Hero, ProductCard, ProductGrid, ProductModal, Cart, Footer, Cursor, Marquee, FeaturedBanner
├── context/         # CartContext
├── data/            # products.js
├── App.jsx
└── index.css
```

## Como rodar

```bash
npm install
npm run dev
```
