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
  allCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (val: string) => void;
  priceRanges: { label: string; min: number; max: number }[];
  clearFilters: () => void;
  applyFilters: () => void;
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
  allCategories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  priceRanges,
  clearFilters,
  applyFilters,
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
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Categories */}
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

        {/* Price */}
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
          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
