import PageHeader from "@/components/Modules/Shared/PageHeader";
import { ProductSection } from "@/components/Modules/Shared/ProductSection";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";

const HousePlants = async () => {
  const [popularPro, petFriendly, indoorPlant, airPurify, lowLight, easyCare] =
    await Promise.all([
      getProductsWithFilters(),
      getProductsWithFilters({ category: "pet-friendly-plants" }),
      getProductsWithFilters({ category: "indoor-plants" }),
      getProductsWithFilters({ category: "air-purifying-plants" }),
      getProductsWithFilters({ category: "low-light-plants" }),
      getProductsWithFilters({ category: "easy-care-plants" }),
    ]);

  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Plants Make People Happy"
        para="Shop our plants, care accessories, and more delivered to your door—happiness guaranteed."
      />

      <ProductSection
        title="Most Popular"
        link="#"
        buttonText="Shop all best sellers"
        products={popularPro.data}
      />

      <ProductSection
        title="Air Purifying Plants"
        link="#"
        buttonText="Shop all Air Purifying Plants"
        products={airPurify.data}
      />

      <ProductSection
        title="Easy To Care Plants"
        link="#"
        buttonText="Shop all easy Care"
        products={easyCare.data}
      />

      <ProductSection
        title="Pet-Friendly Picks"
        link="#"
        buttonText="Shop all Pet-Friendly"
        products={petFriendly.data}
      />

      <ProductSection
        title="Indoor Plants"
        link="#"
        buttonText="Shop all Indoor Plants"
        products={indoorPlant.data}
      />

      <ProductSection
        title="Low-light Plants"
        link="#"
        buttonText="Shop all low-light Plants"
        products={lowLight.data}
      />
    </div>
  );
};

export default HousePlants;
