import type { Product, ProductUpdate } from "./product-types";

const products: Product[] = [
  {
    id: 101,
    name: "Laptop Air",
    price: 24990000,
    category: "computer",
    stock: 8,
  },
  {
    id: 102,
    name: "Chuột không dây",
    price: 450000,
    category: "accessory",
    stock: 4,
  },
  {
    id: 103,
    name: "Bàn phím cơ",
    price: 1290000,
    category: "accessory",
    stock: 12,
  },
  {
    id: 104,
    name: "Màn hình 27 inch",
    price: 5990000,
    category: "computer",
    stock: 0,
  },
  {
    id: 105,
    name: "Tai nghe Bluetooth",
    price: 1890000,
    category: "audio",
    stock: 5,
  },
];

//1. Lấy toàn bộ sản phẩm
export function getAllProducts(): Product[] {
  return products.map((product) => ({ ...product }));
}

//2. Tìm sản phẩm theo ID
export function getProductById(id: number): Product | undefined {
  const product = products.find((product) => product.id === id);
  return product ? { ...product } : undefined;
}

//3. Cập nhật thông tin sản phẩm
export function updateProduct(
  id: number,
  updates: ProductUpdate,
): Product | undefined {
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return undefined; // Không tìm thấy sản phẩm
  }

  const updatedProduct = { ...products[productIndex], ...updates };
  products[productIndex] = updatedProduct;

  return { ...updatedProduct };
}

// 4. Generic function lọc dữ liệu theo một trường bất kỳ
export function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K],
): T[] {
  return items.filter((item) => item[key] === value);
}

// 5. Generic function đọc giá trị theo key của Product
export function getProductField<K extends keyof Product>(
  product: Product,
  key: K,
): Product[K] {
  return product[key];
}
