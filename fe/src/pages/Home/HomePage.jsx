import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button"; // Assuming you have a custom button component
import { Disclosure } from "@headlessui/react";
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
import { BookText, Gamepad2, Medal } from "lucide-react";
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

const HomePage = () => {
  return (
    <div className="home-page flex flex-col items-center text-gray-800 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-10 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome to Tiến Lên Game!</h1>
        <p className="text-lg">
          The Ultimate Platform for Playing Thirteen Cards (Tiến Lên)
        </p>
      </header>

      {/* Features Section */}
      <section className="w-11/12 max-w-4xl my-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Website Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="feature-card p-4 bg-white shadow-md rounded-lg text-center">
            <Gamepad2 className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Play Tiến Lên</h3>
            <p>Challenge your friends and real-time interact</p>
          </div>
          <div className="feature-card p-4 bg-white shadow-md rounded-lg text-center">
            <BookText className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Game Rules</h3>
            <p>Learn how to play Tiến Lên and master strategies to win.</p>
          </div>
          <div className="feature-card p-4 bg-white shadow-md rounded-lg text-center">
            <Medal className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Leaderboard</h3>
            <p>
              Track your progress and compete to become the ultimate champion.
            </p>
          </div>
        </div>
      </section>

      {/* Game Instructions Section with Accordions */}
      <section className="w-11/12 max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Game Rules</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-md mb-2">
                  What is Tiến Lên?
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-700">
                  Tiến Lên is a popular card game where the goal is to get rid
                  of all your cards by playing combinations of cards that are
                  higher than those played by your opponents.
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-md mb-2">
                  Basic Rules
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-700">
                  <ol className="list-decimal list-inside">
                    <li>Each player is dealt 13 cards.</li>
                    <li>
                      The player with the{" "}
                      <img
                        src={three_of_spades}
                        alt="3 of Spades"
                        className="inline w-12 h-12"
                      />{" "}
                      starts the first round.
                    </li>
                    <li>
                      Players take turns to play cards that are higher than the
                      previous player’s cards. For example, a{" "}
                      <img
                        src={four_of_spades}
                        alt="4 of Spades"
                        className="inline w-12 h-12"
                      />{" "}
                      can beat a{" "}
                      <img
                        src={three_of_spades}
                        alt="3 of Spades"
                        className="inline w-12 h-12"
                      />
                      .
                    </li>
                    <li>
                      Special combinations like sequences and pairs can beat
                      single cards.
                    </li>
                    <li>
                      The goal is to get rid of all your cards first to win the
                      round.
                    </li>
                  </ol>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="w-full text-left px-4 py-2 bg-indigo-500 text-white rounded-md mb-2">
                  Special Combinations
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-700">
                  Learn about special combinations like sequences, pairs, and
                  bombs that can turn the game in your favor.
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">Ready to Play?</h2>
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600">
            <Link to="/createroom">Create a Room</Link>
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600">
            <Link to="/joinroom">Join a Room</Link>
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 w-full py-4 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} Tiến Lên Game. All rights reserved.
        </p>
        <p className="text-sm">Built for fun and competition.</p>
      </footer>
    </div>
  );
};

export default HomePage;
