import Hero from "../components/home/Hero";
import TrackPackage from "../components/home/TrackPackage";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServicesComponent from "../components/home/ServicesComponent";
import HowItWorksComponents from "../components/home/HowItWorksComponents";
import TrustedBy from "../components/home/TrustedBy";
import SolutionsSection from "../components/home/SolutionsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ProcessSection from "../components/home/ProcessSection";
import StatsStrip from "../components/home/StatsStrip";
import SuccessStoriesSection from "../components/home/SuccessStoriesSection";
import GlobalReachSection from "../components/home/GlobalReachSection";
import LatestUpdatesInsightsSection from "../components/home/LatestUpdatesInsightsSection";
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
      <HowItWorksComponents />
      <TrackPackage />
      <main className="mx-auto grid gap-8 lg:grid-cols-3 max-w-6xl">
        {/* Form */}
        <section className="lg:col-span-2">
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-soft)",
            }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Contact us
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-lg px-4 py-3 outline-none"
                  style={{
                    background: "rgba(6,31,41,0.1)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-lg px-4 py-3 outline-none"
                  style={{
                    background: "rgba(6,31,41,0.1)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company (optional)"
                  className="w-full rounded-lg px-4 py-3 outline-none"
                  style={{
                    background: "rgba(6,31,41,0.1)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="w-full rounded-lg px-4 py-3 outline-none"
                  style={{
                    background: "rgba(6,31,41,0.1)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={6}
                className="w-full rounded-lg px-4 py-3 outline-none"
                style={{
                  background: "rgba(6,31,41,0.1)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-primary)",
                }}
              />

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md px-6 py-3 font-medium shadow-sm"
                  style={{
                    background: "var(--accent-teal)",
                    color: "var(--text-inverse)",
                  }}
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>

                {sent && (
                  <div
                    className="text-sm"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    Thanks — we'll be in touch shortly.
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Info panel */}
        <aside className="lg:col-span-1">
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-soft)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="rounded-md p-2"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--accent-teal)",
                }}
              >
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-(--text-tertiary)">Email</div>
                <div className="font-medium text-(--text-primary)">
                  hello@DigitalLogistics.com
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div
                className="rounded-md p-2"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--accent-teal)",
                }}
              >
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-(--text-tertiary)">
                  Call / WhatsApp
                </div>
                <div className="font-medium text-(--text-primary)">
                  +234 801 234 5678
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div
                className="rounded-md p-2"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--accent-teal)",
                }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-(--text-tertiary)">Office</div>
                <div className="font-medium text-(--text-primary)">
                  Lagos, Nigeria
                </div>
              </div>
            </div>

            <div
              className="mt-6"
              style={{
                borderTop: "1px solid var(--border-soft)",
                paddingTop: "1rem",
              }}
            >
              <div
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Support hours
              </div>
              <div
                className="font-medium flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                <Clock className="h-4 w-4" /> Mon — Fri, 8am — 6pm
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
