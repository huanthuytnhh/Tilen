import { useUser } from "@clerk/clerk-react"; // Import useUser từ Clerk
import { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gameRoomApi from "../../apis/gameRoomApi"; // Import gameRoomApi
import ten_of_spades from "../../assets/images/cards/10_of_spades.svg";
import two_of_spades from "../../assets/images/cards/2_of_spades.svg";
import three_of_spades from "../../assets/images/cards/3_of_spades.svg";
import four_of_spades from "../../assets/images/cards/4_of_spades.svg";
import five_of_spades from "../../assets/images/cards/5_of_spades.svg";
import six_of_spades from "../../assets/images/cards/6_of_spades.svg";
import seven_of_spades from "../../assets/images/cards/7_of_spades.svg";
import eight_of_spades from "../../assets/images/cards/8_of_spades.svg";
import nine_of_spades from "../../assets/images/cards/9_of_spades.svg";
import ace_of_spades from "../../assets/images/cards/ace_of_spades.svg";
import back_of_card_image from "../../assets/images/cards/back_of_card.svg";
import jack_of_spades from "../../assets/images/cards/jack_of_spades.svg";
import king_of_spades from "../../assets/images/cards/king_of_spades.svg";
import queen_of_spades from "../../assets/images/cards/queen_of_spades.svg";
import menuIcon from "../../assets/images/icons/menu-bar.png";
import Header from "../../components/Header";
import ShuffleCardLoader from "../../components/loader/ShuffleCardLoader";
import AvatarGroup from "../../components/ui/AvatarGroup";
import { Switch } from "../../components/ui/switch";
import "./ChatBoxStyle.css";

import ten_of_hearts from "../../assets/images/cards/10_of_hearts.svg";
import two_of_hearts from "../../assets/images/cards/2_of_hearts.svg";
import three_of_hearts from "../../assets/images/cards/3_of_hearts.svg";
import four_of_hearts from "../../assets/images/cards/4_of_hearts.svg";
import five_of_hearts from "../../assets/images/cards/5_of_hearts.svg";
import six_of_hearts from "../../assets/images/cards/6_of_hearts.svg";
import seven_of_hearts from "../../assets/images/cards/7_of_hearts.svg";
import eight_of_hearts from "../../assets/images/cards/8_of_hearts.svg";
import nine_of_hearts from "../../assets/images/cards/9_of_hearts.svg";
import ace_of_hearts from "../../assets/images/cards/ace_of_hearts.svg";
import jack_of_hearts from "../../assets/images/cards/jack_of_hearts.svg";
import king_of_hearts from "../../assets/images/cards/king_of_hearts.svg";
import queen_of_hearts from "../../assets/images/cards/queen_of_hearts.svg";

import ten_of_diamonds from "../../assets/images/cards/10_of_diamonds.svg";
import two_of_diamonds from "../../assets/images/cards/2_of_diamonds.svg";
import three_of_diamonds from "../../assets/images/cards/3_of_diamonds.svg";
import four_of_diamonds from "../../assets/images/cards/4_of_diamonds.svg";
import five_of_diamonds from "../../assets/images/cards/5_of_diamonds.svg";
import six_of_diamonds from "../../assets/images/cards/6_of_diamonds.svg";
import seven_of_diamonds from "../../assets/images/cards/7_of_diamonds.svg";
import eight_of_diamonds from "../../assets/images/cards/8_of_diamonds.svg";
import nine_of_diamonds from "../../assets/images/cards/9_of_diamonds.svg";
import ace_of_diamonds from "../../assets/images/cards/ace_of_diamonds.svg";
import jack_of_diamonds from "../../assets/images/cards/jack_of_diamonds.svg";
import king_of_diamonds from "../../assets/images/cards/king_of_diamonds.svg";
import queen_of_diamonds from "../../assets/images/cards/queen_of_diamonds.svg";
// import hold_card from "../../../public/card-game.png";
import ten_of_clubs from "../../assets/images/cards/10_of_clubs.svg";
import two_of_clubs from "../../assets/images/cards/2_of_clubs.svg";
import three_of_clubs from "../../assets/images/cards/3_of_clubs.svg";
import four_of_clubs from "../../assets/images/cards/4_of_clubs.svg";
import five_of_clubs from "../../assets/images/cards/5_of_clubs.svg";
import six_of_clubs from "../../assets/images/cards/6_of_clubs.svg";
import seven_of_clubs from "../../assets/images/cards/7_of_clubs.svg";
import eight_of_clubs from "../../assets/images/cards/8_of_clubs.svg";
import nine_of_clubs from "../../assets/images/cards/9_of_clubs.svg";
import ace_of_clubs from "../../assets/images/cards/ace_of_clubs.svg";
import jack_of_clubs from "../../assets/images/cards/jack_of_clubs.svg";
import king_of_clubs from "../../assets/images/cards/king_of_clubs.svg";
import queen_of_clubs from "../../assets/images/cards/queen_of_clubs.svg";
import { Slide, toast } from "react-toastify";
const imageMap = {
  "Ace of spades": ace_of_spades,
  "King of spades": king_of_spades,
  "Queen of spades": queen_of_spades,
  "Jack of spades": jack_of_spades,
  "10 of spades": ten_of_spades,
  "9 of spades": nine_of_spades,
  "8 of spades": eight_of_spades,
  "7 of spades": seven_of_spades,
  "6 of spades": six_of_spades,
  "5 of spades": five_of_spades,
  "4 of spades": four_of_spades,
  "3 of spades": three_of_spades,
  "2 of spades": two_of_spades,

  "Ace of hearts": ace_of_hearts,
  "King of hearts": king_of_hearts,
  "Queen of hearts": queen_of_hearts,
  "Jack of hearts": jack_of_hearts,
  "10 of hearts": ten_of_hearts,
  "9 of hearts": nine_of_hearts,
  "8 of hearts": eight_of_hearts,
  "7 of hearts": seven_of_hearts,
  "6 of hearts": six_of_hearts,
  "5 of hearts": five_of_hearts,
  "4 of hearts": four_of_hearts,
  "3 of hearts": three_of_hearts,
  "2 of hearts": two_of_hearts,

  "Ace of diamonds": ace_of_diamonds,
  "King of diamonds": king_of_diamonds,
  "Queen of diamonds": queen_of_diamonds,
  "Jack of diamonds": jack_of_diamonds,
  "10 of diamonds": ten_of_diamonds,
  "9 of diamonds": nine_of_diamonds,
  "8 of diamonds": eight_of_diamonds,
  "7 of diamonds": seven_of_diamonds,
  "6 of diamonds": six_of_diamonds,
  "5 of diamonds": five_of_diamonds,
  "4 of diamonds": four_of_diamonds,
  "3 of diamonds": three_of_diamonds,
  "2 of diamonds": two_of_diamonds,

  "Ace of clubs": ace_of_clubs,
  "King of clubs": king_of_clubs,
  "Queen of clubs": queen_of_clubs,
  "Jack of clubs": jack_of_clubs,
  "10 of clubs": ten_of_clubs,
  "9 of clubs": nine_of_clubs,
  "8 of clubs": eight_of_clubs,
  "7 of clubs": seven_of_clubs,
  "6 of clubs": six_of_clubs,
  "5 of clubs": five_of_clubs,
  "4 of clubs": four_of_clubs,
  "3 of clubs": three_of_clubs,
  "2 of clubs": two_of_clubs,
};

import userApi from "../../apis/userApi";
import { useRoom } from "../../contexts/RoomContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faRankingStar,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import GameBoard from "./GameBoard";
import LeaderboardModal from "./LeaderboardModal";
import PropTypes from "prop-types";
import RankingModal from "./RankingModal";
import InvalidMoveModal from "./InvalidMoveModel";
import InvitePlayersModal from "./InvitePlayersModal";

const RoomView = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { socket } = useRoom();
  const [gameStarted, setGameStarted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [players, setPlayers] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [lastPlayedCards, setLastPlayedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [finishedPlayers, setFinishedPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lastPlayedByUserId, setLastPlayedByUserId] = useState("");
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // Trạng thái để theo dõi nếu đã cập nhật
  const [winners, setWinners] = useState([]);
  const [loser, setLoser] = useState("");
  const { user } = useUser();
  const [roomName, setRoomName] = useState(null); // Lưu room name
  const avatarUrl = user.imageUrl;
  // console.log(user.imageUrl);
  const userId = user ? user.id : null;
  const [isConnected, setIsConnected] = useState(false);
  let tmp_userid = "",
    current_player = 0;
  useEffect(() => {
    // Kiểm tra và cập nhật gameRoomId nếu cần
    const checkAndUpdateGameRoom = async () => {
      if (user && user.id) {
        try {
          // Gửi request đến userApi để kiểm tra và cập nhật gameRoomId
          const response = await userApi.getUser(user.id);
          const currentUser = response.data;

          if (!currentUser.gameRoomId) {
            // Cập nhật gameRoomId nếu hiện tại là null
            await userApi.updateUserGameRoomId(user.id, roomId);
            setIsUpdated(true); // Cập nhật trạng thái đã thực hiện update
          }
        } catch (error) {
          console.error("Error checking/updating gameRoomId:", error);
        }
      }
    };

    checkAndUpdateGameRoom();
  }, [user, roomId]);
  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    socket.on("connect", () => {
      socket.emit("join_room", { roomId, userId: userId, avatarUrl });
    });

    socket.on("joined_room", ({ roomId, userId, avatarUrl }) => {
      // console.log(`Successfully joined room ${roomId} as user ${userId}`);
      tmp_userid = userId;
      setIsConnected(true);
    });

    socket.on("update_players", (updatedPlayers) => {
      // console.log("Update player -  rooomview");
      setPlayers(updatedPlayers);

      // In ra tất cả player trong console
      updatedPlayers.forEach((player) => {
        // console.log(player);
      });
    });
    socket.on("update_online_users", (onlineUsersList) => {
      // console.log("Online users updated:", onlineUsersList);
      // setOnlineUsers(onlineUsers); // Cập nhật danh sách người dùng online vào state});
      socket.emit("sync_online_users", { onlineUsersList });
    });
    socket.on("cards_dealt", ({ players, firstPlayerIndex }) => {
      const sortedPlayersWithImages = players.map((player) => ({
        ...player,
        hand: player.hand.map((card) => ({
          ...card,
          image: imageMap[card.id] || back_of_card_image,
        })),
      }));

      setPlayers(sortedPlayersWithImages); // Cập nhật danh sách người chơi
      setCurrentPlayerIndex(firstPlayerIndex); // Đặt người chơi đầu tiên
      setGameStarted(true); // Đặt trạng thái trò chơi đã bắt đầu
      setShowLoader(false); // Ẩn loader

      // console.log("First player index:", firstPlayerIndex);
      // console.log("Players after dealing cards:", sortedPlayersWithImages);
    });
    socket.on("game_reset", ({ message }) => {
      alert(message); // Thông báo trò chơi được reset
      setGameStarted(false); // Reset trạng thái game
      // setPlayers([]);
      setPlayedCards([]);
      setLastPlayedCards([]);
      setFinishedPlayers([]);
      setCurrentPlayerIndex(0);
      setShowLoader(false);
    });

    // Handle new game ready
    socket.on("new_game_ready", ({ message }) => {
      alert(message); // Thông báo trò chơi mới sẵn sàng
      setGameStarted(false); // Reset trạng thái game
      // setPlayers([]);
      setPlayedCards([]);
      setLastPlayedCards([]);
      setFinishedPlayers([]);
      setCurrentPlayerIndex(0);
    });
    socket.on(
      "cards_played",
      ({
        playedCards,
        lastPlayedByUserId,
        nextPlayerIndex,
        updatedPlayers,
        finishedPlayers,
      }) => {
        const updatedPlayersWithImages = updatedPlayers.map((player) => ({
          ...player,
          hand: player.hand.map((card) => ({
            ...card,
            image: imageMap[card.id] || back_of_card_image,
          })),
        }));

        // Sort the players so that the current user appears first
        const sortedPlayers = updatedPlayersWithImages;

        // console.log("Processed Players after Cards Played:", sortedPlayers);
        setLastPlayedByUserId(lastPlayedByUserId);
        // console.log("Last Played By User ID:", lastPlayedByUserId);
        setPlayedCards((prev) => [...prev, ...playedCards]);
        setLastPlayedCards(playedCards);
        setPlayers(sortedPlayers);
        setCurrentPlayerIndex(nextPlayerIndex);
        if (finishedPlayers) {
          setFinishedPlayers(finishedPlayers);
        }
        setShowLoader(false);
      }
    );
    socket.on("turn_passed", ({ nextPlayerIndex, message }) => {
      // console.log(message); // Hiển thị thông báo lượt chơi đã chuyển
      // Cập nhật trạng thái người chơi hiện tại
      setCurrentPlayerIndex(nextPlayerIndex);
    });
    // socket.on("game_over", ({ winners, loser }) => {
    //   alert(
    //     `Game Over!\nWinners:\n${winners
    //       .map((winner, index) => `Rank ${index + 1}: ${winner.userId}`)
    //       .join("\n")}\nLoser: ${loser}`
    //   );
    //   setFinishedPlayers(winners);
    //   setGameStarted(false);
    // });
    socket.on("game_over", ({ winners, loser }) => {
      setWinners(winners);
      setLoser(loser);
      setIsRankingModalOpen(true); // Mở modal khi trò chơi kết thúc
      setGameStarted(false);
    });
    // Cleanup khi component unmount

    return () => {
      socket.off("connect");
      socket.off("joined_room");
      socket.off("update_players");
      socket.off("update_online_users");
      socket.off("cards_dealt");
      socket.off("game_reset");
      socket.off("new_game_ready");
      socket.off("cards_played");
      socket.off("turn_passed");
      socket.off("game_over");
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
      navigate("/joinroom");
    } catch (error) {
      console.error("Error updating game room ID:", error);
    }
  };
  const handleLeaveRoomNotStarted = async () => {
    try {
      await gameRoomApi.leaveRoom(userId);
      // socket.emit("leave_room", roomId);
      navigate("/joinroom");
    } catch (error) {
      console.error("Error updating game room ID:", error);
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev);
  };
  const closeRankingModal = () => {
    setIsRankingModalOpen(false);
  };
  const canBeat = (selectedCards, lastPlayedCards) => {
    // alert(`Selected Cards: ${JSON.stringify(selectedCards)}`);
    // alert(`Last Played Cards: ${JSON.stringify(lastPlayedCards)}`);

    let isLastHeo =
      lastPlayedCards.length === 1 &&
      parseInt(lastPlayedCards[0].value, 10) === 2;
    isLastHeo =
      lastPlayedCards.length === 2 &&
      parseInt(lastPlayedCards[0].value, 10) === 2;
    // alert(`Is Last Played Card a Heo (2)? ${isLastHeo}`);

    const isSelectedFourOfAKind = isFourOfAKind(selectedCards);
    const isSelectedThreePairs = isThreePairsStraight(selectedCards);
    const isSelectedFourPairs = isFourPairsStraight(selectedCards);

    // alert(`Is Selected Cards Four of a Kind? ${isSelectedFourOfAKind}`);
    // alert(`Is Selected Cards Three Pairs Straight? ${isSelectedThreePairs}`);
    // alert(`Is Selected Cards Four Pairs Straight? ${isSelectedFourPairs}`);

    if (isLastHeo) {
      if (
        isSelectedFourOfAKind ||
        isSelectedThreePairs ||
        isSelectedFourPairs
      ) {
        //alert("Special Rule: Selected Cards can beat the Heo.");
        return true;
      }
      // alert("Special Rule Failed: Selected Cards cannot beat the Heo.");
      return false;
    }

    const result = compareMoveWithLastPlayedCard(
      selectedCards,
      lastPlayedCards
    );
    // alert(`Compare Move Result: ${result}`);
    return result;
  };

  const isValidMove = (selectedCards, lastPlayedCards) => {
    // Nếu chưa có lượt bài nào, cho phép đánh bất kỳ bài nào
    if (!lastPlayedCards || lastPlayedCards.length === 0) {
      return validateCardSet(selectedCards); // Chỉ cần hợp lệ
    }

    //Chặt heo
    if (canBeat(selectedCards, lastPlayedCards)) {
      // console.log("Đang chặt");
      // alert("Dang chặtt");
      return true;
    }
    // Kiểm tra tính hợp lệ của bộ bài được đánh
    if (!validateCardSet(selectedCards)) {
      // alert("Kiểm tra tính hợp lệ của bộ bài được đánh");
      return false;
    }
    // Kiểm tra nếu số lượng bài đánh khác với số lượng bài vừa đánh
    if (selectedCards.length !== lastPlayedCards.length) {
      return false;
    }

    // So sánh bộ bài đánh với bộ bài trước
    return compareMoveWithLastPlayedCard(selectedCards, lastPlayedCards);
  };
  const getMaxCardValue = (cards) => {
    if (!cards || cards.length === 0) {
      return { value: -1, suitPriority: -1 }; // Giá trị mặc định nếu không có thẻ bài
    }

    const valueMapping = {
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

    const suitPriority = {
      hearts: 4,
      diamonds: 3,
      clubs: 2,
      spades: 1,
    };

    const mappedCards = cards.map((card) => {
      const [value, suit] = card.id.split(" of ");
      const mappedValue = valueMapping[value] ?? -1;
      const suitValue = suitPriority[suit] ?? -1;

      if (mappedValue === -1 || suitValue === -1) {
        console.error(`Invalid card detected: ${card.id}`);
      }

      return { value: mappedValue, suitPriority: suitValue };
    });

    const maxCard = mappedCards.reduce(
      (max, card) =>
        card.value > max.value ||
        (card.value === max.value && card.suitPriority > max.suitPriority)
          ? card
          : max,
      { value: -1, suitPriority: -1 }
    );

    return maxCard;
  };
  const isStraight = (cards) => {
    // Lấy giá trị của các lá bài và chuyển sang số nếu cần
    const cardValues = cards
      .map((card) => parseInt(card.value, 10))
      .sort((a, b) => a - b);

    // alert(`Sorted card values for straight: ${cardValues}`);

    // Kiểm tra tính liên tiếp của các giá trị
    for (let i = 0; i < cardValues.length - 1; i++) {
      if (cardValues[i] + 1 !== cardValues[i + 1]) {
        // alert(
        //   `Card values not consecutive at index ${i}: ${cardValues[i]} -> ${
        //     cardValues[i + 1]
        //   }`
        // );
        return false; // Không phải sảnh
      }
    }

    // alert("Valid straight detected.");
    return true;
  };

  const isFourOfAKind = (cards) => {
    const cardValues = cards.map((card) => card.value);
    const uniqueValues = new Set(cardValues);
    return uniqueValues.size === 1 && cards.length === 4;
  };
  const isThreePairsStraight = (cards) => {
    if (cards.length !== 6) return false;

    // Lấy giá trị của các lá bài và sắp xếp tăng dần
    const values = cards
      .map((card) => parseInt(card.value))
      .sort((a, b) => a - b);
    // console.log("Sorted Values:", values);

    // Kiểm tra từng cặp bài
    for (let i = 0; i < values.length; i += 2) {
      if (values[i] !== values[i + 1]) {
        // console.log(`Not a pair at index ${i}`);
        return false; // Không phải đôi
      }
      if (i > 0 && values[i] !== values[i - 2] + 1) {
        // console.log(`Pairs not consecutive at index ${i}`);
        return false; // Không liên tiếp
      }
    }
    return true;
  };

  const isFourPairsStraight = (cards) => {
    if (cards.length !== 8) return false;

    // Lấy giá trị của các lá bài và sắp xếp tăng dần
    const values = cards
      .map((card) => parseInt(card.value))
      .sort((a, b) => a - b);
    //  console.log("Sorted Values:", values);

    // Kiểm tra từng cặp bài
    for (let i = 0; i < values.length; i += 2) {
      if (values[i] !== values[i + 1]) {
        //  console.log(`Not a pair at index ${i}`);
        return false; // Không phải đôi
      }
      if (i > 0 && values[i] !== values[i - 2] + 1) {
        //  console.log(`Pairs not consecutive at index ${i}`);
        return false; // Không liên tiếp
      }
    }
    return true;
  };
  const validateCardSet = (cards) => {
    const cardValues = cards.map((card) => card.value);
    const uniqueValues = [...new Set(cardValues)];

    // Bài đơn (1 lá)
    if (cards.length === 1) {
      return true;
    }

    // Đôi (2 lá có giá trị giống nhau)
    if (cards.length === 2 && uniqueValues.length === 1) {
      return true;
    }

    // Ba lá (3 lá giống nhau)
    if (cards.length === 3 && uniqueValues.length === 1) {
      return true;
    }

    // Sảnh (từ 3 lá trở lên)
    if (cards.length >= 3 && isStraight(cards)) {
      return true;
    }

    // Tứ quý
    if (cards.length === 4 && isFourOfAKind(cards)) {
      return true;
    }
    if (isThreePairsStraight(cards)) return true; // Ba đôi thông
    if (isFourPairsStraight(cards)) return true; // Bốn đôi thông
    return false;
  };

  const compareMoveWithLastPlayedCard = (selectedCards, lastPlayedCards) => {
    const maxPlayedCard = getMaxCardValue(lastPlayedCards);
    const maxSelectedCard = getMaxCardValue(selectedCards);

    if (
      selectedCards.length === lastPlayedCards.length &&
      selectedCards.length >= 1 &&
      selectedCards.length <= 4
    ) {
      if (
        maxSelectedCard.value > maxPlayedCard.value ||
        (maxSelectedCard.value === maxPlayedCard.value &&
          maxSelectedCard.suitPriority > maxPlayedCard.suitPriority)
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  const handleMoveCards = (selectedCards) => {
    // Kiểm tra số lượng người chơi
    if (players.length < 2) {
      alert("Not enough players to perform this action.");
    }

    // Kiểm tra tính hợp lệ của bài đánh
    let isMoveValid = isValidMove(selectedCards, lastPlayedCards);
    if (userId === lastPlayedByUserId) {
      // Chỉ cho phép đánh bài hợp lệ theo luật
      isMoveValid = validateCardSet(selectedCards); // Kiểm tra bộ bài mới mở lượt
    }
    if (!isMoveValid) {
      // Nếu bài không hợp lệ, chỉ hiển thị thông báo lỗi

      // Hiển thị thông báo lỗi
      // alert(
      //   `Invalid move! Please select valid cards.\n\nSelected Cards: ${selectedCardsText}\n\nLast Played Cards: ${lastPlayedCardsText}`
      // );
      setIsModalOpen(true); // Mở modal
      setSelectedCards(selectedCards); // Cập nhật selectedCards vào state
      setLastPlayedCards(lastPlayedCards);

      // Không thực hiện thêm bất kỳ hành động nào, nhưng chương trình vẫn tiếp tục
    } else {
      // Nếu bài hợp lệ, thực hiện các hành động cập nhật

      // Cập nhật bài đã đánh
      setLastPlayedCards(selectedCards);

      // Cập nhật trạng thái tay bài của người chơi
      const updatedPlayers = players.map((player) => {
        if (player.id === userId) {
          return {
            ...player,
            hand: player.hand.filter(
              (card) =>
                !selectedCards.some((selected) => selected.id === card.id)
            ),
          };
        }
        return player;
      });

      setPlayers(updatedPlayers);

      // Gửi thông tin bài đánh đến server
      socket.emit("play_cards", { roomId, userId, cards: selectedCards });
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePassTurn = () => {
    // Logic xử lý khi người chơi bỏ qua lượt của mình
    // console.log("Player passed their turn.");
    socket.emit("pass_turn", { roomId, userId: userId }); // Gửi thông tin tới server nếu cần thiết
  };
  const handleNewMessage = (newMessage) => {
    socket.emit("send_message", { roomId, userId, message: newMessage });
  };
  const handleNewGame = () => {
    if (!socket) return;
    socket.emit("start_new_game", roomId); // Gửi yêu cầu bắt đầu trò chơi mới
  };
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false); // Trạng thái modal invite
  const [onlineUsers, setOnlineUsers] = useState([]);
  const toggleLeaderboard = () => {
    setIsLeaderboardOpen(!isLeaderboardOpen);
  };
  const toggleInviteModal = () => {
    // console.log("Invite hehe :" + isInviteModalOpen);
    setInviteModalOpen(!isInviteModalOpen);
  };
  useEffect(() => {
    // Lấy danh sách người dùng online khi component mount
    const fetchOnlineUsers = async () => {
      try {
        const response = await userApi.getOnlineUsers();
        setOnlineUsers(response); // Cập nhật danh sách người chơi online
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();
  }, []);
  useEffect(() => {
    // Lấy danh sách người dùng online khi component mount
    const fetchOnlineUsers = async () => {
      try {
        const response = await userApi.getOnlineUsers();
        setOnlineUsers(response); // Cập nhật danh sách người chơi online
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", async ({ message, sender }) => {
        const userResponse = await userApi.getUser(sender);
        const userName = userResponse.data.username;
        // console.log("Sender ID:", sender);
        // console.log("User Name:", userName);
        if (sender !== userId) {
          addResponseMessage(`${userName}: ${message}`);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("receive_message");
      }
    };
  }, [socket]);

  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const response = await gameRoomApi.getRoomName(roomId);
        setRoomName(response); // Gán tên phòng từ phản hồi
      } catch (error) {
        console.error("Error fetching room name:", error);
      }
    };

    fetchRoomName();
  }, [roomId]);

  for (let i = 0; i < players.length; i++)
    if (players[i].userId == userId) current_player = i;
  //   console.log(players);
  //   console.log(userId);
  const handleInvitePlayer = (targetUserId) => {
    // Gửi sự kiện 'send_invite' đến server
    socket.emit("send_invite", {
      toUserId: targetUserId,
      fromUserId: userId,
      roomId,
    });

    // Lắng nghe phản hồi từ server
    socket.on("invite_status", (response) => {
      toast.dismiss();
      if (response.success) {
        toast.success(`🎉 Invitation sent to user ${targetUserId}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide, // Đừng quên import Slide từ react-toastify
        });
      } else {
        toast.error(`⚠️ Failed to invite user: ${response.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide, // Đừng quên import Slide từ react-toastify
        });
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center h-screen bg-gray-100">
      {}
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
        <div className="relative h-screen w-screen">
          {}
          <button
            onClick={handleLeaveRoomNotStarted}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Leave Room
          </button>
          <ShuffleCardLoader />
        </div>
      ) : gameStarted ? (
        <div className="relative h-screen w-screen">
          {/* Header Controls */}
          <div className="absolute top-4 right-4 flex gap-4">
            {/* Leaderboard Button */}
            {/* <button
              onClick={toggleInviteModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Invite
            </button> */}
            <button
              onClick={toggleLeaderboard}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg flex items-center"
            >
              <FontAwesomeIcon icon={faRankingStar} className="mr-2" />
            </button>

            {/* Leave Room Button */}
            <button
              onClick={handleLeaveRoom}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
            </button>
          </div>
          <InvitePlayersModal
            isOpen={isInviteModalOpen}
            onClose={toggleInviteModal}
            onlineUsers={onlineUsers}
            handleInvite={handleInvitePlayer}
          />
          {/* Leaderboard Modal */}
          <LeaderboardModal
            isOpen={isLeaderboardOpen}
            onClose={toggleLeaderboard}
            finishedPlayers={finishedPlayers}
            userApi={userApi}
          />

          {/* Game Board */}
          <GameBoard
            socket={socket}
            players={players}
            player_inturn={currentPlayerIndex}
            current_player={current_player}
            onMoveCards={handleMoveCards}
            onPassTurn={handlePassTurn}
            playedCards={playedCards}
            roomId={roomId}
          />
        </div>
      ) : (
        <div className="mb-5">
          <h1 className="text-4xl font-bold mb-0">
            {" "}
            Welcome to Room {roomName || roomId}!
          </h1>
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
              onClick={handleNewGame}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Reset Game
            </button>
            <button
              onClick={handleLeaveRoomNotStarted}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              Leave Room
            </button>
            <button
              onClick={toggleInviteModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Invite
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

      {}
      <div className="scale-75 absolute bottom-0 right-0 z-20">
        <Widget
          handleNewUserMessage={handleNewMessage}
          title="In Game Chat"
          subtitle="Chat with other players"
        />
      </div>
      <div className="relative">
        {/* Các phần UI khác */}
        <RankingModal
          isOpen={isRankingModalOpen}
          winners={winners}
          loser={loser}
          onClose={closeRankingModal}
        />
        <InvalidMoveModal
          isOpen={isModalOpen}
          selectedCards={selectedCards}
          lastPlayedCards={lastPlayedCards}
          onClose={handleCloseModal}
          imageMap={imageMap} // Truyền imageMap vào modal
        />
        <InvitePlayersModal
          isOpen={isInviteModalOpen}
          onClose={toggleInviteModal}
          onlineUsers={onlineUsers}
          handleInvite={handleInvitePlayer}
        />
      </div>
      {/* <div className="relative"> */}
      {/* Hiển thị modal khi trạng thái isModalOpen là true */}

      {/* Các phần còn lại của giao diện */}
      {/* </div> */}
      {/* {gameStarted && (
        <VideoGrid players={players} userId={userId} roomId={roomId} />
      )} */}
    </div>
  );
};

export default RoomView;
