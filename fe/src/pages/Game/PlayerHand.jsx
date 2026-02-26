import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import userApi from "@/apis/userApi";
import VideoChat from "./VideoChat";
import useAgoraVideo from "@/hooks/useAgoraVideo";
import { motion } from "framer-motion";
import back_of_card_image from "../../assets/images/cards/back_of_card.svg";
const PlayerHand = ({
  player,
  isCurrentTurn,
  onCardSelect,
  selectedCards,
  direction,
  roomId,
  socket,
}) => {
  const [userName, setUserName] = useState("Loading...");
  const { user } = useUser();
  const userId = user ? user.id : null;

  const {
    players,
    localStream,
    loading,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAgoraVideo(roomId, socket);
  const [playerStream, setPlayerStream] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userResponse = await userApi.getUser(player.userId);
        setUserName(userResponse.data.username);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName("Unknown Player");
      }
    };

    fetchUserName();
  }, [player.userId]);

  useEffect(() => {
    // Lấy stream video của người chơi
    if (player.userId === userId) {
      setPlayerStream(localStream);
    } else {
      const remotePlayer = players.find((p) => p.userId === player.userId);
      setPlayerStream(remotePlayer?.stream);
    }
  }, [players, localStream, player.userId, userId]);

  if (loading) {
    return <div>Loading video...</div>;
  }
  const renderCards = () => {
    const isCurrentPlayer = userId === player.userId;

    if (isCurrentPlayer) {
      return player.hand.map((card) => {
        const isSelected = selectedCards.find((c) => c.id === card.id);

        return (
          <motion.div
            key={card.id}
            onClick={() => isCurrentTurn && onCardSelect(card)}
            initial={{ scale: 1.25 }} // Base size 70% larger than normal
            animate={{
              scale: isSelected ? 2 : 1.7, // 80% bigger if selected, 70% if not selected
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`cursor-pointer ${
              direction === "vertical" ? "rotate-90" : ""
            }`}
          >
            <motion.img
              src={card.image}
              alt={card.value}
              className="w-[32px] h-[64px] md:w-[40px] md:h-[80px]" // Size 70% bigger
            />
          </motion.div>
        );
      });
    } else {
      // Render the back of the cards if not the current player
      return Array(player.hand.length)
        .fill(null)
        .map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`transition-transform duration-200 ${
              direction === "vertical" ? "rotate-90" : ""
            }`}
          >
            <motion.img
              src={back_of_card_image}
              alt="Card back"
              className="w-[32px] h-[64px] md:w-[40px] md:h-[80px]" // Size 70% bigger
            />
          </motion.div>
        ));
    }
  };

  return (
    <div className="flex items-center pt-10 pr-28">
      <div className="flex flex-col items-center">

        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-2">
          {playerStream && (
            <VideoChat
              stream={playerStream}
              isLocal={player.userId === userId}
              userName={userName}
              isAudioEnabled={isAudioEnabled}
              isVideoEnabled={isVideoEnabled}
              onToggleAudio={toggleAudio}
              onToggleVideo={toggleVideo}
            />
          )}
        </div>

        <h2 className="text-lg font-semibold mb-2">
          {userName} ({player.hand.length} cards)
        </h2>
      </div>
      <div className="flex flex-col items-center min-w-full">
        <div
          className={`flex ${
            direction === "horizontal"
              ? "flex-row -space-x-0"
              : "flex-col -space-y-14"
          }`}
        >
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;
