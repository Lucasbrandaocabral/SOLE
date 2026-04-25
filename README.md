# SOLE — Sneaker Store

> Uma loja de tênis com identidade visual forte, animações fluidas e experiência de compra pensada em cada detalhe.

---

## Visão Geral

SOLE é um e-commerce de sneakers construído com foco em experiência do usuário. Do cursor customizado ao carrinho animado, cada interação foi projetada para transmitir modernidade e estilo.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 19** | Componentização, hooks e gerenciamento de estado |
| **Vite** | Build ultrarrápido e servidor de desenvolvimento |
| **Framer Motion** | Animações de entrada, transições e scroll progress |
| **Lucide React** | Ícones leves e consistentes |
| **CSS Modules** | Estilização escopada por componente |
| **Context API** | Estado global do carrinho |

---

## Funcionalidades

- Catálogo de produtos com **busca em tempo real**
- **Modal de produto** com galeria, seleção de cor e tamanho
- **Carrinho lateral** animado com cálculo de total
- Tema **dark / light** persistido no navegador
- **Cursor customizado** para identidade visual única
- **Barra de progresso** de scroll sincronizada com a página
- Banner de destaque e marquee animado

---

## Estrutura

```
src/
├── components/   Navbar, Hero, ProductCard, ProductGrid,
│                 ProductModal, Cart, Footer, Cursor,
│                 Marquee, FeaturedBanner
├── context/      CartContext
├── data/         products.js
├── App.jsx
└── index.css
```
