import { getProductById } from "@/lib/services/Products/productsApi";
import { IProduct } from "@/lib/types";
import React from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import ProductImages from "@/components/Modules/Products/ProductDetailsImage";
import ProductActions from "@/components/Modules/Products/ProductActions";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  let product: IProduct;

  try {
    product = await getProductById(id);
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600">
          The requested product could not be found.
        </p>
      </div>
    );
  }

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  //   console.log(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/all-plants" className="hover:text-green-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primaryGreen">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <ProductImages images={product.images} title={product.title} />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <button className="p-2 rounded-lg border-2 border-gray-300 hover:border-red-500 hover:text-red-500">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {product.ratings && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratings)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.ratings} ({product.numReviews} reviews)
                </span>
              </div>
            )}

            {product.brand && (
              <p className="text-gray-600">
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-green-600">
                ৳{product.discountPrice || product.price}
              </span>
              {product.discountPrice &&
                product.discountPrice < product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span
              className={`font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          {(product.size || product.category) && (
            <div className="grid grid-cols-2 gap-4">
              {product.size && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Size</span>
                  <p className="font-medium text-gray-900">{product.size}</p>
                </div>
              )}
              {product.category && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm">Category</span>
                  <p className="font-medium text-gray-900 capitalize">
                    {product.category.replace("-", " ")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>
          )}

          <ProductActions product={product} />

          {/* Features */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Truck className="w-5 h-5" />
              <span>Free shipping on orders over ৳1000</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield className="w-5 h-5" />
              <span>1 year warranty</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <RotateCcw className="w-5 h-5" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="space-y-12">
        {/* Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-medium">Product ID:</span>
              <p className="text-gray-700">{product._id}</p>
            </div>
            {product.size && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">Size:</span>
                <p className="text-gray-700">{product.size}</p>
              </div>
            )}
            {product.category && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">Category:</span>
                <p className="text-gray-700 capitalize">
                  {product.category.replace("-", " ")}
                </p>
              </div>
            )}
            {product.brand && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">Brand:</span>
                <p className="text-gray-700">{product.brand}</p>
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-medium">Stock:</span>
              <p className="text-gray-700">{product.stock} units</p>
            </div>
            {product.createdAt && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">Added:</span>
                <p className="text-gray-700">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Customer Reviews {product.numReviews && `(${product.numReviews})`}
          </h3>

          {product.ratings && product.numReviews ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">{product.ratings}</div>
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.ratings)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">
                    Based on {product.numReviews} reviews
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-gray-700 mb-2">
                No Reviews Yet
              </h4>
              <p className="text-gray-500">
                Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
