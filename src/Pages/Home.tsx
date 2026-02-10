import Hero, { stats } from "../components/home/Hero";
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
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <div className="home_container">
        <HomeBackgroundCarousel images={[Bg1, Bg2, Bg3, Bg4]} />
        <Navbar />
        <Hero />
      </div>
      <div className=" mx-auto mt-12 grid sm:hidden max-w-6xl grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl p-6 text-center"
            style={{
              background: "hsl(var(--card) / 0.50)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1,
              ease: "easeOut",
            }}
          >
            <div
              className="mx-auto grid place-items-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                background: "hsl(var(--background) / 0.55)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div
              className="mt-4 text-4xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {stat.value}
            </div>
            <div
              className="mt-1 text-sm"
              style={{ color: "var(--text-tertiary)" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
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
