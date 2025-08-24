import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/view/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct(); 
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ color: "#fff", textAlign: "center" }}>Loading product...</h2>
    );
  }

  if (!product) {
    return (
      <h2 style={{ color: "#fff", textAlign: "center" }}>Product not found.</h2>
    );
  }
  // Slider settings - active only if more than 1 image
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: product.images && product.images.length > 1,
    swipe: product.images && product.images.length > 1,
  };

  return (
    <div className="page">
      <div className="container-products-page">
        {/* Product Image Slider */}
        <div className="image-section">
          {product.images && product.images.length > 0 ? (
            product.images.length > 1 ? (
              <Slider {...sliderSettings}>
                {product.images.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={product.name} className="image" />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src={product.images[0]}
                alt={product.name}
                className="image"
              />
            )
          ) : (
            <img src="/noImage.webp" alt="no preview" width="100%" />
          )}
        </div>

        {/* Product Info */}
        <div className="info-section">
          <h1 className="name">{product.name}</h1>
          <p className="brand">Brand: {product.brand}</p>
          {product.categories ? (
            <p className="category">Category: {product.categories}</p>
          ) : (
            ""
          )}
          <p className="description">{product.description}</p>
          <p className="price">₹ {product.price.toFixed(2)}</p>
          <p className="stock">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {/* Buttons */}
          <div className="button-group">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;