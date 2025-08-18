import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "./api/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/get`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // ✅ Empty array so it runs only once
const handleAddToCart = async (productId) => {

}
  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (products.length === 0) {
    return <h2>No products found.</h2>;
  }
  return (
    <>
    <h1 className="title">Explore Products</h1>
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product._id}>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              height={200}
              width={200}
              alt={product.name}
            />
          ) : (
            <p>No Image Available</p>
          )}
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <div className="buttons">
            <Link to={`/products/${product._id}`} className="add-to-cart">
              Details
            </Link>
            <button className="add-to-cart" onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Products;
