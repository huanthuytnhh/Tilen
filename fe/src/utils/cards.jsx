// utils/cards.js
export const suits = ["spades", "hearts", "diamonds", "clubs"];
export const values = [
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

export const generateCards = (imageMap) =>
  suits.flatMap((suit) =>
    values.map((value) => ({
      id: `${value} of ${suit}`,
      value,
      image: imageMap[`${value} of ${suit}`] || "default_card_image.svg",
    }))
  );

// Sorting players
export const sortPlayers = (players, userId) =>
  players.sort((a, b) => (a.id === userId ? -1 : b.id === userId ? 1 : 0));
