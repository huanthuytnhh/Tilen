const rooms = {};
const gameRoomService = require("../services/gameRoomService");
const logs = []; // Array to store the logs
const invitationCount = { total: 0 }; // To track the total number of invitations
const messageCount = { total: 0 }; // To track the total number of chat messages
// In your socketHandler file
// const imageMap = require("../../utils/imageMap"); // CommonJS
// ES6
// Adjust the path accordingly
function addLog(message) {
  logs.push({
    timestamp: new Date().toISOString(),
    message,
  });

  // Keep only the latest 100 logs to prevent the array from growing indefinitely
  if (logs.length > 100) {
    logs.shift();
  }
}
function getFourOfAKind(deck) {
  const cardOrder = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
    "2",
  ];
  for (let value of cardOrder) {
    const fourCards = deck.filter((card) => card.value === value);
    if (fourCards.length >= 4) {
      return fourCards.splice(0, 4); // Lấy tứ quý
    }
  }
  return [];
}

function getThreePairsStraight(deck) {
  const cardOrder = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  const pairs = [];
  for (let value of cardOrder) {
    const twoCards = deck.filter((card) => card.value === value);
    if (twoCards.length >= 2) {
      pairs.push(...twoCards.splice(0, 2)); // Lấy đôi
      if (pairs.length === 6) break; // Đủ 3 đôi liên tiếp
    }
  }
  return pairs.length === 6 ? pairs : [];
}
function updateRoomPlayers(io) {
  // Tạo danh sách thông tin phòng và phát tới tất cả client
  io.emit(
    "update_room_players",
    Object.entries(rooms).map(([roomId, room]) => ({
      id: roomId,
      name: room.name || `Room ${roomId}`,
      playerCount: room.playerCount || 4, // Số lượng tối đa người chơi
      currentPlayerCount: room.players.length, // Số lượng người chơi hiện tại
    }))
  );
}

