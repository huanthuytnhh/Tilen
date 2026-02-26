import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate
import gameRoomApi from "../apis/gameRoomApi";
import io from "socket.io-client";
import PropTypes from "prop-types"; // Thêm prop-types
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import userApi from "@/apis/userApi";

// Create the RoomContext
const RoomContext = createContext();

// Custom hook to use RoomContext in components
export const useRoom = () => {
  return useContext(RoomContext);
};

// RoomProvider component
export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const { user, isSignedIn } = useUser();
  const userId = user?.id || null; // Use optional chaining and provide a fallback
  const avatarUrl = user?.imageUrl || ""; // Provide a default if undefined
  // URL ảnh đại diện người dùng

  useEffect(() => {
    if (!isSignedIn || !userId) return;
    let serverUrl = import.meta.env.VITE_SERVER_URL;
    const newSocket = io(serverUrl); // Kết nối socket.io
    setSocket(newSocket);

    // Đăng ký userId ngay sau khi socket kết nối
    newSocket.on("connect", () => {
      // console.log("Socket connected:", newSocket.id, "with user ID :", userId);
      // console.log("u:", newSocket.id);
      if (userId) {
        newSocket.emit("register", { userId: userId }); // Gửi sự kiện register
        // console.log(`Registered user ${userId} with socket ID ${newSocket.id}`);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup khi component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);
  const fetchRooms = async () => {
    try {
      // Lấy danh sách phòng từ gameRoomApi
      const response = await gameRoomApi.getGameRooms();
      const roomsData = response.data; // Danh sách phòng từ API

      // console.log("Fetched rooms from API:", roomsData);

      // Sử dụng Promise.all để lấy currentPlayerCount từ userApi
      const updatedRooms = await Promise.all(
        roomsData.map(async (room) => {
          const currentPlayers = await fetchCurrentPlayerCount(room.id);
          return { ...room, currentPlayerCount: currentPlayers };
        })
      );

      // console.log("Updated rooms with currentPlayerCount:", updatedRooms);

      // Cập nhật state
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms); // Đồng bộ filteredRooms
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching rooms or players:", error);
      setError("Không thể lấy danh sách phòng game.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchCurrentPlayerCount = async (roomId) => {
    try {
      const response = await userApi.getUsersInRoom(roomId);
      // console.log("API Response for room", roomId, response);
      const players = response; // Dữ liệu mong đợi
      // console.log("Players in room:", players);
      return players.length; // Trả về số lượng người chơi
    } catch (error) {
      // console.error(
      //   `Error fetching current players for room ${roomId}:`,
      //   error
      // );
      return 0; // Nếu lỗi, trả về 0
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("joined_room", (data) => {
        if (data.roomId) {
          navigate(`/room/${data.roomId}`);
        } else {
          console.error("No roomId in data:", data);
        }
      });
      socket.on("update_room_players", (updatedRooms) => {
        // console.log("Updated Rooms:", updatedRooms);
        fetchRooms();
      });
      socket.on("error", (errorMessage) => {
        setError(`Không thể tham gia phòng: ${errorMessage}`);
      });

      // Lắng nghe sự kiện receive_invite
      socket.on("receive_invite", async ({ fromUserId, roomId }) => {
        // console.log(
        //   `Received invite from user ${fromUserId} to join room ${roomId}`
        // );

        try {
          // Lấy userName từ API dựa trên fromUserId
          const userResponse = await userApi.getUser(fromUserId);
          const fromUserName = userResponse.data.username;

          // Hiển thị thông báo bằng react-toastify
          toast(
            ({ closeToast }) => (
              <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16.88 3.549a9 9 0 11-9.83 0M12 7v5l3 3"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-semibold text-gray-800">
                      📩 Lời mời tham gia phòng
                    </p>
                    <p className="text-sm text-gray-500">
                      Từ người dùng: <strong>{fromUserName}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Phòng: <strong className="text-gray-800">{roomId}</strong>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
                      onClick={() => {
                        console.log(`Accepted invite to room ${roomId}`);
                        socket.emit("respond_invite", {
                          roomId,
                          accept: true,
                          userId,
                        });
                        navigate(`/room/${roomId}`); // Chuyển hướng tới phòng
                        closeToast();
                      }}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                      onClick={() => {
                        console.log(`Rejected invite to room ${roomId}`);
                        socket.emit("respond_invite", {
                          roomId,
                          accept: false,
                          userId,
                        });
                        closeToast();
                      }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            ),
            {
              closeButton: false,
              position: "top-right",
              autoClose: false,
              className: "p-0",
            }
          );
        } catch (error) {
          console.error(
            `Failed to fetch userName for userId ${fromUserId}:`,
            error
          );
          toast.error("Không thể tải thông tin người gửi lời mời.");
        }
      });

      return () => {
        socket.off("joined_room");
        socket.off("error");
        // socket.off("update_room_players");
        socket.off("receive_invite"); // Cleanup sự kiện receive_invite
      };
    }
  }, [socket, navigate]);
  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       const userResponse = await userApi.getUser(player.userId);
  //       setUserName(userResponse.data.username);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //       setUserName("Unknown Player");
  //     }
  //   };

  //   fetchUserName();
  // }, [player.userId]);
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const searchResults = rooms.filter((room) =>
      room.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRooms(searchResults);
  };

  const handleFilter = (filter) => {
    let filtered = [];

    if (filter === "all") {
      filtered = rooms;
    } else if (filter === "available") {
      filtered = rooms.filter((room) => room.playerCount < 4);
    } else if (filter === "full") {
      filtered = rooms.filter((room) => room.playerCount >= 4);
    }

    setFilteredRooms(filtered);
  };

  const handleJoinRoom = async (roomId) => {
    if (socket) {
      console.log(`Joining room with ID: ${roomId} for user ID: ${userId}`);
      socket.emit("join_room", { roomId, userId, avatarUrl });

      try {
        await gameRoomApi.joinRoom(roomId, userId);
        navigate(`/room/${roomId}`);
        console.log(`User ${userId} joined room ${roomId} successfully`);
      } catch (error) {
        console.error("Error while updating gameRoomId:", error);
      }
    } else {
      console.error("Socket is not initialized.");
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        filteredRooms,
        searchTerm,
        handleSearch,
        handleFilter,
        loading,
        error,
        handleJoinRoom,
        socket,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

// Thêm prop validation
RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
