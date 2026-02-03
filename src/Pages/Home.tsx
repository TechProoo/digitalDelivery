import Hero from "../components/home/Hero";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServicesComponent from "../components/home/ServicesComponent";
import TrustedBy from "../components/home/TrustedBy";
import SolutionsSection from "../components/home/SolutionsSection";
import ProcessSection from "../components/home/ProcessSection";
import StatsStrip from "../components/home/StatsStrip";
import SuccessStoriesSection from "../components/home/SuccessStoriesSection";
import GlobalReachSection from "../components/home/GlobalReachSection";
import LatestUpdatesInsightsSection from "../components/home/LatestUpdatesInsightsSection";
import FaqSection from "../components/home/FaqSection";
import HomeBackgroundCarousel from "../components/home/HomeBackgroundCarousel";

import Bg1 from "../assets/bg.jpg";
import Bg2 from "../assets/road.jpg";
import Bg3 from "../assets/door.jpg";
import Bg4 from "../assets/hiw.jpg";

const Home = () => {
  return (
    <div>
      <div className="home_container">
        <HomeBackgroundCarousel images={[Bg1, Bg2, Bg3, Bg4]} />
        <Navbar />
        <Hero />
      </div>
      <div className="my-20">
        <TrustedBy />
      </div>
      <section id="solutions" style={{ scrollMarginTop: 96 }}>
        <SolutionsSection />
      </section>
      <ProcessSection />
      <ServicesComponent />
      <StatsStrip />
      <SuccessStoriesSection />
      <GlobalReachSection />
      <LatestUpdatesInsightsSection />
      <FaqSection />

      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
