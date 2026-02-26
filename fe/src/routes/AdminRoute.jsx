import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import userApi from "../apis/userApi"; // Sử dụng API có sẵn
import { useUser } from "@clerk/clerk-react"; // Giả sử bạn dùng Clerk

const AdminRoute = ({ component: Component }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser(); // Lấy thông tin người dùng từ Clerk
  const userId = user?.id; // Lấy userId từ Clerk

  useEffect(() => {
    const fetchRole = async () => {
      try {
        // Gọi API để lấy thông tin người dùng
        const response = await userApi.getUser(userId);
        const userInfo = response.data; // Route: `/user/:id`

        console.log("hemhem", userInfo);
        if (userInfo.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRole();
    } else {
      setLoading(false); // Nếu không có userId, dừng tải
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang kiểm tra vai trò
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />; // Chuyển hướng nếu không phải admin
  }

  return <Component />;
};

export default AdminRoute;
