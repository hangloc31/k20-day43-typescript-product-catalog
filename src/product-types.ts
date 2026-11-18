//1. Khai báo kiểu dữ liệu Product
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

//2. Khai báo danh sách trạng thái dùng trong ứng dụng
export const PRODUCT_STATUSES = [
  "in-stock",
  "low-stock",
  "out-of-stock",
] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

// 4. Kiểu dữ liệu cập nhật sản phẩm
export type ProductUpdate = Partial<Product>;

// 5. Bảng ánh xạ trạng thái sang nhãn tiếng Việt
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  "in-stock": "Còn hàng",
  "low-stock": "Sắp hết hàng",
  "out-of-stock": "Hết hàng",
};

// 6. Mapped type lưu lỗi theo từng trường của Product
export type ProductFieldErrors = {
  [K in keyof Product]?: string;
};

// 7. Xác định trạng thái tồn kho
export function getProductStatus(stock: number): ProductStatus {
  if (stock < 0) {
    throw new RangeError("Số lượng tồn kho không được âm");
  }

  if (stock === 0) {
    return "out-of-stock";
  }

  if (stock >= 1 && stock <= 5) {
    return "low-stock";
  }

  return "in-stock";
}
