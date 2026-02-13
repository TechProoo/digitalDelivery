import { Check } from "lucide-react";

interface CardTwoProps {
  title: string;
  image: string;
}

const Card_two = ({ title, image }: CardTwoProps) => {
  return (
    <div className="card_two p-5 relative">
      <h1 className="text-3xl w-70">{title}</h1>
      <div className="card_two_img absolute right-1 md:top-10 top-12">
        <img
          className="w-50 h-40"
          src={image}
          loading="lazy"
          decoding="async"
          alt=""
        />
      </div>

      <div className="card_two_bottom absolute bottom-2">
        <div className="card_two_check">
          <Check color="#08CB00" strokeWidth={8} />
        </div>
      </div>
    </div>
  );
};

export default Card_two;
