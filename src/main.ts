// Import các giá trị cần dùng
import { getProductStatus, PRODUCT_STATUS_LABELS } from "./product-types";

// Chỉ import kiểu dữ liệu bằng import type
import type { Product, ProductStatus } from "./product-types";

// Import các function từ product-service
import {
  getAllProducts,
  getProductById,
  updateProduct,
  filterBy,
  getProductField,
} from "./product-service";

// Hàm hiển thị một sản phẩm
function printProduct(product: Product): void {
  const status: ProductStatus = getProductStatus(product.stock);

  console.log({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    status: PRODUCT_STATUS_LABELS[status],
  });
}

// ==========================================
// 1. In toàn bộ sản phẩm và nhãn tồn kho
// ==========================================

console.log("\n===== 1. DANH SÁCH SẢN PHẨM =====");

const allProducts = getAllProducts();

allProducts.forEach((product) => {
  printProduct(product);
});

// ==========================================
// 2. Tìm sản phẩm theo ID
// ==========================================

console.log("\n===== 2. TÌM SẢN PHẨM =====");

const foundProduct = getProductById(101);

if (foundProduct) {
  console.log("Tìm thấy sản phẩm:");
  printProduct(foundProduct);

  // Minh họa keyof và indexed access Product[K]
  const productName: string = getProductField(foundProduct, "name");
  const productPrice: number = getProductField(foundProduct, "price");

  console.log("Tên sản phẩm:", productName);
  console.log("Giá sản phẩm:", productPrice);
} else {
  console.log("Không tìm thấy sản phẩm có ID 101");
}

const missingProduct = getProductById(999);

console.log(
  "Tìm sản phẩm ID 999:",
  missingProduct ?? "Không tìm thấy sản phẩm",
);

// ==========================================
// 3. Cập nhật riêng giá sản phẩm
// ==========================================

console.log("\n===== 3. CẬP NHẬT GIÁ SẢN PHẨM =====");

const updatedPriceProduct = updateProduct(101, {
  price: 25990000,
});

if (updatedPriceProduct) {
  console.log("Sản phẩm sau khi cập nhật giá:");
  printProduct(updatedPriceProduct);
} else {
  console.log("Không tìm thấy sản phẩm để cập nhật");
}

// ==========================================
// 4. Cập nhật tên và số lượng tồn kho
// ==========================================

console.log("\n===== 4. CẬP NHẬT TÊN VÀ TỒN KHO =====");

const updatedProduct = updateProduct(102, {
  name: "Chuột không dây Logitech",
  stock: 10,
});

if (updatedProduct) {
  console.log("Sản phẩm sau khi cập nhật:");
  printProduct(updatedProduct);
} else {
  console.log("Không tìm thấy sản phẩm để cập nhật");
}

// ==========================================
// 5. Lọc sản phẩm theo category và stock
// ==========================================

console.log("\n===== 5. LỌC SẢN PHẨM =====");

// Lọc theo trường chuỗi
const computerProducts = filterBy(getAllProducts(), "category", "computer");

console.log("Các sản phẩm thuộc category computer:");

computerProducts.forEach(printProduct);

// Lọc theo trường số
const productsWithStockFive = filterBy(getAllProducts(), "stock", 5);

console.log("Các sản phẩm có stock bằng 5:");

productsWithStockFive.forEach(printProduct);

// Kiểm tra kiểu dữ liệu không tương thích.
// Đoạn này vẫn được TypeScript kiểm tra nhưng không chạy khi chương trình thực thi.
if (false) {
  // @ts-expect-error category có kiểu string, không nhận number
  filterBy(getAllProducts(), "category", 123);
}

// ==========================================
// 6. Cập nhật ID không tồn tại
// ==========================================

console.log("\n===== 6. CẬP NHẬT ID KHÔNG TỒN TẠI =====");

const failedUpdate = updateProduct(999, {
  price: 1000000,
});

if (failedUpdate) {
  console.log("Cập nhật thành công:");
  printProduct(failedUpdate);
} else {
  console.log("Cập nhật thất bại: Không tìm thấy sản phẩm có ID 999");
}

// ==========================================
// In danh sách sau tất cả thao tác
// ==========================================

console.log("\n===== DANH SÁCH SẢN PHẨM SAU CẬP NHẬT =====");

getAllProducts().forEach(printProduct);
