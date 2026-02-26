import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/outline";
// import Box from "./Box";
import DancingCharacter from "./DancingCharacter";
import TypingAnimation from "@/components/ui/typing-animation";
import PulsatingButton from "@/components/ui/pulsating-button";
import { useNavigate } from "react-router-dom";

const HeaderLandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <header className="relative bg-white">
      <div className="flex items-start w-full justify-between shadow-lg p-4">
        <img
          className="pt-1 pl-2  scale-125"
          src="/placeholder4.svg"
          alt="Logo web"
          width={150}
          height={150}
        />
        <ul className="hidden md:flex gap-8 py-3 pr-5">
          <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
            Search
          </li>
          <li
            className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all "
            // onClick={handleHome}
          >
            Home
          </li>
          <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
            Shop
          </li>
          <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
            Friends
          </li>
        </ul>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md">
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">
            Home
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">
            About
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">
            Products
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">
            Contact
          </a>
        </div>
      )}
      <div className="container mx-auto px-4 py-32 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-left mb-8 md:mb-0">
          <TypingAnimation
            className="text-5xl font-extrabold mb-4 text-blue-600 text-left w-full"
            text="Tilen - Ultimate Card Game Experience"
          />
          {/* <h1 className="text-3xl font-bold mb-4 text-black">
            Ultimate Card Game Experience
          </h1> */}
          <p className="text-xl mb-6 text-gray-600">
            Enjoy Tiến Lên like never before with a sleek, high-performance
            online platform. Elevate your game and experience premium
            entertainment anytime, anywhere!
          </p>
          {/* <Button>Get Started</Button> */}
          {/* <PulsatingButton></PulsatingButton> */}
          <PulsatingButton onClick={handleGetStarted}>
            <span>Get Started</span>
          </PulsatingButton>
        </div>
        <div className="md:w-1/2 h-[500px]">
          <Canvas camera={{ position: [1, 1.5, 2.5], fov: 50 }} shadows>
            <DancingCharacter scale={1.5} />
            {/* <Box /> */}
          </Canvas>
        </div>
      </div>
    </header>
  );
};

export default HeaderLandingPage;
