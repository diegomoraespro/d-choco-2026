'use client';

import React, { useState, useEffect } from 'react'; // Adicionei useEffect
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; // Adicionei useRouter
import { adicionarAoCarrinho, Produto, lerCarrinho } from '../../utils/carrinho'; 

// --- DADOS ---
const products: Produto[] = [
  { 
    id: '1', 
    name: 'Mousse de Chocolate', 
    price: 14.90, 
    image: '/images/mousse-chocolate.jpeg',
    description: 'Um mousse aerado, feito com chocolate nobre 50% cacau e um toque de amor. A sobremesa perfeita para qualquer hora.'
  },
  // Adicione os outros produtos aqui...
];

export default function DetalheProdutoPage() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Hook para navegação
  const productId = searchParams.get('id');
  
  // Encontra o produto na lista baseado no ID
  const product = products.find((p) => p.id === productId);

  // Estado para mostrar o numerozinho no carrinho (Visual apenas)
  const [cartCount, setCartCount] = useState(0);

  // Efeito para ler a quantidade atual do carrinho ao abrir a página
  useEffect(() => {
    const itens = lerCarrinho();
    // Soma a quantidade total de itens
    const total = itens.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    setCartCount(total);
  }, []);

  // --- FUNÇÃO CORRIGIDA: ADICIONAR ---
  const handleAddToCart = () => {
    if (!product) return;

    // 1. Chama a função real que salva no localStorage
    adicionarAoCarrinho(product);
    
    // 2. Atualiza o numerozinho visualmente (+1)
    setCartCount((prev) => prev + 1);
  };

  // --- FUNÇÃO CORRIGIDA: COMPRAR AGORA ---
  const handleBuyNow = () => {
    if (!product) return;

    // 1. Adiciona primeiro
    adicionarAoCarrinho(product);

    // 2. Redireciona para o carrinho usando Next.js
    router.push('/carrinho');
  };

  // Se não achar o produto
  if (!product) {
    return (
      <div id="page-wrapper" className="texto-centralizado">
        <br /><br />
        <h2>Produto não encontrado 😕</h2>
        <Link href="/" className="button">Voltar ao Catálogo</Link>
      </div>
    );
  }

  return (
    <div id="page-wrapper" className="no-sidebar is-preload">
      
      {/* Header */}
      <section id="header" className="cor-session">
        {/* Agora o link leva para a pasta carrinho */}
        <Link className="carrinho-flutuante" href="/carrinho" title="Ir para o carrinho">
            <i className="fa-solid fa-shopping-cart"></i>
            <span className="carrinho-badge">{cartCount}</span>
        </Link>
        <div className="container">
            <h1 id="logo">
                <Link href="/" className="logo-d-choco">
                    <img src="/images/logo-d-choco.png" alt="Logo D'Choco" />
                </Link>
            </h1>
            <p>quem prova, nunca esquece.</p>
        </div>
      </section>

      {/* Main */}
      <section id="main" className="cor-session">
        <div className="container">
            <div id="content">

                {/* Post */}
                <article className="box post">
                    <div className="row">
                        
                        {/* Imagem */}
                        <div className="col-6 col-12-medium texto-centralizado">
                            
                            <div className="image-prod featured ">
                                <img src={product.image} alt={product.name} />
                            </div>
                        </div>
                        
                        {/* Informações */}
                        <div className="col-6 col-12-medium">
                                <br/><br/><br/>
                          <h2><strong>{product.name}</strong></h2>
                            <section>
                          
                        
                                <h1>Descrição do Produto</h1>
                                <p>{product.description}</p>
                                
                                <header>
                                    <h2>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                    </h2>
                                </header>
                                
                                <div className="espaco-botao">
                                    <button 
                                        onClick={handleAddToCart}
                                        className="form-button-submit-catalogo button fa-solid add-to-cart-btn"
                                        style={{cursor: 'pointer'}}
                                    >
                                        Adicionar
                                    </button>
                                    
                                    <button 
                                        onClick={handleBuyNow}
                                        className="form-button-submit-catalogo button fa-solid buy-now-btn"
                                        style={{cursor: 'pointer', marginLeft: '10px'}}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </article>
            </div>
        </div>
      </section>
      <section id="banner">
          <div className="container">
            <p>
              feito de forma artesanal <strong>em cada detalhe</strong>.
              <br />
              pensando em você.
            </p>
          </div>
        </section>
    </div>
    
  );
  
}