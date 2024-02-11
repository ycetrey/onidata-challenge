import { api } from "../configs/axios.ts";

interface Product {
  createdAt: string;
  nome: string;
  avatar: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
  id: string;
}

async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>(
    `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto`,
  );
  console.log(response.data);
  return response.data;
}

export { getProducts };
export type { Product };
