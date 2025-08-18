
export const ProductDetails = (id) => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/view/${id}`
          , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await res.json();
        console.log(data)
      } catch (err) {
        console.error("Error fetching product:", err);
        return "Error in fetching Product details"
      }
    };
    fetchProduct();
}