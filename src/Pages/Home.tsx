import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import TrackPackage from "../components/home/TrackPackage";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Services from "../components/home/Services";

const Home = () => {
  return (
    <div className="">
      <div className="home_container">
        <Navbar />
        <Hero />
      </div>
      <Services />
      <HowItWorks />
      <TrackPackage />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
