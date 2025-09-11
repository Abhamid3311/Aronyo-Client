"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsWithFilters } from "@/lib/services/Products/publicApi";
import { IProduct } from "@/lib/types";

interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductSearchModal({
  isOpen,
  onClose,
}: ProductSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setProducts([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await getProductsWithFilters({
        search: term,
        limit: "10", // Limit results for modal
      });

      if (response?.data) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleProductClick = () => {
    onClose();
    setSearchTerm("");
    setProducts([]);
    setHasSearched(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Search Products
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for plants..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
            autoFocus
          />
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg animate-pulse"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            products.length > 0 ? (
              <div className="space-y-2">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/all-plants/${product.slug}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 hover:border-green-300 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate group-hover:text-green-700 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-green-600">
                          ${product.price}
                        </span>
                        {/*   {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ${product.comparePrice}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm">
                  Try searching with different keywords
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                <SearchIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-gray-600 text-lg mb-2">Start searching</p>
              <p className="text-gray-400 text-sm">
                Type to search for products
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {/*  {products.length > 0 && (
          <div className="border-t pt-3 mt-3">
            <Link
              href={`/all-plants?search=${encodeURIComponent(searchTerm)}`}
              onClick={handleProductClick}
              className="block w-full"
            >
              <Button variant="outline" className="w-full">
                View all results for &quot;{searchTerm}&quot;
              </Button>
            </Link>
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
