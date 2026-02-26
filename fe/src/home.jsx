import Footer from "./pages/Home/Footer";
import GameDescription from "./pages/Home/GameDescription";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowToPlay from "./pages/Home/HowToPlay";
function Home() {
  return (
    <div>
      {/* <SignInButton mode="modal" forceRedirectUrl="/">
        <Button>Sign in</Button>
      </SignInButton> */}
      {/* Header */}
      <Header />
      {/* Hero section */}
      <Hero />
      {/* Category */}
      <GameDescription />
      <HowToPlay />
      <Footer />
    </div>
  );
}

export default Home;
