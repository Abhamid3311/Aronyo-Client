"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { IProduct } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";
import Pagination from "../Shared/Pagination";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  // Filters
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [page, setPage] = useState(initialData.meta.page);
  const [limit, setLimit] = useState(initialData.meta.limit);
  const [sort, setSort] = useState("-createdAt"); // ✅ default = Newest

  // ✅ Extract options once
  const allBrands = Array.from(
    new Set(initialData.data.map((p) => p.brand).filter(Boolean))
  );
  const allTags = Array.from(
    new Set(initialData.data.flatMap((p) => (p.tags ? p.tags : [])))
  );
  const allCategories = Array.from(
    new Set(initialData.data.map((p) => p.category).filter(Boolean))
  );

  // ✅ Price ranges
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

  // Toggle for checkbox
  const toggleCheckbox = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedTags([]);
    setSelectedCategory("");
    setSelectedPriceRange("");
    setPage(1);
    setSort("-createdAt");
  };

  // Sidebar filters UI
  const FiltersSidebar = () => (
    <Card className="h-full">
      <CardContent className="p-4 space-y-6 overflow-y-auto">
        {/* Search */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <div>
          <p className="text-sm font-medium mb-2">Category</p>
          <div className="space-y-2">
            {allCategories.map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedCategory === c}
                  onCheckedChange={() =>
                    setSelectedCategory(selectedCategory === c ? "" : c)
                  }
                />
                <span className="text-sm">{c}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <p className="text-sm font-medium mb-2">Brands</p>
          <div className="space-y-2">
            {allBrands.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedBrands.includes(b)}
                  onCheckedChange={() =>
                    toggleCheckbox(b, selectedBrands, setSelectedBrands)
                  }
                />
                <span className="text-sm">{b}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-sm font-medium mb-2">Tags</p>
          <div className="space-y-2">
            {allTags.map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedTags.includes(t)}
                  onCheckedChange={() =>
                    toggleCheckbox(t, selectedTags, setSelectedTags)
                  }
                />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div>
          <p className="text-sm font-medium mb-2">Price</p>
          <div className="space-y-2">
            {priceRanges.map((r) => (
              <label
                key={r.label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedPriceRange === r.label}
                  onCheckedChange={() =>
                    setSelectedPriceRange(
                      selectedPriceRange === r.label ? "" : r.label
                    )
                  }
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => setPage(1)}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block lg:col-span-1 ">
        <FiltersSidebar />
      </aside>

      {/* Sidebar Mobile (shadcn Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden mb-4">
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FiltersSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Products */}
      <section className="lg:col-span-3">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 px-5">
          <p className="text-sm text-gray-600">
            Showing {products.length} of {meta.total} products
          </p>

          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="-price">Price: High → Low</option>
            <option value="price">Price: Low → High</option>
          </select>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center px-5 py-5">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex justify-center w-full max-w-xs mx-auto"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}

        {products.length > 0 && (
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            showItemsPerPage={true}
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
