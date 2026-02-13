import { Send } from "lucide-react";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className="card_cover md:w-65 sm:w-60 w-[320px] h-80 p-3 relative rounded-3xl">
      <div className="card_img w-full h-full ">
        <img
          src={image}
          loading="lazy"
          decoding="async"
          className="rounded-2xl object-cover"
          alt=""
        />
      </div>
      <div className="absolute top-3 left-1">
        <div className="caed_icon_cover p-2">
          <Send />
        </div>
      </div>
      <div className="absolute overlay_bottom bottom-0 h-30 w-full p-2"></div>
      <div className="absolute card_bottom bottom-0 h-30 w-full p-2">
        <h1 className="text-2xl header">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
