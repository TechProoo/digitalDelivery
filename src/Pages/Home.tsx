import Hero from "../components/home/Hero";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServicesComponent from "../components/home/ServicesComponent";
import TrustedBy from "../components/home/TrustedBy";
import SolutionsSection from "../components/home/SolutionsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ProcessSection from "../components/home/ProcessSection";
import StatsStrip from "../components/home/StatsStrip";
import SuccessStoriesSection from "../components/home/SuccessStoriesSection";
import GlobalReachSection from "../components/home/GlobalReachSection";
import LatestUpdatesInsightsSection from "../components/home/LatestUpdatesInsightsSection";
import FaqSection from "../components/home/FaqSection";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    }, 900);
  };
  return (
    <div>
      <div className="home_container">
        <Navbar />
        <Hero />
      </div>
      <div className="my-20">
        <TrustedBy />
      </div>
      <SolutionsSection />
      <FeaturesSection />
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
