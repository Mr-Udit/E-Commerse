import PropTypes from "prop-types";

export default function ProductDescription({ product }) {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.name}
                className="w-full h-20 sm:h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg mt-2">${product.price}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            {product.description}
          </p>
          <h2 className="mt-6 text-lg md:text-xl font-semibold">
            Product Details
          </h2>
          <ul className="list-disc list-inside mt-2 text-gray-700 text-sm md:text-base">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-blue-500 text-white py-2 md:py-3 rounded-xl hover:bg-blue-600 transition">
            Add to Cart
          </button>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Suggestions</h2>
            <textarea
              className="w-full p-2 border rounded-xl mt-2 text-sm md:text-base"
              placeholder="Leave your suggestions..."
            ></textarea>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDescription.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
