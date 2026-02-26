import React from "react";
import { useRoom } from "../../contexts/RoomContext.jsx";
import { useAuth } from "@clerk/clerk-react";

const RoomItem = ({ room }) => {
  const { handleJoinRoom } = useRoom();
  const { userId } = useAuth(); // Lấy userId từ Clerk
  const { id, name, playerCount, currentPlayerCount } = room; // Lấy currentPlayerCount từ server

  // Placeholder avatars (có thể thay thế bằng ảnh người chơi thực)
  const playerAvatars = new Array(currentPlayerCount).fill(
    `https://api.multiavatar.com/${Math.random().toString(36).substring(7)}.svg`
  );

  return (
    <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">
          {currentPlayerCount}/{playerCount} players
        </p>
        <p
          className={`text-sm ${
            currentPlayerCount >= playerCount
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {currentPlayerCount >= playerCount ? "Room Full" : "Available"}
        </p>
        <div className="flex space-x-2 mt-2">
          {playerAvatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="Player Avatar"
              className="w-8 h-8 rounded-full"
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => handleJoinRoom(id, userId)} // Gọi hàm tham gia phòng
        disabled={currentPlayerCount >= playerCount}
        className={`px-4 py-2 rounded ${
          currentPlayerCount >= playerCount
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
        }`}
      >
        {currentPlayerCount >= playerCount ? "Full" : "Join"}
      </button>
    </div>
  );
};

export default RoomItem;
