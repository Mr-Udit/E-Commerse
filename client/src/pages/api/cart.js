

// Add a new product to cart
export const addToCart = async (productId, quantity=1) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) throw new Error("Failed to add item");
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};