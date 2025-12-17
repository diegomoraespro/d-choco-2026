"use client";

import Link from "next/link";
import { useCarrinho } from "@/context/CarrinhoContext";

export default function CarrinhoPage() {
  // 1. Buscando os dados do Contexto (tudo em Português agora)
  const { 
    itens, 
    removerItem, 
    atualizarQuantidade, 
    valorTotal 
  } = useCarrinho();

  // 2. Função local para formatar dinheiro (R$)
  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div id="page-wrapper">
      <section id="cart" className="container" style={{ padding: "50px 0" }}>
        
        <header>
          <h2>Seu Carrinho</h2>
        </header>

        <div className="table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Qtd</th>
                <th>Subtotal</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {/* CASO 1: CARRINHO VAZIO */}
              {itens.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>
                    <p>Seu carrinho está vazio.</p>
                    <br />
                    <Link href="/catalogo" className="button">
                      Ir para o Catálogo
                    </Link>
                  </td>
                </tr>
              )}

              {/* CASO 2: LISTA DE PRODUTOS */}
              {itens.map((item) => (
                <tr key={item.id} className="cart-item">
                  
                  {/* Imagem e Nome */}
                  <td className="product-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img
                        src={item.image || "/assets/images/logo-d-choco.png"}
                        alt={item.name}
                        className="product-image"
                        style={{ width: '60px', borderRadius: '8px' }}
                      />
                      <div>
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                  </td>

                  {/* Preço Unitário */}
                  <td className="price">{formatarPreco(item.price)}</td>

                  {/* Controle de Quantidade */}
                  <td>
                    <div className="quantity-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <button
                        type="button"
                        className="button small alt"
                        onClick={() => atualizarQuantidade(item.id, item.quantity - 1)}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        readOnly
                        style={{ width: '50px', textAlign: 'center', margin: '0' }}
                      />

                      <button
                        type="button"
                        className="button small alt"
                        onClick={() => atualizarQuantidade(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Subtotal do Item */}
                  <td className="subtotal">
                    {formatarPreco(item.price * item.quantity)}
                  </td>

                  {/* Botão Excluir */}
                  <td>
                    <button
                      className="button small"
                      style={{ backgroundColor: '#ff4444', color: 'white', borderColor: '#ff4444' }}
                      onClick={() => removerItem(item.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RESUMO DO PEDIDO (Só aparece se tiver itens) */}
        {itens.length > 0 && (
          <div className="order-summary" style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
            <div className="box" style={{ maxWidth: "400px", width: "100%" }}>
              
              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span><strong>Subtotal:</strong></span>
                <span>{formatarPreco(valorTotal)}</span>
              </div>

              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span><strong>Desconto:</strong></span>
                <span>{formatarPreco(0)}</span>
              </div>

              <hr />

              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2em", marginTop: "15px" }}>
                <strong>Total:</strong>
                <strong>{formatarPreco(valorTotal)}</strong>
              </div>

              <div className="checkout-buttons" style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button className="button primary fit">
                  Finalizar Compra
                </button>
                <Link href="/catalogo" className="button fit">
                  Continuar Comprando
                </Link>
              </div>

            </div>
          </div>
        )}

      </section>
    </div>
  );
}