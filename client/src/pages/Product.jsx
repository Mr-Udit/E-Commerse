import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { allProducts, categories } from "@/assests/constant";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const filteredProducts =
    selectedCategory === "All Categories"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg md:sticky md:top-0">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                className={`py-2 border-b hover:text-blue-500 cursor-pointer ${
                  selectedCategory === category ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
