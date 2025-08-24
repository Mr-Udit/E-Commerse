// Add a new product to cart
export const addToCart = async (productId, quantity = 1) => {
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
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 400) {
                // const errorData = await response.json(); // backend usually sends { message: "...error..." }
                alert(data.message);
            }
        }

        return data.message;
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};