"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/lib/types";
import {
  getProductsWithFilters,
  getFilterOptions,
} from "@/lib/services/Products/publicApi";
import FiltersSidebar from "./FiltersSidebar";
import Pagination from "../Shared/Pagination";
import FilterDrawer from "./FilterDrawer";
import SortSelect from "./SortSelect";
import ProductGrid from "./ProductGrid";
import { PRODUCT_SIZES, PRODUCT_TAGS } from "@/lib/staticData";
import ProductsSkeleton from "../skeletons/ProductGridSkeleton";

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
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [page, setPage] = useState(initialData.meta.page);
  const [limit, setLimit] = useState(initialData.meta.limit);
  const [sort, setSort] = useState("-createdAt");

  // Filter options from backend
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allTags] = useState<string[]>(PRODUCT_TAGS);
  const [allSizes] = useState<string[]>(PRODUCT_SIZES);
  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false);

  const priceRanges = [
    { label: "$0 - $499", min: 0, max: 499 },
    { label: "$500 - $999", min: 500, max: 999 },
    { label: "$1000 - $1999", min: 1000, max: 1999 },
    { label: "$2000+", min: 2000, max: 999999 },
  ];

  //  Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  //  Load filter options from backend on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const filterData = await getFilterOptions();
        // console.log("Filter options loaded:", filterData);

        // Handle different possible response structures
        if (filterData.data) {
          setAllBrands(filterData.data.brands || []);
          setAllCategories(filterData.data.categories || []);
        } else {
          setAllBrands(filterData.brands || []);
          setAllCategories(filterData.categories || []);
        }

        setFilterOptionsLoaded(true);
      } catch (error) {
        console.error("Failed to load filter options:", error);
        setFilterOptionsLoaded(true); // Still set to true to prevent infinite loading
      }
    };

    loadFilterOptions();
  }, []);

  //  Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const selectedRange = priceRanges.find(
          (r) => r.label === selectedPriceRange
        );

        const filters: Record<string, string> = {};

        // Add category filter (prioritize selectedCategory over prop category)
        if (selectedCategory) {
          filters.category = selectedCategory;
        } else if (category && !selectedCategory) {
          filters.category = category;
        }

        // Add other filters
        if (debouncedSearch) filters.search = debouncedSearch;
        if (selectedBrands.length > 0) filters.brand = selectedBrands.join(",");
        if (selectedTags.length > 0) filters.tags = selectedTags.join(",");
        if (selectedSizes.length > 0) filters.size = selectedSizes.join(",");

        if (selectedRange) {
          filters.minPrice = String(selectedRange.min);
          filters.maxPrice = String(selectedRange.max);
        }

        // Pagination and sorting
        filters.page = String(page);
        filters.limit = String(limit);
        filters.sort = sort;
        const data = await getProductsWithFilters(filters);

        setProducts(data.data || []);
        setMeta(
          data.meta || {
            page: 1,
            limit: 12,
            total: 0,
            totalPages: 1,
          }
        );
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setMeta({
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if filter options are loaded or we don't need them for this request
    if (filterOptionsLoaded) {
      fetchProducts();
    }
  }, [
    debouncedSearch,
    selectedBrands,
    selectedTags,
    selectedSizes,
    selectedCategory,
    selectedPriceRange,
    page,
    limit,
    sort,
    category,
    filterOptionsLoaded,
  ]);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedBrands([]);
    setSelectedTags([]);
    setSelectedSizes([]);
    setSelectedCategory(category || "");
    setSelectedPriceRange("");
    setPage(1);
    setSort("-createdAt");
  };

  // Show loading state while filter options are being loaded
  if (!filterOptionsLoaded) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-1">
        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          allBrands={allBrands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allSizes={allSizes}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          priceRanges={priceRanges}
          clearFilters={clearFilters}
        />
      </aside>

      {/* Mobile Sidebar */}
      <FilterDrawer>
        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          allBrands={allBrands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allSizes={allSizes}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          priceRanges={priceRanges}
          clearFilters={clearFilters}
        />
      </FilterDrawer>

      {/* Products */}
      <section className="lg:col-span-3">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4 px-5">
          <p className="text-sm text-gray-600">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing {products.length} of {meta.total} products
              </>
            )}
          </p>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}

        {products.length > 0 && !loading && (
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

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-500 hover:underline mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
