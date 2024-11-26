import React, { useState } from "react";
import "./CreateAsset.css"; // CSS tách riêng để làm đẹp giao diện

const CreateAsset = () => {
  const [assetData, setAssetData] = useState({
    collectionId: "",
    description: "",
    imageUrl: "",
    name: "",
    traitType: "",
    traitValue: "",
    destinationUserReferenceId: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Xử lý thay đổi dữ liệu nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý tạo tài sản
  const handleCreateAsset = async () => {
    const {
      collectionId,
      description,
      imageUrl,
      name,
      traitType,
      traitValue,
      destinationUserReferenceId,
    } = assetData;

    // Kiểm tra dữ liệu đầu vào
    if (
      !collectionId ||
      !description ||
      !imageUrl ||
      !name ||
      !traitType ||
      !traitValue ||
      !destinationUserReferenceId
    ) {
      setStatus({ loading: false, error: "Vui lòng nhập đầy đủ thông tin.", success: "" });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      // const API_KEY = process.env.REACT_APP_API_KEY;

      const response = await fetch("https://api.gameshift.dev/nx/unique-assets", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8",
        },
        body: JSON.stringify({
          details: {
            collectionId,
            description,
            imageUrl,
            name,
            attributes: [
              {
                traitType,
                value: traitValue,
              },
            ],
          },
          destinationUserReferenceId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo tài sản.");
      }

      const data = await response.json();
      setStatus({
        loading: false,
        error: "",
        success: `Tạo tài sản thành công! ID: ${data.id}`,
      });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: "" });
    }
  };

  return (
    <div className="create-asset-container">
      <h2>Tạo Tài Sản Mới</h2>

      {/* Form nhập liệu */}
      {Object.keys(assetData).map((field) => (
        <div key={field} className="form-group">
          <label>{field.replace(/([A-Z])/g, " $1").toUpperCase()}:</label>
          <input
            type="text"
            name={field}
            value={assetData[field]}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      ))}

      {/* Nút tạo tài sản */}
      <button onClick={handleCreateAsset} disabled={status.loading} className="submit-btn">
        {status.loading ? "Đang tạo tài sản..." : "Tạo tài sản"}
      </button>

      {/* Hiển thị thông báo */}
      {status.error && <p className="error-msg">{status.error}</p>}
      {status.success && <p className="success-msg">{status.success}</p>}
    </div>
  );
};

export default CreateAsset;
