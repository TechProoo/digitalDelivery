import { ArrowUpRight, MoveRight } from "lucide-react";
import Design from "../../assets/three.png";
import Card from "../Card";
import DoorImg from "../../assets/door.jpg";
import RoadImg from "../../assets/road.jpg";
import AeroImg from "../../assets/ecom.jpg";
import BoatImg from "../../assets/aero.jpg";
import Box from "../../assets/box.png";
import Two from "../../assets/247.png";
import Live from "../../assets/live.png";
import Del from "../../assets/delivery.png";
import Card_two from "../Card_two";

const ServicesComponent = () => {
  return (
    <div className=" md:p-10">
      <div className="flex justify-center mt-10">
        <div className="badge_design text-center">
          Our Services
          <span></span>
        </div>
      </div>
      <div className="services_title mt-3">
        <p className="text-center">
          Reliable shipping solutions tailored to your needs—by air, by road,
          and door-to-door.
        </p>
      </div>
      <div className="services_info mt-15">
        <div className="grid grid-cols-12 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <div className="services_info_inner flex justify-between items-center pb-5 border-b border-[#7fa6b4]">
              <div className="services_num">
                <h1 className="text-6xl">01</h1>
              </div>

              <div className="services_mode text-center">
                <h1 className="whitespace-nowrap header text-4xl">By Road</h1>
                <span>Cost-effective nationwide road transport</span>
              </div>

              <div className="services_arrow">
                <ArrowUpRight />
              </div>
            </div>
            <div className="services_info_inner flex justify-between items-center mt-10 pb-5 border-b border-[#7fa6b4]">
              <div className="services_num">
                <h1 className="text-6xl">02</h1>
              </div>

              <div className="services_mode text-center">
                <h1 className="whitespace-nowrap header text-4xl">By Air</h1>
                <span>Fast air cargo for urgent deliveries</span>
              </div>

              <div className="services_arrow">
                <ArrowUpRight />
              </div>
            </div>
            <div className="services_info_inner flex justify-between items-center mt-10 pb-5 border-b border-[#7fa6b4]">
              <div className="services_num">
                <h1 className="md:text-6xl text-5xl">03</h1>
              </div>

              <div className="services_mode text-center">
                <h1 className="whitespace-nowrap header md:text-4xl text-3xl">
                  By Sea
                </h1>
                <span>Cost-effective shipping for large consignments</span>
              </div>

              <div className="services_arrow">
                <ArrowUpRight />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:mt-0 mt-10 relative">
            <div className="services_right_head header text-4xl">
              <h1>Smart Logistics Solutions Built for Speed and Reliability</h1>
            </div>
            <div className="services_right_sub mt-5">
              <p>
                Digital Logistics simplifies cargo dispatch and delivery—from
                packaging and pickup to transportation by road, air, and
                sea—ensuring your goods arrive safely and on time.
              </p>
              <div className="hero_button mt-5 flex gap-5">
                <button className="flex justify-center items-center gap-2 group">
                  <span>More Info</span>{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    <MoveRight />
                  </span>
                </button>
              </div>
              <img
                src={Design}
                className="mt-10 absolute bottom-0 right-0"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="services_card mt-20">
          <div className="grid grid-cols-12 gap-6 justify-center m-auto">
            {[
              {
                image: DoorImg,
                title: "Door Pickup",
                description: "Convenient pickup from your doorstep",
              },
              {
                image: RoadImg,
                title: "Destination Delivery",
                description: "Terminal pickup with safe final delivery",
              },
              {
                image: AeroImg,
                title: "E-commerce Fulfilment",
                description: "Complete order packaging and dispatch",
              },
              {
                image: BoatImg,
                title: "Worldwide Delivery",
                description:
                  "Global shipping with seamless pickup and delivery to any address.",
              },
            ].map((card, idx) => (
              <div
                className="col-span-12 justify-center m-auto sm:col-span-6 md:col-span-4 lg:col-span-3 card_container gap-3"
                key={idx}
              >
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="services_end mt-20 pl-5">
        <h1 className="text-4xl header">
          Deliver Your Logistics <br />
          Safely and Quickly
        </h1>
        <div className="services_card_two mt-10 grid grid-cols-12 gap-6">
          {[
            { title: "Always Protected Your Packages", image: Box },
            { title: "Our customer Service 24/7", image: Two },
            { title: "Live Tracking Your Packages", image: Live },
            { title: "Safely Deliverey To The Pickup", image: Del },
          ].map((card, idx) => (
            <div className="col-span-12 md:col-span-6 lg:col-span" key={idx}>
              <Card_two title={card.title} image={card.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
