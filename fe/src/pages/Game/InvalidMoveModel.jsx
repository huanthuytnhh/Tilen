import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const InvalidMoveModal = ({
  isOpen,
  selectedCards,
  lastPlayedCards,
  onClose,
  imageMap,
}) => {
  if (!isOpen) return null;

  // Hàm để lấy ảnh của thẻ bài từ imageMap
  const getCardImage = (cardId) => {
    return imageMap[cardId] || "/default-card-image.svg"; // Nếu không có ảnh, sử dụng ảnh mặc định
  };

  // Chuyển selectedCards và lastPlayedCards thành các thẻ img
  const selectedCardsImages = selectedCards
    ? selectedCards.map((card) => (
        <img
          key={card.id}
          src={getCardImage(card.id)}
          alt={card.id}
          className="w-12 h-16 object-contain"
        />
      ))
    : [];

  const lastPlayedCardsImages = lastPlayedCards
    ? lastPlayedCards.map((card) => (
        <img
          key={card.id}
          src={getCardImage(card.id)}
          alt={card.id}
          className="w-12 h-16 object-contain"
        />
      ))
    : [];

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
          <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
            ❌ Invalid Move! ❌
          </h2>

          <div className="space-y-4 text-center">
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold">Selected Cards:</span>
              <br />
              <div className="flex space-x-2">{selectedCardsImages}</div>
            </p>

            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold">Last Played Cards:</span>
              <br />
              <div className="flex space-x-2">{lastPlayedCardsImages}</div>
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

InvalidMoveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedCards: PropTypes.array.isRequired,
  lastPlayedCards: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  imageMap: PropTypes.object.isRequired, // imageMap được truyền vào
};

export default InvalidMoveModal;
