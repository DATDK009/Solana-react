import React, { useState } from "react";

const CreateAsset = ({ authToken }) => {
  const [assetData, setAssetData] = useState({
    collectionId: "",
    description: "",
    imageUrl: "",
    name: "",
    traitType: "",
    traitValue: "",
    destinationUserReferenceId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateAsset = async () => {
    // Kiểm tra dữ liệu đầu vào
    const {
      collectionId,
      description,
      imageUrl,
      name,
      traitType,
      traitValue,
      destinationUserReferenceId,
    } = assetData;

    if (!collectionId || !description || !imageUrl || !name || !traitType || !traitValue || !destinationUserReferenceId) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://api.gameshift.dev/nx/unique-assets", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "x-api-key": authToken, // Thay thế bằng API key hợp lệ
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
        throw new Error("Không thể tạo tài sản.");
      }

      const data = await response.json();
      setSuccess("Tạo tài sản thành công!");
      console.log("Asset created:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tạo Tài Sản Mới</h2>
      <div>
        <label>Collection ID:</label>
        <input
          type="text"
          name="collectionId"
          value={assetData.collectionId}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={assetData.description}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={assetData.imageUrl}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={assetData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Trait Type:</label>
        <input
          type="text"
          name="traitType"
          value={assetData.traitType}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Trait Value:</label>
        <input
          type="text"
          name="traitValue"
          value={assetData.traitValue}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>User Reference ID:</label>
        <input
          type="text"
          name="destinationUserReferenceId"
          value={assetData.destinationUserReferenceId}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleCreateAsset} disabled={loading}>
        {loading ? "Đang tạo tài sản..." : "Tạo tài sản"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CreateAsset;
