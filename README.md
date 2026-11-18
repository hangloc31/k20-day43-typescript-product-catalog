# TypeScript Product Catalog

A small TypeScript exercise that models an in-memory product catalog. It demonstrates type-safe data modeling, union types, mapped types, generics, `keyof`, and indexed access types — without any runtime dependencies.

## Features

- **Typed product model** — `Product` interface with `id`, `name`, `price`, `category`, and `stock`.
- **Inventory status as a union type** — `ProductStatus` is derived from a `PRODUCT_STATUSES` tuple, with Vietnamese labels mapped through a `Record<ProductStatus, string>`.
- **Safe updates** — `ProductUpdate = Partial<Product>` lets callers update only the fields they need.
- **Field-level errors** — `ProductFieldErrors` is a mapped type over `keyof Product`.
- **Generic filtering** — `filterBy<T, K extends keyof T>(items, key, value)` keeps the value type tied to the key.
- **Typed field access** — `getProductField` uses `keyof` and indexed access (`Product[K]`) to return the correct type per field.
- **Immutable reads** — getters return copies, so callers cannot mutate the internal dataset.
- **Compile-time safety** — incompatible calls (for example passing a `number` for `category`) are rejected by the compiler, demonstrated with `@ts-expect-error`.

## Tech stack

- TypeScript 7 (`strict` mode, `node16` module resolution)
- Node.js (CommonJS output)
- No runtime dependencies

## Project structure

```
.
├── src/
│   ├── product-types.ts    # Product model, status union, labels, mapped types
│   ├── product-service.ts  # In-memory dataset and CRUD/filter helpers
│   └── main.ts             # Demo script exercising the service
├── dist/                   # Compiled output (generated, not committed)
├── package.json
├── tsconfig.json
└── .gitignore
```

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run

Build once and run the compiled demo:

```bash
npm run dev
```

Or run the steps separately:

```bash
npm run build   # compile TypeScript to dist/
npm start       # run dist/main.js
npm run typecheck  # type-check without emitting files
```

## What the demo covers

1. List every product with its inventory status.
2. Find a product by ID (including a missing ID).
3. Update only a product's price.
4. Update a product's name and stock.
5. Filter products by string (`category`) and numeric (`stock`) fields.
6. Attempt to update a non-existent product.

`src/main.ts` also contains a compile-time-only check that verifies invalid `filterBy` calls are rejected:

```ts
if (false) {
  // @ts-expect-error category is a string, not a number
  filterBy(getAllProducts(), "category", 123);
}
```

## Sample output

Console output uses Vietnamese labels:

```text
===== 1. DANH SÁCH SẢN PHẨM =====
{
  id: 101,
  name: 'Laptop Air',
  price: 24990000,
  category: 'computer',
  stock: 8,
  status: 'Còn hàng'
}
...
Tên sản phẩm: Laptop Air
Giá sản phẩm: 24990000
Tìm sản phẩm ID 999: Không tìm thấy sản phẩm
```

## Notes

- The dataset lives in memory; changes are lost when the process exits.
- `dist/` and `node_modules/` are ignored by git. Run `npm run build` after cloning.
