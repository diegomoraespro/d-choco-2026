// src/utils/carrinho.ts

// 1. Definimos o "formato" do produto (Tipagem)
export interface Produto {
  id: string;
  name: string; // Pode mudar para 'nome' se seu objeto usar 'nome'
  price: number; // Pode mudar para 'preco'
  image: string; // Pode mudar para 'imagem'
  description?: string;
  quantidade?: number; // Opcional
}

// 2. Função para adicionar ao carrinho
export const adicionarAoCarrinho = (produto: Produto) => {
  const CHAVE_CARRINHO = 'dchoco_carrinho';

  // Pega o carrinho salvo ou cria lista vazia
  const carrinhoSalvo = localStorage.getItem(CHAVE_CARRINHO);
  let carrinho: Produto[] = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

  // Verifica se o produto já existe na lista
  const indiceProduto = carrinho.findIndex((item) => item.id === produto.id);

  if (indiceProduto >= 0) {
    // Se existe, soma +1 na quantidade
    const qtdAtual = carrinho[indiceProduto].quantidade || 0;
    carrinho[indiceProduto].quantidade = qtdAtual + 1;
  } else {
    // Se não existe, adiciona o produto com quantidade 1
    carrinho.push({ ...produto, quantidade: 1 });
  }

  // Salva de volta no navegador
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));

  alert(`${produto.name} foi adicionado ao carrinho!`);
};

// 3. Função para ler o carrinho (usar depois na página do carrinho)
export const lerCarrinho = (): Produto[] => {
  const carrinhoSalvo = localStorage.getItem('dchoco_carrinho');
  return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
};