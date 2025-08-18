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
        const res = await fetch(`http://localhost:5000/api/products/view/${id}`);
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
    return <h2 style={{ color: "#fff", textAlign: "center" }}>Loading product...</h2>;
  }

  if (!product) {
    return <h2 style={{ color: "#fff", textAlign: "center" }}>Product not found.</h2>;
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
                <img
                  src={img.url}
                  alt={product.name}
                  className="image"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="image"
          />
        )
      ) : (
        <div className="no-image">No Image Available</div>
      )}
    </div>

    {/* Product Info */}
    <div className="info-section">
      <h1 className="name">{product.name}</h1>
      <p className="brand">Brand: {product.brand}</p>
      {
        product.categories ? <p className="category">Category: {product.categories}</p> : ""
      }
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

const styles = {
  page: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  imageSection: {
    flex: "1 1 400px",
    minWidth: "300px",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    objectFit: "fill",
  },
  noImage: {
    background: "#333",
    padding: "50px",
    textAlign: "center",
    borderRadius: "8px",
  },
  infoSection: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  name: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
  },
  brand: {
    fontSize: "1rem",
    color: "#bbb",
  },
  category: {
    fontSize: "1rem",
    color: "#bbb",
  },
  description: {
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#ddd",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#00ff99",
  },
  stock: {
    fontSize: "1rem",
    color: "#ffcc00",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  addToCart: {
    backgroundColor: "#00ff99",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buyNow: {
    backgroundColor: "#ff4444",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProductDetails;
