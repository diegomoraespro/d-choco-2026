'use client';

import React from 'react';
import Link from 'next/link';

export default function ContratePage() {
  
  const cartCount = 0; 

  const handleCheckout = () => {
    const message = "Olá! Gostaria de saber mais sobre os serviços da D'Choco.";
    const telefone = "5521994864107"; 
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div id="page-wrapper" className="homepage is-preload">
      
      {/* Header */}
      <section id="header">
        {/* Ícone do Carrinho */}
        <Link className="carrinho-flutuante" href="/carrinho" title="Ir para o carrinho">
            <i className="fa-solid fa-shopping-cart"></i>
            <span className="carrinho-badge">{cartCount}</span>
        </Link>
        
        <div className="container">
            {/* Logo */}
            <h1 className="logo-d-choco">
                <Link href="/">
                    <img src="/images/logo-d-choco.png" alt="Logo D'Choco" />
                </Link>
            </h1>
            <p><strong>quem prova, nunca esquece.</strong></p>
        </div>
      </section>

      {/* Main */}
      <section id="main">
        <div className="container">
            <div className="row">
            
                <div className="col-12">
                    {/* Highlights */}
                    <section>
                        <article className="box highlight">
                            <header>
                                <h2><strong><a href="#">Entenda como funciona nossos serviços</a></strong></h2>
                            </header>
                            
                            
                            <a href="#" className="image-contrato left">
                                <img src="/images/diego.jpeg" alt="Diego D'Choco" />
                            </a>
                            
                            <p>
                                Este é um bloco de texto que irá se envolver ao redor da imagem. 
                                O uso da propriedade &apos;float&apos; é a maneira clássica de conseguir este efeito 
                                de layout. Ao aplicar &apos;float: left;&apos; na imagem, ela se move para a esquerda 
                                e o texto (que é um elemento em bloco, o parágrafo neste caso) flui 
                                ao seu lado, preenchendo o espaço restante. Você pode ajustar a margem 
                                da imagem para criar um pequeno espaçamento entre a imagem e o texto.
                                Vamos adicionar mais texto para garantir que o efeito seja visível. 
                                É importante notar que o texto só envolverá a imagem se houver espaço 
                                suficiente. Se o texto for curto, ele apenas aparecerá ao lado da imagem.
                                O CSS nos dá controle total sobre como esse wrapping acontece.
                                Adicionar
                                mais algumas linhas de texto garante que a imagem fique completamente envolvida.
                            </p>
                            <div className="col-12">
                              <button 
                                onClick={handleCheckout} 
                                className="button"
                                style={{width: '100%', background: '#25D366', borderColor: '#25D366'}}
                              >
                                <i className="fa-brands fa-whatsapp"></i> Falar no WhatsApp
                              </button>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </div>
      </section>

      {/* Banner Footer */}
      <div>
        <section id="banner">
            <div className="container">
                <p>
                    feito de forma artesanal <strong>em cada detalhe</strong>.<br />
                    pensando em você.
                </p>
            </div>
        </section>
      </div>

    </div>
  );
}