import { api } from "../configs/axios.ts";
import { empty } from "../helpers";

interface Product {
  createdAt?: string;
  nome: string;
  avatar?: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
  id?: string;
}

async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>(
    `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto`,
  );
  return response.data;
}

async function getProductId(id: string): Promise<Product> {
  const response = await api.get<Product>(
    `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
  );
  return response.data;
}

async function setProductData(data: Product) {
  const product = {
    ...data,
    createdAt: new Date().toISOString(),
    avatar: "https://picsum.photos/300/300",
  };
  let response;
  if (!empty(data.id)) {
    response = await api.put<Product>(
      `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${data.id}`,
      product,
    );
  } else {
    response = await api.post<Product>(
      `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/`,
      product,
    );
  }
  return response.data;
}

async function deleteProduct(id: number) {
  const text = "Tem certeza que deseja excluir?";
  if (confirm(text) == true) {
    if (!empty(id)) {
      await api.delete<Product>(
        `https://6256fc506ea7037005434e84.mockapi.io/api/v1/produto/${id}`,
      );
      window.location.href = "/product";
    }
  } else {
    return false;
  }
}

export { getProducts, getProductId, setProductData, deleteProduct };
export type { Product };
