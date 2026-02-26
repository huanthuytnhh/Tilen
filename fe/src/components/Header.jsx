import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomModal from "./RoomModal";
import PaymentModal from "./PaymentModal";
import { Button } from "./ui/button";
import userApi from "@/apis/userApi";

function Header() {
  const { user, isSignedIn } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [hasSavedUser, setHasSavedUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/createroom");
    setModalOpen(false);
  };

  const handleJoinRoom = () => {
    navigate("/joinroom");
    setModalOpen(false);
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleLandingPage = () => {
    navigate("/");
  };

  async function saveUserToDatabase() {
    if (!user || !user.id) {
      console.warn("User data is unavailable, cannot save user.");
      return;
    }

    try {
      const userData = {
        id: user.id,
        username: user.username || user.firstName || "Anonymous",
        email: user.emailAddresses[0]?.emailAddress || "No Email",
      };

      const response = await userApi.getUser(user.id);
      if (!response || !response.data) {
        await userApi.saveUserData(userData);
        console.log("User data saved successfully.");
      }

      await userApi.updateOnlineStatus(user.id);
      setHasSavedUser(true);
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  }

  useEffect(() => {
    if (isSignedIn && user && !hasSavedUser) {
      saveUserToDatabase();
    }
  }, [isSignedIn, user, hasSavedUser]);

  useEffect(() => {
    let isMounted = true;

    const fetchRole = async () => {
      if (!user || !user.id) return;

      try {
        const response = await userApi.getUser(user.id); // Fetch user role from the server
        const userInfo = response?.data;

        if (isMounted && userInfo?.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };

    if (isSignedIn) {
      fetchRole();
    }

    return () => {
      isMounted = false;
    };
  }, [isSignedIn, user]);
  // useEffect(() => {
  //   if (isSignedIn) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <div className="flex items-start w-full justify-between shadow-lg p-4">
      <img
        className="pt-1 pl-2  scale-125"
        src="/placeholder4.svg"
        alt="Logo web"
        width={150}
        height={100}
        onClick={handleLandingPage}
      />
      <ul className="hidden md:flex gap-8 pt-3 pb-3">
        <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
          Search
        </li>
        <li
          className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all"
          onClick={handleHome}
        >
          Home
        </li>
        <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
          Shop
        </li>
        <li className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all">
          Friends
        </li>
        {isAdmin && (
          <li
            onClick={() => navigate("/admindashboard")}
            className="font-medium hover:scale-105 cursor-pointer hover:text-primary transition-all"
          >
            Admin
          </li>
        )}
      </ul>
      {isSignedIn ? (
        <div className="flex items-center pr-5 space-x-2">
          <UserButton />
          <Button
            className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            onClick={() => setPaymentOpen(true)}
          >
            Nạp Tiền
          </Button>
          <Button className="ml-2" onClick={() => setModalOpen(true)}>
            Play
          </Button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-green-500 text-white px-4 py-2 rounded">
              Sign up
            </Button>
          </SignUpButton>
        </div>
      )}
      <RoomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
      />
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setPaymentOpen(false)}
      />
    </div>
  );
}

export default Header;
