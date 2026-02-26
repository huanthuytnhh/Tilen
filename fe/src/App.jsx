// App.jsx

import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-react";
import { Flex, Spin } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "./components/Header";
import Friends from "./pages/Friends/Friends"; // Import your friends page
// import GameRoom from "./pages/Game/GameRoom";
// import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/ProfilePage"; // Import your profile page
import ProtectedRoute from "./routes/ProtectedRoute"; // Import ProtectedRoute
import JoinRoom from "./pages/Game/JoinRoom";
import CreateRoom from "./pages/Game/CreateRoom";
import RoomView from "./pages/Game/RoomView";
import { RoomProvider } from "./contexts/RoomContext";
import HeaderLandingPage from "./pages/LandingPage/Header";
import Features from "./pages/LandingPage/Features";
import Product from "./pages/LandingPage/Product";
import Footer from "./pages/LandingPage/Footer";
import Header from "./components/Header";
import HomePage from "./pages/Home/HomePage";
import GameRoom from "./pages/Game/GameRoom";
import { Bounce, ToastContainer } from "react-toastify";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
const router = createBrowserRouter([
  {
    path: "/admindashboard/*",
    element: (
      <AdminRoute
        component={() => (
          <div>
            {/* <Header /> */}
            <AdminDashboard />
          </div>
        )}
      />
    ),
  },
  {
    path: "/",
    element: (
      <div>
        {/* <div className="absolute inset-0  h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}
        <HeaderLandingPage />
        <Features />
        <Product />
        <Footer />
        {/* <HomePage /> */}
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <RoomProvider>
        <div className="flex flex-col gap-0">
          <Header />
          <HomePage />
        </div>
      </RoomProvider>
    ),
  },
  {
    path: "/gameroom",
    element: (
      <ProtectedRoute
        component={() => (
          <div className="flex flex-col gap-20">
            <Header />
            <GameRoom className="mt-[10px]" />
          </div>
        )}
      />
    ),
  },
  {
    path: "/joinroom",
    element: (
      <ProtectedRoute
        component={() => (
          <RoomProvider>
            <JoinRoom />
          </RoomProvider>
        )}
      />
    ),
  },

  {
    path: "/createroom",
    element: (
      <ProtectedRoute
        component={() => (
          <RoomProvider>
            <CreateRoom />
          </RoomProvider>
        )}
      />
    ),
  },
  {
    path: "/friends",
    element: <ProtectedRoute component={Friends} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute component={ProfilePage} />,
  },
  {
    path: "/room/:roomId",
    element: (
      <ProtectedRoute
        component={() => (
          <RoomProvider>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            {/* <GameRoom /> */}
            <RoomView />
          </RoomProvider>
        )}
      />
    ),
  },
]);

const App = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      afterSignInUrl="/home"
      afterSignUpUrl="/home"
    >
      <ClerkLoading>
        <Flex align="center" justify="center" className="h-screen">
          <Spin size="large" />
        </Flex>
      </ClerkLoading>
      <ClerkLoaded>
        <ToastContainer
          limit={1}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default App;
