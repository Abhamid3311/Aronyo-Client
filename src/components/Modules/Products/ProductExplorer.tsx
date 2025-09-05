"use client";

import { useState, useEffect, Suspense } from "react";
import { IProduct } from "@/lib/types";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import FiltersSidebar from "./FiltersSidebar";
import Pagination from "../Shared/Pagination";
import FilterDrawer from "./FilterDrawer";
import SortSelect from "./SortSelect";
import ProductGrid from "./ProductGrid";
import ProductGridSkeleton from "../skeletons/ProductGridSkeleton";

interface ProductExplorerProps {
  initialData: {
    data: IProduct[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  category?: string;
}

export default function ProductExplorer({
  initialData,
  category,
}: ProductExplorerProps) {
  const [products, setProducts] = useState<IProduct[]>(initialData.data);
  const [meta, setMeta] = useState(initialData.meta);

  // filters
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [page, setPage] = useState(initialData.meta.page);
  const [limit, setLimit] = useState(initialData.meta.limit);
  const [sort, setSort] = useState("-createdAt");

  // ✅ Extract options from initialData
  const allBrands = Array.from(
    new Set(initialData.data.map((p) => p.brand).filter(Boolean))
  );
  const allTags = Array.from(
    new Set(initialData.data.flatMap((p) => p.tags ?? []))
  );
  const allCategories = Array.from(
    new Set(initialData.data.map((p) => p.category).filter(Boolean))
  );

  const priceRanges = [
    { label: "$0 - $499", min: 0, max: 499 },
    { label: "$500 - $999", min: 500, max: 999 },
    { label: "$1000 - $1999", min: 1000, max: 1999 },
    { label: "$2000+", min: 2000, max: 999999 },
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const selectedRange = priceRanges.find(
        (r) => r.label === selectedPriceRange
      );

      const filters: Record<string, string> = {
        ...(category && { category }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(search && { search }),
        ...(selectedBrands.length > 0 && { brand: selectedBrands.join(",") }),
        ...(selectedTags.length > 0 && { tag: selectedTags.join(",") }),
        ...(selectedRange && {
          minPrice: String(selectedRange.min),
          maxPrice: String(selectedRange.max),
        }),
        page: String(page),
        limit: String(limit),
        sort,
      };

      try {
        const data = await getProductsWithFilters(filters);
        setProducts(data.data);
        setMeta(data.meta);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [
    search,
    selectedBrands,
    selectedTags,
    selectedCategory,
    selectedPriceRange,
    page,
    limit,
    sort,
    category,
  ]);

  const clearFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedTags([]);
    setSelectedCategory("");
    setSelectedPriceRange("");
    setPage(1);
    setSort("-createdAt");
  };

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-1">
        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          allBrands={allBrands as string[]}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          priceRanges={priceRanges}
          clearFilters={clearFilters}
          applyFilters={() => setPage(1)}
        />
      </aside>

      {/* Mobile Sidebar */}
      <FilterDrawer>
        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          allBrands={allBrands as string[]}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          priceRanges={priceRanges}
          clearFilters={clearFilters}
          applyFilters={() => setPage(1)}
        />
      </FilterDrawer>

      {/* Products */}
      <section className="lg:col-span-3">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4 px-5">
          <p className="text-sm text-gray-600">
            Showing {products.length} of {meta.total} products
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <ProductGrid products={products} />

        {products.length > 0 && (
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            showItemsPerPage
            itemsPerPageOptions={[12, 24, 48, 96]}
            className="mt-8"
            onPageChange={(p) => setPage(p)}
            onItemsPerPageChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />
        )}
      </section>
    </div>
  );
}
