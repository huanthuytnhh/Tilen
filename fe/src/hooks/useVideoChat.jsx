import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useUser } from "@clerk/clerk-react";

const useVideoChat = (roomId, socket) => {
  const [players, setPlayers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const peer = useRef(null);
  const peers = useRef({});
  const { user } = useUser();

  // Initialize PeerJS and get user media
  useEffect(() => {
    if (!user?.id || !socket || isInitialized) return;

    const initVideoChat = async () => {
      try {
        // Get user media first
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Local stream obtained:", stream);
        setLocalStream(stream);

        // Initialize PeerJS after getting stream
        peer.current = new Peer(user.id, {
          debug: 2, // Enable detailed logging
        });

        peer.current.on("open", (id) => {
          console.log(`PeerJS connected with ID: ${id}`);
          socket.emit("join_room", { roomId, userId: id });
          // Add local player immediately
          updatePlayers(id, stream);
          setIsInitialized(true);
        });

        peer.current.on("call", (call) => {
          console.log(`Incoming call from: ${call.peer}`);
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            console.log(`Remote stream received from: ${call.peer}`);
            updatePlayers(call.peer, remoteStream);
          });

          peers.current[call.peer] = call;
        });

        peer.current.on("error", (err) => {
          console.error("PeerJS error:", err);
        });
      } catch (error) {
        console.error("Failed to initialize video chat:", error);
      }
    };

    initVideoChat();

    return () => cleanup();
  }, [user?.id, socket, roomId]);

  // Handle socket events for room updates
  useEffect(() => {
    if (!socket || !isInitialized || !localStream) return;

    const handleUpdatePlayers = (updatedPlayers) => {
      console.log("Received updated players:", updatedPlayers);

      updatedPlayers.forEach((player) => {
        if (player.userId !== user?.id && !peers.current[player.userId]) {
          makeCall(player.userId);
        }
      });

      syncPlayers(updatedPlayers);
    };

    socket.on("update_players", handleUpdatePlayers);
    socket.on("user_left", removePlayer);

    return () => {
      socket.off("update_players", handleUpdatePlayers);
      socket.off("user_left", removePlayer);
    };
  }, [socket, isInitialized, localStream, user?.id]);

  const makeCall = (userId) => {
    if (!peer.current || !localStream) return;

    console.log(`Initiating call to: ${userId}`);
    const call = peer.current.call(userId, localStream);

    if (call) {
      call.on("stream", (remoteStream) => {
        console.log(`Stream received in call from: ${userId}`);
        updatePlayers(userId, remoteStream);
      });

      call.on("error", (err) => {
        console.error(`Call error with ${userId}:`, err);
      });

      peers.current[userId] = call;
    }
  };

  const updatePlayers = (userId, stream) => {
    setPlayers((prevPlayers) => {
      // If player exists, update their stream
      const existingPlayerIndex = prevPlayers.findIndex(
        (p) => p.userId === userId
      );

      if (existingPlayerIndex !== -1) {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[existingPlayerIndex] = {
          ...updatedPlayers[existingPlayerIndex],
          stream: userId === user?.id ? localStream : stream,
        };
        return updatedPlayers;
      }

      // If player doesn't exist, add them
      return [
        ...prevPlayers,
        {
          userId,
          stream: userId === user?.id ? localStream : stream,
        },
      ];
    });
  };

  const syncPlayers = (updatedPlayers) => {
    setPlayers((prevPlayers) =>
      updatedPlayers.map((player) => ({
        ...player,
        stream:
          player.userId === user?.id
            ? localStream
            : prevPlayers.find((p) => p.userId === player.userId)?.stream ||
              null,
      }))
    );
  };

  const removePlayer = (userId) => {
    console.log(`Removing player: ${userId}`);
    setPlayers((prev) => prev.filter((p) => p.userId !== userId));

    if (peers.current[userId]) {
      peers.current[userId].close();
      delete peers.current[userId];
    }
  };

  const cleanup = () => {
    console.log("Cleaning up video chat resources");

    // Close all peer connections
    Object.values(peers.current).forEach((call) => call.close());
    peers.current = {};

    // Destroy PeerJS instance
    if (peer.current) {
      peer.current.destroy();
      peer.current = null;
    }

    // Stop all local media tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    setPlayers([]);
    setLocalStream(null);
    setIsInitialized(false);
  };

  return {
    players,
    localStream,
    isInitialized,
  };
};

export default useVideoChat;
