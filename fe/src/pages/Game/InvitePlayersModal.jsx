import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const InvitePlayersModal = ({ isOpen, onClose, onlineUsers, handleInvite }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 w-96 relative"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Invite Players
          </h2>

          <div className="space-y-4">
            {onlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow"
              >
                <span className="text-lg font-semibold">{user.username}</span>
                <button
                  onClick={() => handleInvite(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Invite
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

InvitePlayersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onlineUsers: PropTypes.array.isRequired,
  handleInvite: PropTypes.func.isRequired,
};

export default InvitePlayersModal;
