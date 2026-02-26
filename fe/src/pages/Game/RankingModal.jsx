import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Confetti from "react-confetti";
import userApi from "@/apis/userApi";

const RankingModal = ({ isOpen, winners, loser, onClose }) => {
  const audioRef = useRef(null); // Tham chiếu tới audio
  const [usernames, setUsernames] = useState({}); // Lưu mapping userId -> username

  useEffect(() => {
    if (isOpen && winners.length > 0) {
      const fetchUsernames = async () => {
        const usernameMap = {};

        // Fetch usernames cho người thắng
        for (let winner of winners) {
          try {
            const response = await userApi.getUser(winner.userId);
            usernameMap[winner.userId] = response.data.username;
          } catch (error) {
            console.error(
              `Failed to fetch username for userId ${winner.userId}:`,
              error
            );
            usernameMap[winner.userId] = "Unknown";
          }
        }

        // Fetch username cho người thua (loser)
        if (loser) {
          try {
            const response = await userApi.getUser(loser);
            usernameMap[loser] = response.data.username;
          } catch (error) {
            console.error(
              `Failed to fetch username for loser ${loser}:`,
              error
            );
            usernameMap[loser] = "Unknown";
          }
        }

        setUsernames(usernameMap);
      };

      fetchUsernames();

      if (audioRef.current) {
        audioRef.current.load(); // Tải âm thanh khi modal được bật

        // Tự động phát âm thanh nếu trình duyệt cho phép
        const playSound = async () => {
          try {
            await audioRef.current.play();
            console.log("Sound played successfully.");
          } catch (error) {
            console.error(
              "Autoplay failed due to browser restrictions. User interaction is required.",
              error
            );
          }
        };

        playSound();
      }
    }
  }, [isOpen, winners, loser]);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Phát âm thanh khi nhấn nút Sound
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hiệu ứng pháo hoa */}
        <Confetti width={window.innerWidth} height={window.innerHeight} />

        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 w-96 relative"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            🏆 Game Over 🏆
          </h2>

          <div className="space-y-4">
            {winners.map((winner, index) => (
              <motion.div
                key={winner.userId}
                className={`flex items-center justify-between ${
                  index === 0 ? "bg-yellow-300" : "bg-gray-200"
                } px-4 py-2 rounded-lg shadow`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <span className="font-bold text-lg ">
                  Rank {index + 1}: {usernames[winner.userId] || "Loading..."}
                </span>
                {index === 0 && (
                  <motion.span
                    className="text-lg font-bold text-yellow-800"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.5,
                    }}
                  >
                    👑
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {loser && (
            <div className="mt-4 bg-red-200 text-center py-2 rounded-lg ">
              <p className="text-red-700 font-bold">
                Loser: {usernames[loser] || "Loading..."}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-between gap-4">
            {/* Nút phát âm thanh */}
            <button
              onClick={handlePlaySound}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              🔊 Play Sound
            </button>

            {/* Nút đóng modal */}
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>

          {/* Âm thanh chiến thắng */}
          <audio ref={audioRef}>
            <source src="/victory.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

RankingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  winners: PropTypes.array.isRequired,
  loser: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default RankingModal;
