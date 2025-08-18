

import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/cart/view", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCartItems(data.cart?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Update quantity of an existing product
  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) throw new Error("erroro in updating quantity");

      const data = await response.json();
      setCartItems(data.cart.items);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Remove product from cart
  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cart/delete/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Failed to remove item");

      const data = await response.json();
      setCartItems(data.cart.items);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        // <div className="cart-items"></div>
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={item.product?.image || "https://via.placeholder.com/100"}
              alt={item.product.name}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h4>{item.product?._id}</h4>
              <p>₹{item.price}</p>
              <div className="quantity-control">
                <button
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.product._id, item.quantity - 1)
                      : removeFromCart(item.product._id)
                  }
                >
                  -
                </button>
                <span style={styles.qty}>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: { padding: "20px" },
  heading: { fontSize: "24px", marginBottom: "20px" },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    marginRight: "15px",
  },
  info: { flex: 1 },
  controls: { display: "flex", alignItems: "center", marginTop: "5px" },
  qty: { margin: "0 10px" },
  removeBtn: {
    background: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    marginTop: "5px",
    cursor: "pointer",
  },
};

export default Cart;
