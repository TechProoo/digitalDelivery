import { Globe, Search, Users, Zap } from "lucide-react";
import Navbar from "../components/home/Navbar";
import HowItWorksComponents from "../components/home/HowItWorksComponents";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";

const HowItWorks = () => {
  return (
    <section className="hiw_cover">
      <div className="hiw_container">
        <Navbar />
        <div className="hero_container p-10">
          <div className="hero_text">
            <div>
              <div className="badge_design">
                How It Works<span></span>
              </div>
            </div>

            <div className="hero_text">
              <h1 className="md:text-6xl text-5xl mt-5 header md:w-9/12">
                Simple Steps to Seamless Delivery
              </h1>
              <p className="mt-5 md:w-7/12">
                From booking to final delivery, our streamlined process makes
                shipping easy. See how we handle your packages with care, speed,
                and transparency at every step.
              </p>
            </div>

            <div className="md:flex justify-between items-center mt-10">
              <div className="hero_input px-4 py-2 md:mt-0 mt-10 rounded-2xl sm:ml-0">
                <div
                  className="hr_input flex items-center gap-2"
                  style={{ position: "relative" }}
                >
                  <Search size={24} className="text-gray-300 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter tracking number..."
                    className="bg-transparent outline-none border-none text-gray-300 placeholder-gray-400 w-full text-lg"
                    style={{ paddingLeft: 0 }}
                  />
                  <button className="rounded-md">Track</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5"><HowItWorksComponents />
      {/* Feature highlights — refined visuals */}
      <div className="grid gap-6 sm:grid-cols-3 mb-8 mt-5 md:p-10">
        <div className="group p-6 rounded-xl bg-(--bg-secondary) border border-(--border-soft) shadow-sm transform transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-teal), rgba(23,199,189,0.85))",
                color: "var(--bg-primary)",
              }}
            >
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-(--text-primary) text-3xl header">
                Dedicated Support
              </h4>
              <p className="text-sm text-(--text-secondary) mt-3">
                A single point of contact for shipments and tailored logistics
                support.
              </p>
              <div className="mt-3 text-xs text-(--text-tertiary)">
                Priority onboarding • SLA-backed
              </div>
            </div>
          </div>
        </div>

        <div className="group p-6 rounded-xl bg-(--bg-secondary) border border-(--border-soft) shadow-sm transform transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, rgba(78,168,222,0.95), var(--accent-amber))",
                color: "var(--bg-primary)",
              }}
            >
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-3xl text-(--text-primary)">
                Global Partnerships
              </h4>
              <p className="text-sm text-(--text-secondary) mt-3">
                Seamless cross-border movement through vetted carrier networks.
              </p>
              <div className="mt-3 text-xs text-(--text-tertiary)">
                Customs support • Cargo tracking
              </div>
            </div>
          </div>
        </div>

        <div className="group p-6 rounded-xl bg-(--bg-secondary) border border-(--border-soft) shadow-sm transform transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-amber), rgba(244,162,97,0.9))",
                color: "var(--bg-primary)",
              }}
            >
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-3xl text-(--text-primary)">
                Fast Quotes
              </h4>
              <p className="text-sm text-(--text-secondary) mt-3">
                Instant, transparent pricing so you can move quickly.
              </p>
              <div className="mt-3 text-xs text-(--text-tertiary)">
                No hidden fees • Compare options
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:p-5">
        <Cta />
        <Footer />
      </div></div>
    </section>
  );
};

export default HowItWorks;
