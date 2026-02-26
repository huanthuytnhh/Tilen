import React, { useState, useEffect } from "react";
import userApi from "../apis/userApi"; // Cập nhật import từ object API

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);

  // Lấy thông tin profile người dùng
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await userApi.getProfile(); // Gọi hàm từ object
        setProfile(userProfile);
      } catch (err) {
        console.error("Failed to fetch profile", err); // Bắt lỗi nếu có
      }
    };

    fetchProfile();
  }, []);

  // Hàm xử lý cập nhật profile
  const handleEditProfile = async () => {
    try {
      await userApi.editProfile(profile); // Gọi hàm từ object
      setEditing(false);
    } catch (err) {
      console.error("Failed to edit profile", err); // Bắt lỗi nếu có
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {editing ? (
        <div>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <button onClick={handleEditProfile}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
