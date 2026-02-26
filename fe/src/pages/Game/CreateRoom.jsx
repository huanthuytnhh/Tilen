import gameRoomApi from "@/apis/gameRoomApi"; // Nhập API để tạo phòng
import Header from "@/components/Header";
import { useAuth } from "@clerk/clerk-react"; // Nhập useAuth từ Clerk
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [playerCount, setPlayerCount] = useState(1); // State để lưu số lượng người chơi
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const { userId } = useAuth(); // Lấy userId từ Clerk

  const handleCreateRoom = async () => {
    try {
      const roomData = { name: roomName, playerCount }; // Tạo đối tượng dữ liệu
      console.log("Creating room with data:", roomData); // Log dữ liệu
      const response = await gameRoomApi.createRoom(roomData);
      console.log("Room created successfully:", response.data);

      // Gọi hàm join room để cập nhật gameRoomId cho người tạo phòng
      await gameRoomApi.joinRoom(response.data.id, userId); // Gọi API để tham gia phòng

      // Điều hướng đến trang phòng
      navigate(`/room/${response.data.id}`); // Chuyển hướng đến trang phòng với ID
    } catch (error) {
      console.error(
        "Error creating room:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const increasePlayerCount = () => {
    setPlayerCount((prevCount) => prevCount + 1);
  };

  const decreasePlayerCount = () => {
    setPlayerCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Đảm bảo số lượng không nhỏ hơn 1
  };

  function handleBack() {
    navigate("/home");
  }

  return (
    <div>
      <Header />
      <div className="relative w-full max-w-md mx-auto mt-10">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-0 left-0 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back
        </button>
        {/* <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"> */}
        <h2 className="text-2xl font-bold text-center mb-4">Create Room</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter Room Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={decreasePlayerCount}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            -
          </button>
          <span className="mx-4 text-lg">{playerCount}</span>
          <button
            onClick={increasePlayerCount}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <button
          onClick={handleCreateRoom}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
