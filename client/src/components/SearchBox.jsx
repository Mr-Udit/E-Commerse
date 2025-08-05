import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Products", "Services", "Articles"];
  const suggestions = [
    "Smartphones", "Laptops", "Tablets", "Smartwatches", "Headphones", "Wireless Earbuds", "Bluetooth Speakers", "Gaming Consoles", "Cameras", "Power Banks",
    "T-Shirts", "Jeans", "Sneakers", "Formal Shoes", "Handbags", "Watches", "Sunglasses", "Dresses", "Jackets", "Jewelry",
    "Bedsheets", "Curtains", "Cookware Set", "Dinnerware", "Air Fryer", "Coffee Maker", "Vacuum Cleaner", "Storage Boxes", "LED Lights", "Wall Clocks",
    "Makeup Kits", "Skincare Products", "Perfumes", "Hair Dryers", "Shaving Kits", "Sunscreen", "Nail Polish", "Face Masks", "Hair Straighteners",
    "Rice & Grains", "Cooking Oil", "Snacks & Beverages", "Dairy Products", "Fresh Fruits & Vegetables", "Spices & Condiments", "Tea & Coffee", "Cleaning Supplies",
    "Yoga Mats", "Dumbbells", "Resistance Bands", "Running Shoes", "Protein Supplements", "Smart Fitness Bands", "Bicycles", "Gym Bags",
    "Soft Toys", "Educational Games", "Action Figures", "Baby Diapers", "Feeding Bottles", "Baby Strollers", "Car Seats",
    "Car Covers", "Car Chargers", "Helmets", "Tool Kits", "Tire Inflators", "Car Cleaning Supplies",
  ];
  const [searchValue, setSearchValue] = useState(suggestions[0]);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % suggestions.length;
      setSearchValue(suggestions[indexRef.current]);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
      <select
        className="bg-gray-100 px-2 py-3 border-r focus:outline-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 px-3 py-2 focus:outline-none w-[300px]"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-3 hover:bg-blue-600"
        onClick={() => alert(`Searching for ${searchValue} in ${category}`)}
      >
        <Search size={20} />
      </button>
    </div>
  );
}
