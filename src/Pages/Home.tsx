import Hero from "../components/home/Hero";
import TrackPackage from "../components/home/TrackPackage";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServicesComponent from "../components/home/ServicesComponent";
import HowItWorksComponents from "../components/home/HowItWorksComponents";

const Home = () => {
  return (
    <div className="p-6.25">
      <div className="home_container">
        <Navbar />
        <Hero />
      </div>
      <ServicesComponent />
      <HowItWorksComponents />
      <TrackPackage />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
