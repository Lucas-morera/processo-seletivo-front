import React, { useState } from 'react';

import './scss/App.scss';
import getProdutos from "./services/productService.ts";
import { useEffect } from 'react';

// Interface para os dados do produto (padrão em testes TypeScript)
interface Product {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
}

export default function App() {
  const [contagem, setContagem] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [produtos, setProdutos] = useState([]);

  function contModalProduto() {
    setContagem(contagem + 1);
  }
  function subModalProduto() {
    setContagem(contagem - 1);
  }

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const data = await getProdutos();
        setProdutos(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    buscarProdutos();
  }, []);


  // Exemplo de produto simulado para o teste
  const mockProduct: Product = {
    productName: "Iphone 11 128GB Branco",
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo: "https://app.econverse.com.br/teste-front-end/junior/tecnologia/fotos-produtos/foto-iphone.png",
    price: 3000,
  };

  const categories = [
    { name: 'Tecnologia', icon: '/img/laptop.png', active: false },
    { name: 'Supermercado', icon: '/img/market.png', active: false },
    { name: 'Bebidas', icon: '/img/bebida.png', active: false },
    { name: 'Ferramentas', icon: '/img/ferramenta.png', active: false },
    { name: 'Saúde', icon: '/img/cuidado.png', active: false },
    { name: 'Esportes e Fitness', icon: '/img/esporte.png', active: false },
    { name: 'Moda', icon: '/img/moda.png', active: false },
  ];

  // Componente reutilizável para a prateleira de produtos.

  const ProductShelf = ({ showTabs }: { showTabs: boolean }) => (
    <section className="shelf-section container">
      <div className="shelf-title">
        <h2>Produtos relacionados</h2>
        {!showTabs && <a href="#" className="ver-todos-link">Ver todos</a>}
      </div>

      {showTabs && (
        <ul className="shelf-tabs">
          <li className="active">CELULAR</li>
          <li>ACESSÓRIOS</li>
          <li>TABLETS</li>
          <li>NOTEBOOKS</li>
          <li>TVS</li>
          <li>VER TODOS</li>
        </ul>
      )}

      <div className="product-grid">
        {produtos.map((produto, index) => (
          <div key={index} className="product-card">
            <img src={produto.photo} alt={produto.productName} />
            <p className="product-name">{produto.productName}</p>
            {/* Exemplo se quiser usar o preço real da API */}
            <p className="old-price">R$ {(produto.price * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p className="current-price">R$ {produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p className="installments">ou 2x de R$ {(produto.price / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros</p>
            <p className="free-shipping">Frete grátis</p>
            <button
              className="btn-buy"
              onClick={() => { setSelectedProduct(produto); setContagem(0); }}
            >
              COMPRAR
            </button>
          </div>
        ))}
      </div>

    </section>
  );

  // Componente reutilizável para o bloco de 2 cards de parceiros
  const PartnersSection = () => (
    <section className="partner-section container">
      <div className="partner-card">
        <h3>Parceiros</h3>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <button className="btn-yellow">CONFIRA</button>
      </div>
      <div className="partner-card">
        <h3>Parceiros</h3>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <button className="btn-yellow">CONFIRA</button>
      </div>
    </section>
  );

  return (
    <div className="page-wrapper">

      <header className="header">
        <div className="top-bar">
          <div className="container top-bar-inner">
            <span>Compra <strong>100% segura</strong></span>
            <span>Frete grátis <span className="highlight">acima de R$ 200</span></span>
            <span><strong>Parcele</strong> suas compras</span>
          </div>
        </div>

        <div className="container main-header">
          <div className="logo">
            <span className="e"><img src="/img/Logo.png" alt="" /></span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="O que você está buscando?" />
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 21L16.65 16.65" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <div className="header-icons">
            <button title="Pedidos">📦</button>
            <button title="Favoritos">♡</button>
            <button title="Minha Conta">◎</button>
            <button title="Carrinho">🛒</button>
          </div>
        </div>

        <nav className="nav-menu">
          <div className="container">
            <ul>
              <li>TODAS CATEGORIAS</li>
              <li>SUPERMERCADO</li>
              <li>LIVROS</li>
              <li>MODA</li>
              <li>LANÇAMENTOS</li>
              <li className="active">OFERTAS DO DIA</li>
              <li>ASSINATURA</li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        {/* Main */}
        <section className="hero-banner">
          <div className="container hero-content">
            <div className="hero-overlay">
              <h1>Venha conhecer nossas promoções</h1>
              <h2><b>50% Off</b> nos produtos</h2>
              <button className="btn-yellow">Ver produto</button>
            </div>
          </div>
        </section>

        {/* 3. CATEGORIAS COM ÍCONES */}
        <section className="category-icons-container container">
          {categories.map((cat, idx) => (
            <div key={idx} className={`category-card ${cat.active ? 'active' : ''}`}>
              <div className="icon-box">
                <img src={cat.icon} alt={cat.name} />
              </div>
              <span>{cat.name}</span>
            </div>
          ))}
        </section>

        {/* 4. BLOCO 1 - VITRINE DE PRODUTOS (com abas de categoria) */}
        <ProductShelf showTabs={true} />

        {/* 5. BLOCO 1 - BANNERS PARCEIROS */}
        <PartnersSection />

        {/* 6. BLOCO 2 - VITRINE DE PRODUTOS (só "Ver todos") */}
        <ProductShelf showTabs={false} />

        {/* 7. BLOCO 2 - BANNERS PARCEIROS */}
        <PartnersSection />



        {/* 8. MARCAS */}
        <section className="brands-section container">
          <h2>Navegue por marcas</h2>
          <div className="brands-grid">
            {[1, 2, 3, 4, 5].map((b) => (
              <div key={b} className="brand-circle">
                <span className="logo-text"><span className="e"> <img src="/img/Logo.png" alt="" /> </span> </span>
              </div>
            ))}
          </div>
        </section>


        {/* 9. BLOCO 3 - VITRINE DE PRODUTOS (só "Ver todos") */}
        <ProductShelf showTabs={false} />
      </main>

      {/* 10. NEWSLETTER & FOOTER */}
      <footer className="footer">
        <div className="newsletter-bar">
          <div className="newsletter-text">
            <h3>INSCREVA-SE NA NOSSA NEWSLETTER</h3>
            <p>Assine nossa newsletter e receba as novidades e conteúdos exclusivos da nossa loja.</p>
          </div>

          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Digite seu nome" />
            <input type="email" placeholder="Digite seu e-mail" />
            <button type="submit" className="btn-yellow">INSCREVER</button>
            <div className="termo">
              <input type="checkbox" id="termos" name="option1" value="yes" />
              <label htmlFor="termos">Aceito os termos e condições</label>
            </div>
          </form>
        </div>

        <div className="footer-main container">
          <div className="footer-brand">
            <div className="logo"><span className="e"></span> <img src="/img/Logo.png" alt="" /> </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="footer-social">
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 11.3701C16.1234 12.2023 15.9812 13.0523 15.5937 13.7991C15.2062 14.5459 14.5931 15.1515 13.8416 15.5297C13.0901 15.908 12.2384 16.0397 11.4077 15.906C10.5771 15.7723 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22768 13.4229 8.09402 12.5923C7.96035 11.7616 8.09202 10.91 8.47028 10.1584C8.84854 9.40691 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.87665 12.63 8.00006C13.4789 8.12594 14.2648 8.52152 14.8716 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 6.5H17.51" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 9H2V21H6V9Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Institucional</h4>
            <ul><li>Sobre Nós</li><li>Movimento</li><li>Trabalhe conosco</li></ul>
          </div>
          <div className="footer-col">
            <h4>Ajuda</h4>
            <ul><li>Suporte</li><li>Fale Conosco</li><li>Perguntas Frequentes</li></ul>
          </div>
          <div className="footer-col">
            <h4>Termos</h4>
            <ul><li>Termos e Condições</li><li>Política de Privacidade</li><li>Troca e Devolução</li></ul>
          </div>
        </div>
        <div className="footer-bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </footer>

      {/* 11. MODAL DE PRODUTO (REQUISITO DA ECONVERSE) */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-body">
              <img src={selectedProduct.photo} alt={selectedProduct.productName} />
              <div className="modal-info">
                <h3>{selectedProduct.productName}</h3>
                <p className="modal-price">R$ {selectedProduct.price.toLocaleString('pt-BR')},00</p>
                <p className="modal-desc">{selectedProduct.descriptionShort}</p>

                {/* Aqui está o link sem sublinhado */}
                <a href="#" className="modal-link">Veja mais detalhes do produto &gt;</a>

                <div className="modal-qty">
                  <button onClick={subModalProduto}>-</button>
                  <span>{contagem}</span>
                  <button onClick={contModalProduto}>+</button>
                </div>
                <button className="btn-yellow btn-full">COMPRAR</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}