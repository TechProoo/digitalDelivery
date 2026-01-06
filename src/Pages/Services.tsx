import {  Search, Truck, Globe, ShieldCheck } from "lucide-react";
import Navbar from "../components/home/Navbar";

import ServicesComponent from "../components/home/ServicesComponent";
import DeliveryFlow from "../components/home/DeliveryFlow";
import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";

const Services = () => {
  return (
    <div className="p-6.25">
      <div className="services_container">
        <Navbar />
        <div className="hero_container md:p-10 p-3">
          <div className="hero_text">
            <div>
              <div className="badge_design">
                Our Services<span></span>
              </div>
            </div>

            <div className="hero_text">
              <h1 className="md:text-5xl text-4xl mt-5 header md:w-9/12">
                Tailored Logistics Solutions for Every Shipment
              </h1>
              <p className="mt-5 md:w-7/12">
                Explore our full suite of services — by road, by air, by sea and
                end-to-end fulfilment. We design the right delivery solution for
                your business and ensure reliable, trackable shipments
                worldwide.
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

      <DeliveryFlow />
      <ServicesComponent />
      {/* Feature Highlights */}
      <section className="mx-auto my-12 max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h3
            className="text-md font-semibold uppercase header"
            style={{ color: "var(--accent-teal)" }}
          >
            Why choose us
          </h3>
          <h2
            className="mt-2 text-2xl font-bold header"
            style={{ color: "var(--text-primary)" }}
          >
            End-to-end logistics built for speed and reliability
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-(--border-soft) bg-(--bg-secondary) p-6 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-(--bg-primary) p-3 text-(--accent-teal)">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-(--text-primary)">
                  Flexible Transport
                </h4>
                <p className="text-sm text-(--text-secondary)">
                  Road, air, and sea options to match your timeline and budget.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-(--border-soft) bg-(--bg-secondary) p-6 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-(--bg-primary) p-3 text-(--accent-teal)">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-(--text-primary)">
                  Global Reach
                </h4>
                <p className="text-sm text-(--text-secondary)">
                  Networked hubs and partners for smooth cross-border
                  deliveries.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-(--border-soft) bg-(--bg-secondary) p-6 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-(--bg-primary) p-3 text-(--accent-teal)">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-(--text-primary)">
                  Secure Handling
                </h4>
                <p className="text-sm text-(--text-secondary)">
                  Insurance and careful handling for valuable shipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta />
      <Footer />
    </div>
  );
};

export default Services;
