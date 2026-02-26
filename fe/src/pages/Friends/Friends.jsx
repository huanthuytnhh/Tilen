import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import friendApi from "../../apis/friendApi"; // Import object friendApi

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useAuth();

  // Lấy danh sách bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendList = await friendApi.getFriends(userId); // Gọi hàm getFriends từ friendApi
        setFriends(friendList);
      } catch (err) {
        setError("Failed to fetch friends. Please try again.");
      }
    };

    if (userId) {
      fetchFriends();
    }
  }, [userId]);

  // Hàm xử lý chọn bạn
  const handleFriendSelect = async (friend) => {
    setSelectedFriend(friend);
    try {
      const chatMessages = await friendApi.getMessages(friend.id);
      setMessages(chatMessages);
    } catch (err) {
      setError("Failed to load messages. Please try again.");
    }
  };

  // Hàm gửi tin nhắn
  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedFriend) return;

    try {
      await friendApi.sendMessage(selectedFriend.id, message); // Gọi hàm sendMessage từ friendApi
      setMessages((prev) => [...prev, { text: message, sender: "me" }]);
      setMessage("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="friends-page">
      <h2>Friends</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="friends-list">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`friend-item ${
              selectedFriend?.id === friend.id ? "selected" : ""
            }`}
            onClick={() => handleFriendSelect(friend)}
          >
            {friend.name}
          </div>
        ))}
      </div>
      {selectedFriend && (
        <div className="chat-container">
          <h3>Chat with {selectedFriend.name}</h3>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "me" ? "my-message" : "friend-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Friends;
