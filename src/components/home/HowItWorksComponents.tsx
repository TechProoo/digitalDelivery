import DemoTimeline from "../ui/demo-timeline";
import BoxImg from "../../assets/box.png";

const HowItWorksComponents = () => {
  return (
    <section className="hiw_cover md:p-10">
      <div className="flex justify-center mt-5">
        <div className="badge_design text-center">
          How It Works
          <span></span>
        </div>
      </div>

      <div className="hiw_title mt-3 ">
        <p className="text-center md:w-7/12 m-auto">
          Experience simple, seamless logistics in four easy steps designed to
          make your delivery process effortless and efficient.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-12 md:grid-cols-12 gap-8">
        <div className="lg:col-span-5 col-span-12">
          <div className="hiw_tracking">
            <span className="text-sm text-(--accent-teal) font-medium">
              LIVE TRACKING
            </span>
            <h1 className="text-5xl text-(--text-primary) font-extrabold mt-4">
              Real-Time
              <br />
              Visibility
            </h1>
            <p className="mt-6 text-(--text-secondary) max-w-xl">
              Follow your shipment's journey with precision. Every scan, every
              checkpoint, every mile — visible in real-time.
            </p>

            <div className="mt-8">
              <div className="inline-flex items-center gap-4 bg-(--bg-secondary)/60 p-6 rounded-2xl shadow-md">
                <div className="w-14 h-14 rounded-xl bg-(--bg-tertiary) flex items-center justify-center">
                  <img
                    src={BoxImg}
                    alt="tracking"
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <div className="text-sm text-(--text-tertiary)">
                    Tracking ID
                  </div>
                  <div className="font-semibold text-lg text-(--text-primary)">
                    VL-2024-8847521
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - timeline area */}
        <div className="lg:col-span-7 px-4 col-span-12">
          <div className="bg-(--bg-secondary) rounded-2xl p-8 shadow-strong">
            <div className="flex items-center justify-end mb-4">
              <div className="text-sm text-(--text-tertiary)">
                Live updates • Estimated times
              </div>
            </div>
            <DemoTimeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksComponents;
