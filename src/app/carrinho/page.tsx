'use client';

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { lerCarrinho, Produto } from "@/utils/carrinho";

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<Produto[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cupom, setCupom] = useState("");

  useEffect(() => {
    const itensSalvos = lerCarrinho();
    setCartItems(itensSalvos);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.price * (item.quantidade || 1);
    }, 0);
    setSubtotal(total);
    
    if (cartItems.length > 0) {
      localStorage.setItem('dchoco_carrinho', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleRemoveItem = (id: string) => {
    const novosItens = cartItems.filter((item) => item.id !== id);
    setCartItems(novosItens);
    localStorage.setItem('dchoco_carrinho', JSON.stringify(novosItens));
    window.dispatchEvent(new Event("storage")); 
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const novosItens = cartItems.map((item) => {
      if (item.id === id) {
        const novaQtd = (item.quantidade || 1) + delta;
        return { ...item, quantidade: novaQtd > 0 ? novaQtd : 1 };
      }
      return item;
    });
    setCartItems(novosItens);
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
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
        {/* HEADER */}
        <section id="header" className="cor-session">
          <div className="container">
            <header>
              <h1>
                <Link href="/" className="logo-d-choco">
                  <img src="/images/logo-d-choco.png" alt="D'Choco" />
                </Link>
              </h1>
              <p className="header-tagline">
                <strong>quem prova, nunca esquece.</strong>
              </p>
            </header>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section id="main" className="cor-session">
          <div className="container-carrinho">
            <div className="row">
              <div className="col-12">
                <section>
                  <header>
                    <h2 className="cart-title">
                      <i className="fa-solid fa-shopping-cart"></i> <strong>Seu Carrinho</strong>
                    </h2>
                  </header>

                  {/* CARRINHO VAZIO */}
                  {cartItems.length === 0 ? (
                    <div className="box empty-cart">
                      <i className="fa-solid fa-shopping-cart empty-cart-icon"></i>
                      <h3>Seu carrinho está vazio</h3>
                      <p className="empty-cart-text">Adicione produtos deliciosos para começar seu pedido!</p>
                      <Link href="/catalogo" className="button">
                        <i className="fa-solid fa-store"></i> Ir para o Catálogo
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* TABELA DE PRODUTOS */}
                      <div className="table-wrapper">
                        <table className="cart-table">
                          <thead>
                            <tr>
                              <th>Produto</th>
                              <th>Preço</th>
                              <th>Quantidade</th>
                              <th>Subtotal</th>
                              <th></th>
                            </tr>
                          </thead>
                          
                          <tbody id="cart-items">
                            
                            {cartItems.map((item) => (
                              <tr key={item.id} className="cart-item">
                                <td className="product-info" data-label="Produto">
                                  <img src={item.image} alt={item.name} className="product-image" />
                                  <h3><a href="#">{item.name}</a></h3>
                                </td>
                                <td data-label="Preço">{formatMoney(item.price)}</td>
                                <td data-label="Quantidade">
                                  <div className="quantity-wrapper">
                                    <button 
                                      className="quantity-btn"
                                      onClick={() => handleQuantityChange(item.id, -1)}
                                      aria-label="Diminuir quantidade"
                                    >-</button>
                                    <input 
                                      type="number" 
                                      className="quantity-input" 
                                      value={item.quantidade || 1}
                                      readOnly
                                    />
                                    <button 
                                      className="quantity-btn"
                                      onClick={() => handleQuantityChange(item.id, 1)}
                                      aria-label="Aumentar quantidade"
                                    >+</button>
                                  </div>
                                </td>
                                <td className="subtotal" data-label="Subtotal">
                                  {formatMoney(item.price * (item.quantidade || 1))}
                                </td>
                                <td>
                                  <button 
                                    className="remove-item"
                                    onClick={() => handleRemoveItem(item.id)}
                                    aria-label="Remover item"
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
<br/>
<br/>
                      {/* RESUMO DO PEDIDO */}
                      <section className="box cor-session">
                        <header>
                          <h2><strong>Resumo do Pedido</strong></h2>
                        </header>

                        <div className="order-summary">
                          <div className="summary-row">
                            <span><strong>Subtotal:</strong></span>
                            <span id="cart-subtotal">{formatMoney(subtotal)}</span>
                          </div>
                          <div className="summary-row discount-row">
                            <span><strong>Desconto:</strong></span>
                            <span id="discount-amount">R$ 0,00</span>
                          </div>
                          <hr />
                          <div className="summary-row summary-total">
                            <strong>Total:</strong>
                            <strong id="cart-total">{formatMoney(subtotal)}</strong>
                          </div>
                        </div>

                        <div className="controle-desconto">
                          <form className="coupon-form" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="coupon-code">
                              <i className="fa-solid fa-ticket"></i> Cupom de Desconto:
                            </label>
                            <div className="row gtr-50">
                              <div className="col-8 col-12-small">
                                <input 
                                  type="text" 
                                  id="coupon-code" 
                                  placeholder="Digite o cupom"
                                  value={cupom}
                                  onChange={(e) => setCupom(e.target.value)}
                                />
                              </div>
                              <div className="col-4 col-12-small">
                                <button type="submit" className="button btn-apply-coupon">
                                  Aplicar
                                </button>
                              </div>
                            </div>
                          </form>

                          <br />

                          <div className="row gtr-50">
                            <div className="col-6 col-12-small">
                              <Link href="/catalogo" className="button alt btn-continue">
                                <i className="fa-solid fa-arrow-left"></i> Continuar Comprando
                              </Link>
                            </div>
                            <div className="col-6 col-12-small">
                              <Link href="/checkout" className="button btn-checkout">
                                <i className="fa-solid fa-check"></i> Finalizar Compra
                              </Link>
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* BANNER FOOTER */}
        <section id="banner">
          <div className="container">
            <p>feito de forma artesanal <strong>em cada detalhe</strong>.<br />pensando em você.</p>
          </div>
        </section>
      </div>
    </>
  );
}