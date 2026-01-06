import { MoveRight, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [tn, setTn] = useState("");

  const handleSubmit = () => {
    const value = tn?.trim();
    if (!value) return;
    navigate(`/track-package?tn=${encodeURIComponent(value)}`);
  };

  return (
    <div className="hero_container md:p-10 p-3">
      <div className="hero_text">
        <div>
          <div className="badge_design">
            Fast Delivery
            <span></span>
          </div>
        </div>
        <div className="hero_text">
          <h1 className="md:text-6xl text-5xl mt-5 header md:w-9/12">
            Moving Your Packages at the Speed of Trust
          </h1>
          <p className="mt-5 md:w-7/12">
            From urgent airport shipments to door-to-door delivery,
            DigitalDelivery ensures your packages reach their destination—fast,
            safe, and hassle-free.
          </p>
        </div>
        <div className="md:flex justify-between items-center">
          <div className="hero_button mt-5 sm:flex items-center gap-5">
            <Link
              to="/signup"
              className="flex justify-center items-center gap-2 group"
            >
              <span>Get Started</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                <MoveRight />
              </span>
            </Link>
            <Link to="/signup" className="mt-2 inline-block">
              Track Your Package
            </Link>
          </div>
          <div className="hero_input px-4 py-2 md:mt-0 mt-10 rounded-2xl sm:ml-0">
            <div
              className="hr_input flex items-center gap-2"
              style={{ position: "relative" }}
            >
              <Search size={28} className="text-gray-300 mr-2" />
              <input
                type="text"
                placeholder="Enter tracking number..."
                value={tn}
                onChange={(e) => setTn(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                className="bg-transparent outline-none border-none text-gray-300 placeholder-gray-400 w-full text-lg"
                style={{ paddingLeft: 0 }}
              />
              <button onClick={handleSubmit} className="rounded-md">
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
