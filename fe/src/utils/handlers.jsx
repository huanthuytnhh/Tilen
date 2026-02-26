// // handlers.js
// import { useRoom } from "@/contexts/RoomContext"; // Import useRoom từ context

// export const handleStartGame = (
//   players,
//   setShowLoader,
//   roomId,
//   setPlayedCards,
//   setCurrentPlayerIndex
// ) => {
//   const { socket } = useRoom(); // Lấy socket từ RoomContext

//   if (players.length < 2) {
//     alert("Not enough players. Need at least 2 players to start the game.");
//     return;
//   }

//   setShowLoader(true);
//   socket.emit("deal_cards", roomId); // Sử dụng socket từ context
//   setPlayedCards([]);
//   setCurrentPlayerIndex(0);
// };

// export const handleLeaveRoom = async (
//   gameRoomApi,
//   userId,
//   roomId,
//   navigate
// ) => {
//   const { socket } = useRoom(); // Lấy socket từ RoomContext

//   try {
//     await gameRoomApi.leaveRoom(userId);
//     socket.emit("leave_room", roomId); // Sử dụng socket từ context
//     navigate("/joinroom");
//   } catch (error) {
//     console.error("Error updating game room ID:", error);
//   }
// };

// export const toggleHeader = (setIsHeaderVisible) => {
//   setIsHeaderVisible((prev) => !prev);
// };

// export const isValidMove = (
//   selectedCards,
//   lastPlayedCards,
//   validateCardSet,
//   compareMoveWithLastPlayedCard
// ) => {
//   if (!lastPlayedCards || lastPlayedCards.length === 0) {
//     return true;
//   }

//   if (selectedCards.length !== lastPlayedCards.length) {
//     return false;
//   }

//   if (!validateCardSet(selectedCards)) {
//     return false;
//   }

//   return compareMoveWithLastPlayedCard(selectedCards, lastPlayedCards);
// };

// export const getMaxCardValue = (cards) => {
//   if (!cards || cards.length === 0) {
//     return { value: -1, suitPriority: -1 };
//   }

//   const valueMapping = {
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 7,
//     8: 8,
//     9: 9,
//     10: 10,
//     Jack: 11,
//     Queen: 12,
//     King: 13,
//     Ace: 14,
//     2: 15,
//   };

//   const suitPriority = { hearts: 4, diamonds: 3, clubs: 2, spades: 1 };

//   const mappedCards = cards.map((card) => {
//     const [value, suit] = card.id.split(" of ");
//     const mappedValue = valueMapping[value] ?? -1;
//     const suitValue = suitPriority[suit] ?? -1;

//     if (mappedValue === -1 || suitValue === -1) {
//       console.error(`Invalid card detected: ${card.id}`);
//     }

//     return { value: mappedValue, suitPriority: suitValue };
//   });

//   const maxCard = mappedCards.reduce(
//     (max, card) =>
//       card.value > max.value ||
//       (card.value === max.value && card.suitPriority > max.suitPriority)
//         ? card
//         : max,
//     { value: -1, suitPriority: -1 }
//   );

//   return maxCard;
// };

// export const isStraight = (cards) => {
//   const cardValues = cards.map((card) => card.value).sort((a, b) => a - b);
//   for (let i = 0; i < cardValues.length - 1; i++) {
//     if (cardValues[i] + 1 !== cardValues[i + 1]) {
//       return false;
//     }
//   }
//   return true;
// };

// export const isFourOfAKind = (cards) => {
//   const cardValues = cards.map((card) => card.value);
//   const uniqueValues = new Set(cardValues);
//   return uniqueValues.size === 1 && cards.length === 4;
// };

// export const validateCardSet = (cards) => {
//   const cardValues = cards.map((card) => card.value);
//   const uniqueValues = [...new Set(cardValues)];

//   if (cards.length === 1) return true; // Bài đơn (1 lá)
//   if (cards.length === 2 && uniqueValues.length === 1) return true; // Đôi (2 lá có giá trị giống nhau)
//   if (cards.length === 3 && uniqueValues.length === 1) return true; // Ba lá (3 lá giống nhau)
//   if (cards.length >= 3 && isStraight(cards)) return true; // Sảnh (từ 3 lá trở lên)
//   if (cards.length === 4 && isFourOfAKind(cards)) return true; // Tứ quý

//   return false;
// };

// export const compareMoveWithLastPlayedCard = (
//   selectedCards,
//   lastPlayedCards
// ) => {
//   const maxPlayedCard = getMaxCardValue(lastPlayedCards);
//   const maxSelectedCard = getMaxCardValue(selectedCards);

//   if (
//     selectedCards.length === lastPlayedCards.length &&
//     selectedCards.length >= 1 &&
//     selectedCards.length <= 4
//   ) {
//     if (
//       maxSelectedCard.value > maxPlayedCard.value ||
//       (maxSelectedCard.value === maxPlayedCard.value &&
//         maxSelectedCard.suitPriority > maxPlayedCard.suitPriority)
//     ) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// };
