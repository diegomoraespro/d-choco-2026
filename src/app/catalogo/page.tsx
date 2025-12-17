'use client';

import React, { useState, useEffect } from 'react';
import Script from "next/script";
import Link from 'next/link';
import { adicionarAoCarrinho, lerCarrinho, Produto } from '@/utils/carrinho';

const products: Produto[] = [
  {
    id: "1",
    name: "Mousse de Chocolate",
    price: 14.90,
    image: "/images/mousse-chocolate.jpeg",
    description: "Delicioso mousse aerado com chocolate 50%."
  },
  {
    id: "2",
    name: "Love Cookie",
    price: 14.90,
    image: "/images/love-cookie.jpg",
    description: "Cookie crocante por fora e macio por dentro."
  },
  {
    id: "3",
    name: "Manjar de whey",
    price: 169.90,
    image: "/images/manjar-whey.jpg",
    description: "Opção fitness rica em proteínas."
  },
  {
    id: "4",
    name: "Pavê de Limão",
    price: 14.90,
    image: "/images/pave-limao.jpg",
    description: "Sobremesa refrescante com creme de limão."
  },
  {
    id: "5",
    name: "Pavê de Maracujá",
    price: 14.90,
    image: "/images/pave-maracuja.jpg",
    description: "Doce e azedinho na medida certa."
  },
  {
    id: "6",
    name: "Brigadeiro de Batata Doce",
    price: 14.90,
    image: "/images/brigadeiro-batata-doce.jpg",
    description: "Saboroso e mais saudável."
  },
];

export default function CatalogoPage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const itens = lerCarrinho();
    const total = itens.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    setCartCount(total);
  }, []);

  const handleAddToCart = (product: Produto) => {
    adicionarAoCarrinho(product);
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Script
        id="firebase-importmap"
        type="importmap"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            imports: {
              "firebase/app": "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js",
              "firebase/auth": "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js",
              "firebase/firestore": "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js",
            },
          }),
        }}
      />

      <div id="page-wrapper">
        <section id="header">
          <Link className="carrinho-flutuante" href="/carrinho" title="Ir para o carrinho">
            <i className="fa-solid fa-shopping-cart" />
            <span className="carrinho-badge">{cartCount}</span>
          </Link>

          <div className="container">
            <h1 className="logo-d-choco">
              <Link href="/">
                <img src="/images/logo-d-choco.png" alt="D'Choco" />
              </Link>
            </h1>
            <p>
              <strong>quem prova, nunca esquece.</strong>
            </p>
          </div>
        </section>

        <section id="main">
          <div className="container">
            <div id="content">
              <article className="box post">
                <header>
                  <h2>
                    <strong>Produtos</strong>
                  </h2>
                </header>
              </article>

              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-4 col-6-medium col-12-small texto-centralizado">
                    <section>
                      <Link href={`/detalhe?id=${product.id}`} className="image featured">
                        <img src={product.image} alt={product.name} />
                      </Link>

                      <header>
                        <h3>{product.name}</h3>
                        <h2>
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(product.price)}
                        </h2>
                      </header>

                      <div className="espaco-botao">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="form-button-submit-catalogo button fa-solid add-to-cart-btn"
                        >
                          Adicionar
                        </button>

                        <Link
                          href={`/detalhe?id=${product.id}`}
                          className="form-button-submit-catalogo button fa-solid"
                        >
                          detalhe
                        </Link>
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}