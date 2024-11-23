import React, { useState } from "react";

const CreateCollection = () => {
  const [name, setName] = useState("");           // Tên collection
  const [environment, setEnvironment] = useState("Development"); // Môi trường (Development mặc định)
  const [description, setDescription] = useState("");  // Mô tả collection
  const [imageUrl, setImageUrl] = useState("");     // URL ảnh collection
  const [error, setError] = useState("");          // Lỗi khi tạo collection
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công
  const [loading, setLoading] = useState(false);   // Loading state to disable button

  const handleCreateCollection = async () => {
    // Kiểm tra nếu các trường nhập liệu chưa đầy đủ
    if (!name || !description || !imageUrl) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra độ dài của tên và mô tả
    if (name.length > 32) {
      setError("Tên collection phải có tối đa 32 ký tự.");
      return;
    }
    if (description.length > 64) {
      setError("Mô tả collection phải có tối đa 64 ký tự.");
      return;
    }

    // Kiểm tra URL ảnh
    const isValidUrl = (url) => {
      const regex = /^(ftp|http|https):\/\/[^ "]+$/;
      return regex.test(url);
    };

    if (!isValidUrl(imageUrl)) {
      setError("URL ảnh không hợp lệ.");
      return;
    }

    try {
      setLoading(true); // Show loading spinner when submitting

      // Gửi yêu cầu tạo collection đến API
      const response = await fetch("https://api.gameshift.dev/nx/asset-collections", {
        method: "POST",
        headers: {
          "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmYTE5MDRkYy0xYmYzLTQ4ZTItYjk4OS0wZmFjMzk1OTEwMTAiLCJzdWIiOiIxZGY5M2IzYi0yNTI4LTRkZjMtYWQzOS1mMDJkZDU4OWYxMTIiLCJpYXQiOjE3MzIyNzg0OTV9.XhrKnNu9wjQBHulbTH2wZB6UHvdK04pTbee59zX28Fs", // Replace with the actual API key from env
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          environment,
          description,
          imageUrl,
        }),
      });

      // Kiểm tra nếu yêu cầu không thành công
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Không thể tạo collection.");
        setLoading(false);
        return;
      }

      // Nếu thành công
      setSuccessMessage("Tạo collection thành công!");
      setName(""); // Reset form
      setDescription("");
      setImageUrl("");
      setEnvironment("Development"); // Reset môi trường về mặc định
      setError(""); // Reset lỗi cũ nếu có
      setLoading(false); // Hide loading spinner
    } catch (error) {
      setError(error.message); // Hiển thị lỗi nếu có
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div>
      <h2>Tạo Collection Mới</h2>
      
      {/* Tên collection */}
      <div>
        <label htmlFor="name">Collection Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên collection"
          maxLength="32"
        />
        <p>{name.length} / 32 characters</p>
      </div>

      {/* Môi trường */}
      <div>
        <label htmlFor="environment">Environment:</label>
        <select
          id="environment"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
        >
          <option value="Development">Development</option>
        </select>
      </div>

      {/* Mô tả collection */}
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả collection"
          maxLength="64"
        />
        <p>{description.length} / 64 characters</p>
      </div>

      {/* URL ảnh */}
      <div>
        <label htmlFor="imageUrl">Collection Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL ảnh (JPG hoặc PNG)"
        />
      </div>

      {/* Thông báo lỗi */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Thông báo thành công */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Nút tạo collection */}
      <button onClick={handleCreateCollection} disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo Collection"}
      </button>
    </div>
  );
};

export default CreateCollection;
