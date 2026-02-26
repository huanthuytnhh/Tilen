import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LeaderboardModal = ({ isOpen, onClose, finishedPlayers, userApi }) => {
  const [playerNames, setPlayerNames] = useState({});

  // Fetch usernames when the modal is open
  useEffect(() => {
    if (isOpen) {
      const fetchPlayerNames = async () => {
        const names = {};
        for (const player of finishedPlayers) {
          try {
            const userResponse = await userApi.getUser(player.userId);
            names[player.userId] = userResponse.data.username;
          } catch (error) {
            console.error(
              `Failed to fetch username for ${player.userId}`,
              error
            );
            names[player.userId] = "Unknown Player"; // Default name on error
          }
        }
        setPlayerNames(names);
      };

      fetchPlayerNames();
    }
  }, [isOpen, finishedPlayers, userApi]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-96 rounded-lg shadow-lg p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
              onClick={onClose}
            >
              ✕
            </button>
            {/* Leaderboard Content */}
            <h3 className="text-xl font-bold text-center mb-4">
              🏆 Leaderboard
            </h3>
            <ol className="space-y-2">
              {finishedPlayers.map((player, index) => (
                <li key={player.userId} className="flex justify-between">
                  <span>Rank {index + 1}:</span>
                  <span className="font-semibold">
                    {playerNames[player.userId] || "Loading..."}
                  </span>
                </li>
              ))}
            </ol>
            {/* Play Again Button */}
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Play Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardModal;
