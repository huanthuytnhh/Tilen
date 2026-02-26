import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  SquarePlus,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

const Room_Data = [
  {
    id: 1,
    name: "Room A",
    owner: "Mudassar",
    status: "Available",
    players: 4,
  },
  {
    id: 2,
    name: "Room B",
    owner: "Ustad g",
    status: "Unavailable",
    players: 3,
  },
  {
    id: 3,
    name: "Room C",
    owner: "Wahab",
    status: "Available",
    players: 2,
  },
  {
    id: 4,
    name: "Room D",
    owner: "Danish",
    status: "Available",
    players: 5,
  },
];

const RoomTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(Room_Data);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const itemsPerPage = 5;
  const [newRoom, setNewRoom] = useState({
    name: "",
    owner: "",
    status: "",
    players: "",
  });
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  // Handle Search
  const SearchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Room_Data.filter(
      (room) =>
        room.name.toLowerCase().includes(term) ||
        room.owner.toLowerCase().includes(term)
    );
    setFilteredRooms(filtered);
    setCurrentPage(1);
  };

  // Edit Room Function
  const handleEdit = (room) => {
    setEditRoom(room);
    setEditModalOpen(true);
  };
  const handleAdd = () => {
    const newId =
      filteredRooms.length > 0
        ? Math.max(...filteredRooms.map((room) => room.id)) + 1
        : 1;
    const RoomToAdd = {
      ...newRoom,
      id: newId,
      name: String(newRoom.name),
      owner: String(newRoom.owner),

      status: String(newRoom.status),
      players: String(newRoom.players),
    };
    setFilteredRooms([RoomToAdd, ...filteredRooms]);
    setAddModalOpen(false);
    setNewRoom({ name: "", owner: "", status: "", players: "" }); // Reset new user state
  };
  // Delete Room Function
  const handleDelete = (roomId) => {
    const updatedRooms = filteredRooms.filter((room) => room.id !== roomId);
    setFilteredRooms(updatedRooms);
  };

  // Save Function
  const handleSave = () => {
    const updatedRooms = filteredRooms.map((room) =>
      room.id === editRoom.id ? editRoom : room
    );
    setFilteredRooms(updatedRooms);
    setEditModalOpen(false);
  };

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getCurrentPageRooms = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRooms.slice(start, start + itemsPerPage);
  };

  return (
    <motion.div
      className=" bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border mb-6 relative z-10"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Room List</h2>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Room..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={SearchHandler}
            value={searchTerm}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" style={{ minHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-400">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Room Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Players
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {getCurrentPageRooms().map((room) => (
              <motion.tr
                key={room.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-black ">
                  {room.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {room.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-4 inline-flex rounded-full text-xs leading-5 font-semibold ${
                      room.status === "Available"
                        ? "bg-green-700 text-green-100"
                        : "bg-red-700 text-red-100"
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{room.players}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setAddModalOpen(true)}
                    className="text-green-500 hover:text-green-600 mr-4"
                  >
                    <SquarePlus size={19} />
                  </button>
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-3"
                    onClick={() => handleEdit(room)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(room.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-sm px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "text-gray-400 border-gray-600"
                : "text-gray-100 border-gray-300 hover:bg-gray-300 hover:text-gray-800"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="mx-2 text-sm font-medium text-gray-100">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`text-sm px-3 py-1 border rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-600"
                : "text-gray-100 border-gray-300 hover:bg-gray-300 hover:text-gray-800"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="text-sm font-medium text-gray-300 tracking-wider">
          Total Rooms: {filteredRooms.length}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-semibold text-gray-100 mb-3 underline tracking-wider">
              Edit Room
            </h1>
            <div className="flex flex-col space-y-3">
              <label className="text-sm text-gray-300">Room Name</label>
              <input
                type="text"
                value={editRoom.name}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, name: e.target.value })
                }
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setAddModalOpen(true)}
                className="text-green-500 hover:text-green-600"
              >
                <UserPlus size={20} />
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-600 hover:bg-red-500 text-gray-100 px-4 py-2 rounded-md"
              >
                <X size={22} />
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-800 text-white text-md px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-semibold text-gray-100 mb-6 underline tracking-wider">
              Add New Room
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-300">Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, name: e.target.value })
                  }
                  placeholder="Room Name"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-300">Owner</label>
                <input
                  type="text"
                  value={newRoom.owner}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, owner: e.target.value })
                  }
                  placeholder="Owner Name"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-300">Status</label>
                <select
                  value={newRoom.status}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm text-gray-300">Players</label>
                <input
                  type="number"
                  value={newRoom.players}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, players: e.target.value })
                  }
                  placeholder="Number of Players"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setAddModalOpen(false)}
                className="bg-gray-600 hover:bg-red-500 text-gray-100 px-4 py-2 rounded-md"
              >
                <X size={22} />
              </button>
              <button
                onClick={handleAdd}
                className="bg-blue-600 hover:bg-blue-800 text-white text-md px-4 py-3 rounded-md w-28"
              >
                Add Room
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RoomTable;
