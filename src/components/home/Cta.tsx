import { MoveRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="cta_section my-16">
      <div className="max-w-7xl h-screen mx-auto rounded-4xl p-10 md:p-14 flex flex-col  items-center justify-center gap-8 bg-(--bg-secondary) shadow-strong">
        <div className="text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl leading-tight font-extrabold text-(--text-primary)">
            Ready to Ship with Confidence?
          </h2>
          <p className="mt-3 text-lg md:text-xl text-(--text-secondary)">
            Get a fast quote and start your delivery in minutes.
          </p>
        </div>

        <div className="hero_button mt-5 sm:flex  gap-5">
          <button className="flex justify-center items-center gap-2 group">
            <span>Get Started</span>{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              <MoveRight />
            </span>
          </button>
          <button className="mt-2">Start Your Delivery Now</button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
