import React, { useState } from "react";
import { Settings, X } from "lucide-react";

const RoomSettingsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [gameRules, setGameRules] = useState("Standard");

  const handleSaveSettings = () => {
    // Logic to save room settings
    console.log("Room settings saved:", { maxPlayers, gameRules });
    setShowModal(false); // Close the modal
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-yellow-500 text-white p-4 rounded-lg flex items-center justify-center w-full hover:bg-yellow-600 transition-all"
      >
        <Settings size={20} className="mr-2" />
        Room Settings
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Room Settings</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              {/* Max Players Input */}
              <div>
                <label className="text-sm text-gray-700">Max Players</label>
                <input
                  type="number"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  className="mt-2 w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="2"
                  max="10" // Optional: max limit for players
                />
              </div>
              {/* Game Rules Input */}
              <div>
                <label className="text-sm text-gray-700">Game Rules</label>
                <input
                  type="text"
                  value={gameRules}
                  onChange={(e) => setGameRules(e.target.value)}
                  className="mt-2 w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter game rules"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomSettingsModal;
