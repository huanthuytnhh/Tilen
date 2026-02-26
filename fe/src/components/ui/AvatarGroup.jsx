import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons"; // Thêm FontAwesome icon

const AvatarGroup = ({ players, currentPlayerIndex }) => {
  return (
    <div className="flex space-x-2">
      {players.map((player, index) => (
        <div key={player.id} className="relative w-24 h-24">
          <img
            src={player.avatar} // Ensure each player object has an avatar property
            alt={`Player ${player.id}`}
            className={`rounded-full w-full h-full object-cover ${
              currentPlayerIndex === index ? "border-2 border-red-500" : ""
            }`}
          />
          {/* Icon Crown when current player */}
          {currentPlayerIndex === index && (
            <div className="absolute top-0 right-0 text-yellow-500 text-xl">
              <FontAwesomeIcon icon={faCrown} />
            </div>
          )}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-center">
            {/* Player {player.id} */}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
