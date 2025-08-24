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
        console.log(data.cart.items)
        setCartItems(data.cart.items || []);
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
      // console.log(cartItems)
      setCartItems(data.cart.items || []);
      // console.log(cartItems);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // console.log(cartItems)
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
              src={item.product.images[0] || "./noImage.webp"}
              alt={item.product.name}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <h4>{item.product?.name}</h4>
              <p>₹{item.product.price}</p>
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
                <span >{item.quantity}</span>
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
      {/* ✅ Total Price Section */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Price: ₹{totalPrice}</h3>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
      <button className="checkout-btn" onClick={() => alert("Proceeding to checkout...")}>
        Proceed to Checkout
      </button>
    </div>
      )}
    
    </div>
  );
};

export default Cart;
