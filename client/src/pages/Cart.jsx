import { useState } from "react";
import { Trash2 } from "lucide-react";
import Header from "../components/Header";
import { initialCart } from "../assests/constant";

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (key, quantity) => {
    setCart(
      cart.map((item) =>
        item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (key) => {
    setCart(cart.filter((item) => item.key !== key));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border-b py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="text-lg font-semibold">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
