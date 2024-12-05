import React, { useState } from "react";
import "./styles.css"; // Import file CSS đã thiết kế

const CreateCollection = () => {
  const [name, setName] = useState(""); // Tên collection
  const [environment, setEnvironment] = useState("Development"); // Môi trường (Development mặc định)
  const [description, setDescription] = useState(""); // Mô tả collection
  const [imageUrl, setImageUrl] = useState(""); // URL ảnh collection
  const [error, setError] = useState(""); // Lỗi khi tạo collection
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleCreateCollection = async () => {
    setError(""); // Reset lỗi trước khi xử lý
    setSuccessMessage(""); // Reset thông báo thành công

    // Kiểm tra dữ liệu đầu vào
    if (!name || !description || !imageUrl) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (name.length > 32) {
      setError("Tên collection phải có tối đa 32 ký tự.");
      return;
    }
    if (description.length > 64) {
      setError("Mô tả collection phải có tối đa 64 ký tự.");
      return;
    }

    const isValidUrl = (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (!isValidUrl(imageUrl)) {
      setError("URL ảnh không hợp lệ.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.gameshift.dev/nx/asset-collections",
        {
          method: "POST",
          headers: {
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, environment, description, imageUrl }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo collection.");
      }

      setSuccessMessage("Tạo collection thành công!");
      setName("");
      setDescription("");
      setImageUrl("");
      setEnvironment("Development");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-asset-container">
      <h2>Tạo Collection Mới</h2>
      <div className="form-group">
        <label htmlFor="name">Tên Collection:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên collection"
          className="form-control"
          maxLength="32"
        />
        <small>{name.length} / 32 ký tự</small>
      </div>

      <div className="form-group">
        <label htmlFor="environment">Môi Trường:</label>
        <select
          id="environment"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          className="form-control"
        >
          <option value="Development">Development</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Mô Tả:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả collection"
          className="form-control"
          maxLength="64"
        />
        <small>{description.length} / 64 ký tự</small>
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">URL Ảnh:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL ảnh (JPG hoặc PNG)"
          className="form-control"
        />
      </div>

      {error && <p className="error-msg">{error}</p>}
      {successMessage && <p className="success-msg">{successMessage}</p>}

      <button
        onClick={handleCreateCollection}
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Đang tạo..." : "Tạo Collection"}
      </button>
    </div>
  );
};

export default CreateCollection;
