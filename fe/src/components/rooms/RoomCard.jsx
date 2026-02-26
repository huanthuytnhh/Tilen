// RoomCard.js
import React from "react";
import { Users, Settings, PlayCircle } from "lucide-react"; // icons for actions

const RoomCard = ({ name, players, maxPlayers, status }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Players: </span>
        {players}/{maxPlayers}
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Status: </span>
        {status}
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center w-full">
          <PlayCircle size={20} className="mr-2" />
          Join Room
        </button>
        <button className="bg-gray-500 text-white p-2 rounded-lg flex items-center justify-center w-full">
          <Settings size={20} className="mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
