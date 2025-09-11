import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersSidebarProps {
  search: string;
  setSearch: (val: string) => void;
  allBrands: string[];
  selectedBrands: string[];
  setSelectedBrands: (val: string[]) => void;
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: (val: string[]) => void;
  allSizes: string[];
  selectedSizes: string[];
  setSelectedSizes: (val: string[]) => void;
  allCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (val: string) => void;
  priceRanges: { label: string; min: number; max: number }[];
  clearFilters: () => void;
}

export default function FiltersSidebar({
  search,
  setSearch,
  allBrands,
  selectedBrands,
  setSelectedBrands,
  allTags,
  selectedTags,
  setSelectedTags,
  allSizes,
  selectedSizes,
  setSelectedSizes,
  allCategories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  priceRanges,
  clearFilters,
}: FiltersSidebarProps) {
  const toggleCheckbox = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (val: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <Card className="h-full lg:h-auto">
      <CardContent className="p-4 space-y-6 overflow-y-auto">
        {/* Search */}
        <div>
          <p className="text-sm font-medium mb-2">Search</p>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        {allCategories.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Category</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allCategories.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedCategory === c}
                    onCheckedChange={() =>
                      setSelectedCategory(selectedCategory === c ? "" : c)
                    }
                  />
                  <span className="text-sm capitalize">{c}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brands */}
        {allBrands.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Brands</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allBrands.map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedBrands.includes(b)}
                    onCheckedChange={() =>
                      toggleCheckbox(b, selectedBrands, setSelectedBrands)
                    }
                  />
                  <span className="text-sm capitalize">{b}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {allSizes.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Sizes</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allSizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() =>
                      toggleCheckbox(size, selectedSizes, setSelectedSizes)
                    }
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {allTags.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Tags</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allTags.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedTags.includes(t)}
                    onCheckedChange={() =>
                      toggleCheckbox(t, selectedTags, setSelectedTags)
                    }
                  />
                  <span className="text-sm capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div>
          <p className="text-sm font-medium mb-2">Price Range</p>
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

        {/* Clear Filters Button */}
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>

        {/* Active Filters Count */}
        <div className="text-xs text-gray-500 text-center">
          {selectedBrands.length +
            selectedTags.length +
            selectedSizes.length +
            (selectedCategory ? 1 : 0) +
            (selectedPriceRange ? 1 : 0)}{" "}
          filters active
        </div>
      </CardContent>
    </Card>
  );
}
