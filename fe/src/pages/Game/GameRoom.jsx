import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useRoom } from "../../contexts/RoomContext";
import GameBoard from "./GameBoard";
import Header from "../../components/Header";
import ShuffleCardLoader from "../../components/loader/ShuffleCardLoader";
import AvatarGroup from "../../components/ui/AvatarGroup";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import menuIcon from "../../assets/images/icons/menu-bar.png";
import gameRoomApi from "@/apis/gameRoomApi";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/clerk-react";

const GameRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useRoom();
  const { user } = useUser();
  const userId = user?.id;

  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playedCards, setPlayedCards] = useState([]);

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
      socket.emit("join_room", { roomId, userId });
    });

    socket.on("joined_room", ({ roomId, userId }) => {
      console.log(`Successfully joined room ${roomId} as user ${userId}`);
    });

    socket.on("update_players", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // socket.on("cards_dealt", (updatedPlayers) => {
    //   setPlayers(updatedPlayers);
    //   setGameStarted(true);
    //   setShowLoader(false);
    // });

    socket.on(
      "cards_played",
      ({ playedCards: newPlayedCards, nextPlayerIndex, updatedPlayers }) => {
        setPlayedCards((prev) => [...prev, ...newPlayedCards]);
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextPlayerIndex);
        setShowLoader(false);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("joined_room");
      socket.off("update_players");
      socket.off("cards_dealt");
      socket.off("cards_played");
    };
  }, [socket, roomId, userId]);

  const handleStartGame = () => {
    if (players.length < 2) {
      alert("Not enough players. Need at least 2 players to start the game.");
      return;
    }
    setShowLoader(true);
    socket.emit("deal_cards", roomId);
    setPlayedCards([]);
    setCurrentPlayerIndex(0);
  };

  const handleLeaveRoom = async () => {
    try {
      await gameRoomApi.leaveRoom(userId);
      socket.emit("leave_room", roomId);
      navigate("/");
    } catch (error) {
      console.error("Error updating game room ID:", error);
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev);
  };

  const handleNewMessage = (newMessage) => {
    socket.emit("send_message", { roomId, userId, message: newMessage });
  };

  return (
    <div className="relative flex flex-col items-center h-screen bg-gray-100">
      <div
        className={`fixed rounded-lg z-20 focus:outline-none ${
          isHeaderVisible ? "top-7 right-32" : "top-4 right-4"
        }`}
      >
        <div className="flex gap-2">
          <img src={menuIcon} alt="" className="w-7 h-7" />
          <Switch className="h-7" onClick={toggleHeader} />
        </div>
      </div>

      {isHeaderVisible && <Header />}

      {showLoader ? (
        <ShuffleCardLoader />
      ) : gameStarted ? (
        <GameBoard
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          playedCards={playedCards}
          roomId={roomId}
        />
      ) : (
        <div className="mb-5">
          <h1 className="text-4xl font-bold mb-0">Welcome to Room {roomId}!</h1>
          <p className="text-lg mb-8">
            The game will start soon. Waiting for players to join...
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleStartGame}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Start Game
            </button>
            <button
              onClick={handleLeaveRoom}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              Leave Room
            </button>
          </div>
        </div>
      )}

      {!gameStarted ? (
        <AvatarGroup
          players={players}
          currentPlayerIndex={currentPlayerIndex}
        />
      ) : null}

      <div className="scale-75 absolute bottom-0 right-0 z-20">
        <Widget
          handleNewUserMessage={handleNewMessage}
          title="In Game Chat"
          subtitle="Chat with other players"
        />
      </div>
    </div>
  );
};

export default GameRoom;