function generateCards() {
  const suits = ["spades", "hearts", "diamonds", "clubs"];
  const values = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  const allCards = [];

  for (let suit of suits) {
    for (let value of values) {
      allCards.push({
        id: `${value} of ${suit}`,
        value: value,
        suit: suit,
        image: null, // Adjust the path according to your setup
      });
    }
  }

  return allCards.sort(() => Math.random() - 0.5); // Shuffle the deck
}
// import imageMap from "../../utils/imageMap";
function broadcastOnlineUsers(io) {
  const onlineUsersList = Object.entries(global.onlineUsers || {}).map(
    ([userId, socketId]) => ({
      userId,
      socketId,
    })
  );

  // console.log("Online Users:", JSON.stringify(onlineUsersList, null, 2));

  // Phát danh sách này tới tất cả client
  io.emit("update_online_users", onlineUsersList);
}
function socketHandler(io) {

  const invitations = {}; // Bộ nhớ tạm lưu trữ lời mời: { toUserId: { fromUserId, roomId } }
  const onlineUsers = {}; // Quản lý trạng thái người dùng online: { userId: socketId }


  io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on("register", ({ userId }) => {
      global.onlineUsers = global.onlineUsers || {};
      global.onlineUsers[userId] = socket.id;
      // console.log(`User ${userId} registered with socket ID: ${socket.id}`);
      // addLog(`User ${userId} registered with socket ID: ${socket.id}`); // Add log here
      broadcastOnlineUsers(io); // Phát danh sách userId online
    });
    socket.on("sync_online_users", ({ onlineUsersList }) => {
      // Cập nhật danh sách online users trên server của người dùng này
      onlineUsersList.forEach(({ userId, socketId }) => {
        onlineUsers[userId] = socketId;
      });


      // console.log("Updated online users:", onlineUsers);
    });

    socket.on("join_room", ({ roomId, userId, avatarUrl }) => {

      socket.join(roomId);
      console.log(
        `Socket ${socket.id} with User ID ${userId} joined room ${roomId}`
      );
      addLog(
        `Socket ${socket.id} with User ID ${userId} joined room ${roomId}`
      ); // Add log here

      if (!rooms[roomId]) {
        rooms[roomId] = {
          players: [],
          gameStarted: false,
          gameState: null,
          playedCards: [],
          finishedPlayers: [],
          currentTurn: null,
          videoUsers: new Set(), // Thêm để theo dõi người dùng video
        };
      }


      // Thêm người chơi vào phòng nếu chưa tồn tại
      if (!rooms[roomId].players.some((player) => player.userId === userId)) {
        rooms[roomId].players.push({
          id: socket.id,
          userId,
          hand: [],
          movedCards: [],
          avatar: avatarUrl,
        });
        rooms[roomId].videoUsers.add(userId); // Thêm vào danh sách video users
      }


      io.in(roomId).emit("update_players", rooms[roomId].players);
      io.in(roomId).emit(
        "video_users_updated",
        Array.from(rooms[roomId].videoUsers)
      );
      updateRoomPlayers(io);
      console.log(
        `Number of players in room ${roomId}: ${rooms[roomId].players.length}`
      );
      addLog(
        `Number of players in room ${roomId}: ${rooms[roomId].players.length}`
      );
      socket.emit("joined_room", { roomId, userId, avatarUrl });
    });
    socket.on("players_updated", (updatedPlayers) => {
      console.log(
        "Received updated players list from a client:",
        updatedPlayers
      );

      // You can either broadcast the updated players list to other clients in the room
      socket.broadcast.emit("players_updated", updatedPlayers); // Broadcast to all other clients
    });
    socket.on("send_invite", ({ toUserId, fromUserId, roomId }) => {
      const targetSocketId = onlineUsers[toUserId];
      if (targetSocketId) {
        io.to(targetSocketId).emit("receive_invite", {
          fromUserId,
          roomId,
        });
        console.log(
          `Invite sent from ${fromUserId} to ${toUserId} for room ${roomId}`
        );
        addLog(
          `Invite sent from ${fromUserId} to ${toUserId} for room ${roomId}`
        );
        socket.emit("invite_status", { success: true });
        invitationCount.total++;
      } else {
        console.warn(`User is not online.`);
        socket.emit("invite_status", {
          success: false,
          message: `User ${toUserId} is not online.`,
        });
      }
    });

    socket.on("respond_invite", ({ roomId, accept, userId }) => {
      if (accept) {
        socket.join(roomId);
        console.log(
          `User ${userId} accepted the invite and joined room ${roomId}`
        );
        addLog(`User ${userId} accepted the invite and joined room ${roomId}`);
      } else {
        console.log(`User ${userId} declined the invite.`);
        addLog(`User ${userId} declined the invite.`);
      }
    });

    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
      const room = rooms[roomId];
      if (room) {
        room.players = room.players.filter((player) => player.id !== socket.id);
        console.log(
          `Number of players in room ${roomId}: ${room.players.length}`
        );
        addLog(`Number of players in room ${roomId}: ${room.players.length}`);
        io.in(roomId).emit("update_players", room.players);

        if (room.players.length === 0) {
          delete rooms[roomId];
        } else if (room.players.length === 1 || !room.gameStarted) {
          room.gameStarted = false;
          room.playedCards = [];
          room.finishedPlayers = [];
          room.currentTurn = null;
          room.players.forEach((player) => {
            player.hand = [];
            player.movedCards = [];
            player.isFinished = false;
          });
          io.in(roomId).emit("game_reset", {
            message: "The game has been reset because a player left.",
          });
        }
      }
      const userId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      socket.to(roomId).emit("user_left", {
        userId: userId,
      });
      updateRoomPlayers(io); // Gọi sự kiện update_room_players

      if (userId && room.videoUsers) {
        room.videoUsers.delete(userId);
        io.in(roomId).emit("video_users_updated", Array.from(room.videoUsers));
      }
    });

    socket.on("deal_cards", (roomId) => {
      const room = rooms[roomId];
      if (!room || room.gameStarted) {
        return;
      }

      const deck = generateCards();
      const numberOfPlayers = room.players.length;
      const cardsPerPlayer = 13;

      const sortCards = (cards) => {
        const cardOrder = {
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          Jack: 11,
          Queen: 12,
          King: 13,
          Ace: 14,
          2: 15,
        };

        const suitOrder = {
          spades: 1,
          clubs: 2,
          diamonds: 3,
          hearts: 4,
        };

        return cards.sort((a, b) => {
          const valueComparison = cardOrder[a.value] - cardOrder[b.value];
          if (valueComparison !== 0) return valueComparison;

          return suitOrder[a.suit] - suitOrder[b.suit];
        });
      };

      let firstPlayerIndex = 0;
      room.players.forEach((player, index) => {
        player.hand = deck
          .slice(index * cardsPerPlayer, (index + 1) * cardsPerPlayer)
          .map((card) => {
            const [value, suit] = card.id.split(" of ");
            return { ...card, value, suit };
          });

        player.hand = sortCards(player.hand);
        if (player.hand.some((card) => card.id === "3 of spades")) {
          firstPlayerIndex = index;
        }
      });
      addLog(
        `A game started in room ${roomId} with ${room.players.length} players`
      );
      room.currentTurn = firstPlayerIndex;
      room.gameStarted = true;
      io.in(roomId).emit("cards_dealt", {
        players: room.players,
        firstPlayerIndex,
      });
    });

    socket.on("play_cards", ({ roomId, userId, cards }) => {
      const room = rooms[roomId];
      if (room && room.players) {
        const player = room.players.find((p) => p.userId === userId);

        if (player) {
          player.hand = player.hand.filter(
            (card) => !cards.find((c) => c.id === card.id)
          );

          if (player.hand.length === 0) {
            player.isFinished = true;
            room.finishedPlayers = room.finishedPlayers || [];
            room.finishedPlayers.push({
              userId,
              rank: room.finishedPlayers.length + 1,
            });
          }

          room.playedCards = room.playedCards || [];
          room.playedCards.push(...cards);

          let nextPlayerIndex = room.players.indexOf(player);
          do {
            nextPlayerIndex = (nextPlayerIndex + 1) % room.players.length;
          } while (room.players[nextPlayerIndex].isFinished);

          const unfinishedPlayers = room.players.filter((p) => !p.isFinished);
          if (unfinishedPlayers.length === 1) {
            io.in(roomId).emit("game_over", {
              winners: room.finishedPlayers,
              loser: unfinishedPlayers[0].userId,
            });
            return;
          }

          io.in(roomId).emit("cards_played", {
            playedCards: cards,
            lastPlayedByUserId: userId,
            nextPlayerIndex: nextPlayerIndex,
            updatedPlayers: room.players,
            finishedPlayers: room.finishedPlayers,
          });
        }
      }
    });

    socket.on("pass_turn", ({ roomId, userId }) => {
      const room = rooms[roomId];
      if (room && room.players) {
        const playerIndex = room.players.findIndex((p) => p.userId === userId);

        if (playerIndex !== -1) {
          let nextPlayerIndex = playerIndex;
          const totalPlayers = room.players.length;

          do {
            nextPlayerIndex = (nextPlayerIndex + 1) % totalPlayers;
          } while (room.players[nextPlayerIndex].isFinished);

          room.currentPlayerIndex = nextPlayerIndex;

          const unfinishedPlayers = room.players.filter((p) => !p.isFinished);
          if (unfinishedPlayers.length === 0) {
            io.in(roomId).emit("game_over", {
              leaderboard: room.finishedPlayers,
            });
            return;
          }

          io.in(roomId).emit("turn_passed", {
            nextPlayerIndex: room.currentPlayerIndex,
            message: `${room.players[playerIndex].name} passed their turn.`,
          });
        }
      }
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      if (userId) {
        delete onlineUsers[userId];
        console.log(`User ${userId} disconnected`);
        addLog(`User ${userId} disconnected`);
        broadcastOnlineUsers(io);
      }

      const roomId = Object.keys(rooms).find((id) =>
        rooms[id].players.some((player) => player.id === socket.id)
      );

      if (roomId) {
        rooms[roomId].players = rooms[roomId].players.filter(
          (player) => player.id !== socket.id
        );
        io.in(roomId).emit("update_players", rooms[roomId].players);

        if (rooms[roomId].players.length === 0) {
          delete rooms[roomId];
          console.log(`Room ${roomId} deleted after disconnect.`);
        }
      }
      updateRoomPlayers(io); // Gọi sự kiện update_room_players
    });

    socket.on("send_message", ({ roomId, userId, message }) => {
      console.log(`Message from user ${userId} in room ${roomId}: ${message}`);
      io.in(roomId).emit("receive_message", { message, sender: userId });
      messageCount.total++;
    });

    socket.on("send_offer", ({ offer, roomId, userId, targetUserId }) => {
      socket.to(roomId).emit("receive_offer", {
        offer,
        userId: socket.id,
        targetUserId,
      });
    });

    socket.on("send_answer", ({ answer, roomId, userId, targetUserId }) => {
      socket.to(roomId).emit("receive_answer", {
        answer,
        userId: socket.id,
        targetUserId,
      });
    });

    socket.on(
      "send_ice_candidate",
      ({ candidate, roomId, userId, targetUserId }) => {
        socket.to(roomId).emit("receive_ice_candidate", {
          candidate,
          userId: socket.id,
          targetUserId,
        });
      }
    );

    socket.on("start_new_game", (roomId) => {
      const room = rooms[roomId];
      if (room && room.players.length >= 2) {
        room.gameStarted = false;
        room.playedCards = [];
        room.finishedPlayers = [];
        room.currentTurn = null;

        room.players.forEach((player) => {
          player.hand = [];
          player.movedCards = [];
          player.isFinished = false;
        });

        io.in(roomId).emit("new_game_ready", {
          message: "The room is ready for a new game.",
        });
      }
    });

    socket.on("request_peer_ids", (roomId) => {
      const room = rooms[roomId];
      if (room) {
        const peerIds = room.players
          .filter((player) => player.peerId)
          .map((player) => player.peerId);
        socket.emit("peer_ids", peerIds);
      }
    });
  });
}
function getRecentActivities(req, res) {
  res.json(logs);
}
function getStats(req, res) {
  res.json({
    totalInvites: invitationCount.total,
    totalMessages: messageCount.total,
  });
}
module.exports = { socketHandler, getRecentActivities, getStats };
