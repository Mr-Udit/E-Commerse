import { useState } from "react";
import { initialCart } from "@/assests/constant";
import PropTypes from "prop-types";

export default function ProductCard( product ) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const productWithQuantity = { ...product, quantity };
    console.log("Add to cart:", productWithQuantity);
    initialCart.push(productWithQuantity);
    console.log(initialCart);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-64">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mt-3">
        <button
          className="px-2 py-1 bg-gray-200 rounded-l-xl"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-12 text-center border border-gray-300"
        />
        <button
          className="px-2 py-1 bg-gray-200 rounded-r-xl"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
