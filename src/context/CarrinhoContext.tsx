"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// =====================
// 1. Tipos
// =====================
export interface CarrinhoItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CarrinhoContextProps {
  itens: CarrinhoItem[];               // Mudou de 'cart' para 'itens'
  adicionarItem: (produto: CarrinhoItem) => void; // Mudou de 'addToCart'
  removerItem: (id: string) => void;
  atualizarQuantidade: (id: string, quantidade: number) => void; 
  limparCarrinho: () => void;
  totalItens: number;                  // <--- NECESSÁRIO PARA O HEADER
  valorTotal: number;                  // <--- NECESSÁRIO PARA O CARRINHO
}

// =====================
// 2. Contexto
// =====================
const CarrinhoContext = createContext<CarrinhoContextProps | null>(null);

const STORAGE_KEY = "dchoco_cart";

// =====================
// 3. Provider
// =====================
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CarrinhoItem[]>([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        try {
          setItens(JSON.parse(salvo));
        } catch (e) {
          console.error("Erro ao carregar carrinho:", e);
        }
      }
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    }
  }, [itens]);

  // --- AÇÕES ---

  const adicionarItem = (novoProduto: CarrinhoItem) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === novoProduto.id);
      
      if (existe) {
        // Se já existe, soma a quantidade (padrão +1 se não vier especificado)
        return prev.map((item) =>
          item.id === novoProduto.id
            ? { ...item, quantity: item.quantity + (novoProduto.quantity || 1) }
            : item
        );
      }
      // Se é novo, adiciona ao array
      return [...prev, { ...novoProduto, quantity: novoProduto.quantity || 1 }];
    });
  };

  const atualizarQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade < 1) {
      removerItem(id);
      return;
    }
    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: novaQuantidade } : item
      )
    );
  };

  const removerItem = (id: string) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  // --- CÁLCULOS AUTOMÁTICOS ---
  
  // Soma a quantidade de todos os itens (Ex: 2 cookies + 1 bolo = 3 itens)
  const totalItens = itens.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  // Soma o preço total (Preço * Quantidade)
  const valorTotal = itens.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// =====================
// 4. Hook
// =====================
export function useCarrinho(): CarrinhoContextProps {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  }
  return context;
}