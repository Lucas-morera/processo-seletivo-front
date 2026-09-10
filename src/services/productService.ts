export interface Product {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
}


export default async function getProdutos() {
  const response = await fetch('/api/teste-front-end/junior/tecnologia/lista-produtos/produtos.json');
  
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  const data = await response.json();
  return data.products || [];
}