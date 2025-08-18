import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  console.log(localStorage.getItem("token"));
  return (
    <div>
      <section id="hero" className="hero">
        <div className="hero-container">
          <p>Your Own</p>
          <h1>E Store</h1>
          <p>Shop smart. Live better. Everything you love, all in one place.</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>
      <div className="seperator"></div>
      <section className="featured-products">
        <div className="container-products">
          <div className="heaidng">
            <h2>Featured Products</h2>
            <p className="p">Discover our exclusive range of products</p>
          </div>
          <div className="products">
            <div className="product">
              <img src="product.png" height={200} width={200} alt="Product 1" />
              <h3>Product 1</h3>
              <p>$19.99</p>
              <div className="buttons">
                <button className="add-to-cart">Details</button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
            <div className="product">
              <img src="product.png" height={200} width={200} alt="Product 1" />
              <h3>Product 2</h3>
              <p>$19.99</p>
              <div className="buttons">
                <button className="add-to-cart">Details</button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
            <div className="product">
              <img src="product.png" height={200} width={200} alt="Product 1" />
              <h3>Product 3</h3>
              <p>$19.99</p>
              <div className="buttons">
                <button className="add-to-cart">Details</button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
            <div className="product">
              <img src="product.png" height={200} width={200} alt="Product 1" />
              <h3>Product 4</h3>
              <p>$19.99</p>
              <div className="buttons">
                <button className="add-to-cart">Details</button>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="seperator"></div>
      <section className="categores">
        <div className="categories-container">
          <h2>Explore Our Categories</h2>
          <p className="p">Find products tailored to your needs</p>
          <div className="categories">
            <div className="category">
              <img src="product.png" alt="Category 1" />
              <h3>Category 1</h3>
              <button>Browse</button>
            </div>
            <div className="category">
              <img src="product.png" alt="Category 1" />
              <h3>Category 2</h3>
              <button>Browse</button>
            </div>
            <div className="category">
              <img src="product.png" alt="Category 1" />
              <h3>Category 3</h3>
              <button>Browse</button>
            </div>
            <div className="category">
              <img src="product.png" alt="Category 1" />
              <h3>Category 4</h3>
              <button>Browse</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
