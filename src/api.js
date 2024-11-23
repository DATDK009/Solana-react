// src/api.js

const BASE_URL = "https://api.gameshift.dev/nx/users";

// API request chung cho mọi phương thức
export const apiRequest = async (method = "POST", body = null, authToken = null) => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmZmQ2ZDc0Ny1jN2VhLTQ2NzktOGM3NS01YTVhYWVlMmUxNDkiLCJzdWIiOiJiMjg0ZTg3NC1lMjg4LTRkNmItOWM1YS04ZDMxNjdiMTNhYzMiLCJpYXQiOjE3MzIyNzg2MjR9.FStOXBNWl0bx5w8WO5YtrQQPagdMOuUs6Q9mBlTvbGg" // API Key
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  // Nếu không có dữ liệu body, sử dụng referenceId và email mặc định
  const requestBody = body || {
    referenceId: "exampleReferenceId",  // Giá trị mặc định chỉ là một chuỗi đơn giản
    email: "user@example.com",  // Ví dụ email
  };

  try {
    // Xây dựng URL tùy thuộc vào phương thức
    const url = method === "GET" ? `${BASE_URL}/${body.referenceId}/items` : BASE_URL;

    const response = await fetch(url, {
      method,
      headers,
      body: method === "GET" ? null : JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // In chi tiết lỗi từ server để dễ dàng debug
      const errorText = await response.text();
      console.error("Lỗi chi tiết từ server:", errorText);
      throw new Error(`Lỗi API: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
