import { motion, AnimatePresence } from "framer-motion";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PlayerHand from "../Game/PlayerHand";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import hold_card from "../../../public/card-game.png";
import back_of_card_image from "../../assets/images/cards/back_of_card.svg";
import CircularTimer from "./CircularTimer";
import PlayerHand from "./PlayerHand";
import userApi from "@/apis/userApi";

// GameBoard Component
const GameBoard = ({
  socket,
  players = [],
  player_inturn,
  current_player,
  onMoveCards,
  onPassTurn,
  playedCards = [],
  roomId,
  gameTime = 15,
}) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [remainingTime, setRemainingTime] = useState(gameTime);
  const [statusMessage, setStatusMessage] = useState("");
  const [userName, setUserName] = useState("");
  const passButtonRef = useRef(null);
  // Fetch user name for the player in turn
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (players[player_inturn]) {
          const userResponse = await userApi.getUser(
            players[player_inturn].userId
          );
          setStatusMessage(userResponse.data.username + "'s turn");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setStatusMessage("Unknown Player's turn");
      }
    };

    fetchUserName();
  }, [player_inturn, players]);

  // Fetch user name for the current player
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (players[current_player]) {
          const userResponse = await userApi.getUser(
            players[current_player].userId
          );
          setUserName(userResponse.data.username);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName("Unknown Player");
      }
    };

    fetchUserName();
  }, [current_player, players]);

  // Update status message based on the turn
  useEffect(() => {
    if (players.length >= 2 && players[current_player]) {
      if (player_inturn === current_player) {
        setStatusMessage(`${userName}'s turn`);
      } else {
        setStatusMessage(`${userName} passed the turn`);
      }
    }
  }, [player_inturn, current_player, players, userName]);

  // Countdown timer
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [remainingTime]);

  // Socket event listeners to reset the timer
  useEffect(() => {
    if (!socket) return;

    const handleCardsPlayed = () => {
      setRemainingTime(gameTime);
    };

    const handleTurnPassed = () => {
      setRemainingTime(gameTime);
    };

    // Register event listeners
    socket.on("cards_played", handleCardsPlayed);
    socket.on("turn_passed", handleTurnPassed);

    // Cleanup listeners on unmount or when socket changes
    return () => {
      socket.off("cards_played", handleCardsPlayed);
      socket.off("turn_passed", handleTurnPassed);
    };
  }, [socket, gameTime]);

  // Thêm useEffect để kiểm tra khi remainingTime bằng 0
  useEffect(() => {
    if (remainingTime === 0) {
      if (passButtonRef.current) {
        passButtonRef.current.click();
      }
    }
  }, [remainingTime]);

  const toggleCardSelection = (card) => {
    if (selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleMove = () => {
    if (selectedCards.length > 0) {
      onMoveCards(selectedCards);
      setSelectedCards([]); // Clear selected cards after move
    }
  };

  const handlePass = () => {
    onPassTurn(); // Call the pass turn function
    setSelectedCards([]); // Clear selected cards
    setRemainingTime(gameTime); // Reset the timer after passing turn
    // console.log("Dele");
  };

  // Ensure at least two players are present
  if (!players || players.length < 2) {
    return (
      <div>
        Error: Not enough players. Need at least 2 players to start the game.
      </div>
    );
  }

  // Helper to get player index based on current player turn
  const get = (x) => {
    return (x + current_player) % players.length;
  };

  return (
    <div className="grid grid-rows-4 grid-cols-4 h-4/5 w-screen gap-4">
      {/* Player 0 - South */}
      {players.length >= 1 && players[get(0)] && (
        <div className="flex justify-center items-center row-start-4 col-start-2 col-span-2">
          <PlayerHand
            player={players[get(0)]}
            isCurrentTurn={get(0) === player_inturn}
            onCardSelect={toggleCardSelection}
            selectedCards={selectedCards}
            direction="horizontal"
            roomId={roomId}
            seat={"south"}
            socket={socket}
          />
        </div>
      )}

      {/* Player 1 - East */}
      {players.length >= 2 && players[get(1)] && (
        <div className="flex justify-center items-center row-start-2 col-start-4 row-span-2">
          <PlayerHand
            player={players[get(1)]}
            isCurrentTurn={get(1) === player_inturn}
            onCardSelect={toggleCardSelection}
            selectedCards={selectedCards}
            direction="vertical"
            roomId={roomId}
            seat={"east"}
            socket={socket}
          />
        </div>
      )}
      {/* Player 3 - North */}
      {players.length >= 3 && players[get(2)] && (
        <div className="flex justify-center items-center row-start-1 col-start-2 col-span-2">
          <PlayerHand
            player={players[get(2)]}
            isCurrentTurn={get(2) === player_inturn}
            onCardSelect={toggleCardSelection}
            selectedCards={selectedCards}
            direction="horizontal"
            roomId={roomId}
            seat={"north"}
            socket={socket}
          />
        </div>
      )}
      {/* Player 1 - East */}
      {players.length >= 4 && players[get(3)] && (
        <div className="flex justify-center items-center row-start-2 col-start-1 row-span-2">
          <PlayerHand
            player={players[get(3)]}
            isCurrentTurn={get(3) === player_inturn}
            onCardSelect={toggleCardSelection}
            selectedCards={selectedCards}
            direction="vertical"
            roomId={roomId}
            seat={"west"}
            socket={socket}
          />
        </div>
      )}
      {/* Played Cards - Center */}
      <div
        className="flex flex-col justify-center items-center row-start-2 col-start-2 col-span-2 row-span-2 h-full min-h-full"
        style={{
          border: "20px solid white",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        <div className="text-xl font-semibold flex items-center gap-4 mb-5">
          <span>{statusMessage}</span>
          <CircularTimer
            // className="scale-50"
            timeLeft={remainingTime}
            totalTime={gameTime}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 w-11/12 h-1/2 border-2 shadow-lg rounded-lg p-4 overflow-auto">
          {playedCards.map((card, index) => {
            const [value, suit] = card.id.split(" of ");
            return (
              <div
                key={`${value}-${suit}-${index}`}
                className="px-2 rounded-lg text-center"
              >
                <img
                  src={card.image}
                  alt={`${value} of ${suit}`}
                  className="w-12 h-18"
                />
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <motion.button
            onClick={handleMove}
            className={`bg-green-500 text-white px-6 py-2 rounded-lg ${
              selectedCards.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={selectedCards.length === 0}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <img
              src={hold_card}
              alt="icon"
              className="inline-block w-5 h-5 mr-2"
            />
            Move
          </motion.button>

          <motion.button
            ref={passButtonRef}
            onClick={handlePass}
            className={`bg-gray-500 text-white font-bold px-6 py-2 rounded-lg ${
              get(0) !== player_inturn ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={get(0) !== player_inturn}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <FontAwesomeIcon icon={faForward} /> Pass
          </motion.button>
        </div>
      </div>

      {/* Selected Cards in Center with AnimatePresence */}
      <AnimatePresence>
        {selectedCards.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {selectedCards.map((card, index) => (
              <motion.div
                key={card.id} // Ensure the key is unique to allow re-render
                className="px-2"
                initial={{ opacity: 0, scale: 0.5, y: -100 }} // Initial state for animation
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2, // Staggering the animation for each card
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: 100,
                  transition: { duration: 0.3 }, // Exit transition
                }}
              >
                <img
                  src={card.image}
                  alt={`Selected ${card.id}`}
                  className="w-12 h-18"
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

GameBoard.propTypes = {
  socket: PropTypes.object.isRequired, // Ensure socket is passed and is an object
  players: PropTypes.array.isRequired,
  player_inturn: PropTypes.number.isRequired,
  current_player: PropTypes.number.isRequired,
  onMoveCards: PropTypes.func.isRequired,
  onPassTurn: PropTypes.func.isRequired,
  playedCards: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  gameTime: PropTypes.number, // Optional, defaults to 10
};

export default GameBoard;
