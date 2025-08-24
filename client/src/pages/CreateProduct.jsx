import React, { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      setUploading(true);
      let imageUrls = [];

      // Upload each file to Cloudinary
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "ecommerce_preset");

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/daihzogop/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudRes.ok) {
          throw new Error("Cloudinary upload failed");
        }
        else {
            console.error("Cloudnary response  : ", cloudRes);
        }

        const cloudData = await cloudRes.json();
        console.log("Cloudinary response data :", cloudData);
        imageUrls.push(cloudData.secure_url);
      }

      // Send product details + multiple images to backend
      const backendRes = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          images: imageUrls,
        }),
      });

      if (!backendRes.ok) {
        throw new Error("Backend request failed");
      }

      const backendData = await backendRes.json();
      alert("✅ Product created successfully!");
      console.log(backendData);

      // reset form
      setProduct({ name: "", price: "", description: "", category: "" });
      setFiles([]);
    } catch (err) {
      console.error("Error creating product:", err);
      alert("❌ Failed to create product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Create Product</h2>
      <form onSubmit={handleUploadAndSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <br />
        <br />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Create Product"}
        </button>
      </form>

      {/* Preview selected images */}
      <div style={{ marginTop: "20px" }}>
        {files.length > 0 &&
          Array.from(files).map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="preview"
              width="100"
              style={{ marginRight: "10px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductForm;
