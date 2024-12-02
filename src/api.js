// api.js
import axios from "axios";

// Hàm apiRequest giúp gửi yêu cầu HTTP với các phương thức khác nhau (GET, POST, PUT, DELETE)
export const apiRequest = async (method, data) => {
  const url = 'https://api.gameshift.dev/nx/users'; // URL của API của bạn
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI4ZGI1MTRiMC01YzJlLTRlMGItYmQ2Mi0zNjBiOThhZDZjZGYiLCJzdWIiOiJhZThjOTk0OS04MjUyLTQwNmUtODBkMS1iMzhhNDY4MWE4YzIiLCJpYXQiOjE3MzI0MzgwNzl9.JLD3LGE_0kt04Dcs78QqFI5Hpfl6GtFpMTlfCSXq7h8',
  };

  try {
    // Thực hiện yêu cầu với phương thức và dữ liệu truyền vào
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi
  }
};
