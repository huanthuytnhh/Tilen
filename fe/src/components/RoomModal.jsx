// RoomModal.jsx
import React from "react";

function RoomModal({ isOpen, onClose, onCreateRoom, onJoinRoom }) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Choose an option</h2>
        <button
          onClick={onCreateRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Create Room
        </button>
        <button
          onClick={onJoinRoom}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Join Room
        </button>
        <button onClick={onClose} className="ml-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}

export default RoomModal;
